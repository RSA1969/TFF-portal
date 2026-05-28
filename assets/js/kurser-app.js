(function () {
  const data = (window.TFF_DATA && window.TFF_DATA.courses) ? window.TFF_DATA.courses : [];

  function qs(sel) {
    return document.querySelector(sel);
  }

  function qsa(sel) {
    return Array.from(document.querySelectorAll(sel));
  }

  function getCourse(id) {
    return data.find(c => c.id === id) || data[0];
  }

  function storageKey(courseId) {
    return `tff_progress_${courseId}`;
  }

  function emptyProgress(course) {
    return {
      moduleIndex: 0,
      moduleDone: Array(course.modules.length).fill(false),
      quizDone: Array(course.modules.length).fill(false)
    };
  }

  function loadProgress(course) {
    try {
      const raw = localStorage.getItem(storageKey(course.id));
      if (!raw) return emptyProgress(course);
      const parsed = JSON.parse(raw);
      const fallback = emptyProgress(course);

      if (!Array.isArray(parsed.moduleDone)) parsed.moduleDone = fallback.moduleDone;
      if (!Array.isArray(parsed.quizDone)) parsed.quizDone = fallback.quizDone;
      if (typeof parsed.moduleIndex !== "number") parsed.moduleIndex = 0;

      parsed.moduleDone = parsed.moduleDone.slice(0, course.modules.length);
      parsed.quizDone = parsed.quizDone.slice(0, course.modules.length);

      while (parsed.moduleDone.length < course.modules.length) parsed.moduleDone.push(false);
      while (parsed.quizDone.length < course.modules.length) parsed.quizDone.push(false);

      return parsed;
    } catch {
      return emptyProgress(course);
    }
  }

  function saveProgress(course, progress) {
    localStorage.setItem(storageKey(course.id), JSON.stringify(progress));
  }

  function getApproved(progress) {
    return progress.moduleDone.every(Boolean) && progress.quizDone.every(Boolean);
  }

  function getProgressPercent(progress) {
    const total = progress.moduleDone.length * 2;
    const doneModules = progress.moduleDone.filter(Boolean).length;
    const doneQuiz = progress.quizDone.filter(Boolean).length;
    const done = doneModules + doneQuiz;
    return Math.round((done / total) * 100);
  }

  function escapeHtml(text) {
    return String(text || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderCatalog() {
    const grid = qs("#courseGrid");
    const search = qs("#q");
    const filterButtons = qsa("[data-filter]");
    if (!grid) return;

    let activeFilters = [];

    function courseMatches(course, query) {
      const hay = `${course.title} ${course.desc} ${(course.tags || []).join(" ")}`
        .toLowerCase();
      const q = query.trim().toLowerCase();
      const searchOk = !q || hay.includes(q);
      const filterOk = activeFilters.length === 0 || activeFilters.every(f => (course.tags || []).includes(f));
      return searchOk && filterOk;
    }

    function render() {
      const query = search ? search.value : "";
      const visible = data.filter(course => courseMatches(course, query));

      grid.innerHTML = visible.map(course => `
        <a class="card" href="utbildning.html?course=${encodeURIComponent(course.id)}" style="--course-color:${course.color}">
          <h3>${escapeHtml(course.title)}</h3>
          <p>${escapeHtml(course.desc)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
            ${(course.tags || []).map(tag => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div style="margin-top:12px;">
            <span class="badge">${course.modules.length} moduler</span>
          </div>
        </a>
      `).join("");

      if (!visible.length) {
        grid.innerHTML = `<div class="notice">Ingen kurs matchar sökning eller valda filter.</div>`;
      }
    }

    if (search) {
      search.addEventListener("input", render);
    }

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.filter;
        const exists = activeFilters.includes(value);
        activeFilters = exists
          ? activeFilters.filter(f => f !== value)
          : [...activeFilters, value];

        btn.classList.toggle("is-active", !exists);
        render();
      });
    });

    render();
  }

  function renderCoursePage() {
    const courseSelect = qs("#courseSelect");
    if (!courseSelect) return;

    const url = new URL(window.location.href);
    const courseId = url.searchParams.get("course") || data[0]?.id;
    let currentCourse = getCourse(courseId);
    let progress = loadProgress(currentCourse);

    const moduleList = qs("#moduleList");
    const courseTitle = qs("#courseTitle");
    const courseDesc = qs("#courseDesc");
    const courseTags = qs("#courseTags");
    const moduleTitle = qs("#moduleTitle");
    const modulePurpose = qs("#modulePurpose");
    const moduleContent = qs("#moduleContent");
    const moduleProgressText = qs("#moduleProgressText");
    const pillProgress = qs("#pillProgress");
    const pillApproved = qs("#pillApproved");
    const btnPrev = qs("#btnPrev");
    const btnNext = qs("#btnNext");
    const btnMarkModuleDone = qs("#btnMarkModuleDone");
    const btnMarkQuizDone = qs("#btnMarkQuizDone");
    const btnReset = qs("#btnReset");
    const btnBack = qs("#btnBack");
    const moduleVideo = qs("#moduleVideo");
    const videoWrap = qs("#videoWrap");
    const videoSourceText = qs("#videoSourceText");

    function syncUrl() {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("course", currentCourse.id);
      window.history.replaceState({}, "", newUrl.toString());
    }

    function updateHeader() {
      courseTitle.textContent = currentCourse.title;
      courseDesc.textContent = currentCourse.desc;
      courseTags.innerHTML = (currentCourse.tags || []).map(tag => `<span class="badge">${escapeHtml(tag)}</span>`).join("");
      pillProgress.textContent = `Progress: ${getProgressPercent(progress)}%`;
      pillApproved.textContent = getApproved(progress) ? "Kurs: Godkänd" : "Kurs: Ej godkänd";
    }

    function updateVideo(module) {
      if (!videoWrap || !moduleVideo) return;

      if (module.video && String(module.video).trim()) {
        videoWrap.style.display = "block";
        moduleVideo.src = module.video;
        moduleVideo.load();
        if (videoSourceText) {
          videoSourceText.textContent = "Video kopplad till vald modul.";
        }
      } else {
        videoWrap.style.display = "block";
        moduleVideo.removeAttribute("src");
        moduleVideo.load();
        if (videoSourceText) {
          videoSourceText.textContent = "Ingen video är kopplad till denna modul ännu.";
        }
      }
    }

    function updateModuleView() {
      const i = progress.moduleIndex;
      const module = currentCourse.modules[i];

      moduleTitle.textContent = module.title;
      modulePurpose.textContent = module.purpose;
      moduleContent.innerHTML = (module.content || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");

      const modText = progress.moduleDone[i] ? "Modul: klar" : "Modul: ej klar";
      const quizText = progress.quizDone[i] ? "Quiz: godkänd" : "Quiz: Ej godkänd";
      moduleProgressText.textContent = `${modText} • ${quizText}`;

      qsa(".moduleList__item").forEach((el, idx) => {
        el.classList.toggle("is-active", idx === i);
      });

      btnPrev.disabled = i === 0;
      btnNext.disabled = i === currentCourse.modules.length - 1;

      updateVideo(module);
      updateHeader();
    }

    function renderModuleList() {
      moduleList.innerHTML = currentCourse.modules.map((m, idx) => `
        <li class="moduleList__item ${idx === progress.moduleIndex ? "is-active" : ""}" data-index="${idx}">
          <div class="moduleList__title">${idx + 1}. ${escapeHtml(m.title)}</div>
          <div class="moduleList__meta">
            ${progress.moduleDone[idx] ? "Modul: klar" : "Modul ej klar"} • ${progress.quizDone[idx] ? "Quiz: godkänd" : "Quiz: Ej godkänd"}
          </div>
        </li>
      `).join("");

      qsa(".moduleList__item").forEach(item => {
        item.addEventListener("click", () => {
          progress.moduleIndex = Number(item.dataset.index);
          saveProgress(currentCourse, progress);
          updateModuleView();
          renderModuleList();
        });
      });
    }

    function bindCourseSelect() {
      courseSelect.innerHTML = data.map(course => `
        <option value="${escapeHtml(course.id)}">${escapeHtml(course.title)}</option>
      `).join("");
      courseSelect.value = currentCourse.id;

      courseSelect.addEventListener("change", () => {
        currentCourse = getCourse(courseSelect.value);
        progress = loadProgress(currentCourse);
        syncUrl();
        renderAll();
      });
    }

    function renderAll() {
      bindCourseSelect();
      renderModuleList();
      updateModuleView();
    }

    btnPrev.addEventListener("click", () => {
      if (progress.moduleIndex > 0) {
        progress.moduleIndex -= 1;
        saveProgress(currentCourse, progress);
        renderModuleList();
        updateModuleView();
      }
    });

    btnNext.addEventListener("click", () => {
      if (progress.moduleIndex < currentCourse.modules.length - 1) {
        progress.moduleIndex += 1;
        saveProgress(currentCourse, progress);
        renderModuleList();
        updateModuleView();
      }
    });

    btnMarkModuleDone.addEventListener("click", () => {
      progress.moduleDone[progress.moduleIndex] = true;
      saveProgress(currentCourse, progress);
      renderModuleList();
      updateModuleView();
    });

    btnMarkQuizDone.addEventListener("click", () => {
      progress.quizDone[progress.moduleIndex] = true;
      saveProgress(currentCourse, progress);
      renderModuleList();
      updateModuleView();
    });

    btnReset.addEventListener("click", () => {
      progress = emptyProgress(currentCourse);
      saveProgress(currentCourse, progress);
      renderAll();
    });

    btnBack.addEventListener("click", () => {
      window.location.href = "utbildningar.html";
    });

    syncUrl();
    renderAll();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
    renderCoursePage();
  });
})();
