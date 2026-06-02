let dataGlobal = null;
let currentCourse = null;
let currentModuleIndex = 0;

function getCourseIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function setCourseIdInUrl(courseId) {
  const url = new URL(window.location.href);
  url.searchParams.set("id", courseId);
  window.history.replaceState({}, "", url.toString());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadData() {
  const response = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());
  if (!response.ok) {
    throw new Error("Kunde inte läsa assets/data/kurser-data.json");
  }
  return await response.json();
}

function getCoursesArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.kurser)) return data.kurser;
  if (Array.isArray(data?.courses)) return data.courses;
  return [];
}

function getCourseId(course, index = 0) {
  return String(course?.id ?? ("kurs" + (index + 1)));
}

function getCourseTitle(course, index = 0) {
  return String(course?.titel ?? course?.title ?? ("Kurs " + (index + 1)));
}

function getCoursePurpose(course) {
  return String(course?.syfte ?? course?.purpose ?? "");
}

function getCourseDescription(course) {
  return String(course?.beskrivning ?? course?.description ?? "");
}

function getCourseImage(course) {
  return String(course?.image ?? "");
}

function getCourseColor(course) {
  return String(course?.color ?? "");
}

function getCourseActive(course) {
  return String(course?.active ?? "");
}

function getCourseModules(course) {
  if (Array.isArray(course?.moduler)) return course.moduler;
  if (Array.isArray(course?.modules)) return course.modules;
  return [];
}

function getModuleTitle(module, index = 0) {
  return String(module?.titel ?? module?.title ?? ("Modul " + (index + 1)));
}

function getModulePurpose(module) {
  return String(module?.syfte ?? module?.purpose ?? "");
}

function getModuleDescription(module) {
  return String(module?.beskrivning ?? module?.description ?? "");
}

function getModuleContentList(module) {
  if (Array.isArray(module?.innehall)) return module.innehall;
  if (Array.isArray(module?.content)) return module.content;
  return [];
}

function getModuleVideo(module) {
  return String(module?.video ?? module?.videoUrl ?? "");
}

function getModuleQuiz(module) {
  if (Array.isArray(module?.quiz)) return module.quiz;
  if (Array.isArray(module?.questions)) return module.questions;
  if (Array.isArray(module?.frågor)) return module.frågor;
  return [];
}

function resolveVideoPath(videoValue) {
  if (!videoValue) return "";

  const value = String(videoValue).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//") ||
    value.startsWith("video/") ||
    value.startsWith("/video/") ||
    value.startsWith("assets/")
  ) {
    return value;
  }

  return "video/" + value.replace(/^\/+/, "");
}

function renderEmptyContent(message) {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <h2 class="empty-state">${escapeHtml(message)}</h2>
  `;
}

function renderCourseSelect() {
  const select = document.getElementById("courseSelect");
  if (!select) return;

  const courses = getCoursesArray(dataGlobal);

  if (!courses.length) {
    select.innerHTML = `<option value="">Inga kurser hittades</option>`;
    return;
  }

  select.innerHTML = courses.map((course, index) => {
    const id = getCourseId(course, index);
    const title = getCourseTitle(course, index);
    return `<option value="${escapeHtml(id)}">${escapeHtml(title)}</option>`;
  }).join("");

  select.onchange = function () {
    loadCourse(this.value);
  };
}

function loadCourse(requestedId) {
  const courses = getCoursesArray(dataGlobal);

  if (!courses.length) {
    currentCourse = null;
    currentModuleIndex = 0;
    renderModules();
    renderEmptyContent("Inga kurser hittades i JSON-filen.");
    return;
  }

  let selectedCourse = null;
  let selectedId = null;

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const id = getCourseId(course, i);

    if (String(id) === String(requestedId)) {
      selectedCourse = course;
      selectedId = id;
      break;
    }
  }

  if (!selectedCourse) {
    selectedCourse = courses[0];
    selectedId = getCourseId(courses[0], 0);
  }

  currentCourse = selectedCourse;
  currentModuleIndex = 0;

  const select = document.getElementById("courseSelect");
  if (select) {
    select.value = selectedId;
  }

  setCourseIdInUrl(selectedId);

  renderModules();
  renderModule();
}

function renderModules() {
  const list = document.getElementById("moduleList");
  if (!list) return;

  if (!currentCourse) {
    list.innerHTML = "";
    return;
  }

  const modules = getCourseModules(currentCourse);

  if (!modules.length) {
    list.innerHTML = `<div class="note-box">Inga moduler hittades för vald kurs.</div>`;
    return;
  }

  list.innerHTML = modules.map((module, index) => {
    const title = getModuleTitle(module, index);
    const quizCount = getModuleQuiz(module).length;
    const activeClass = index === currentModuleIndex ? "active" : "";
    const quizText = quizCount > 0 ? `${quizCount} quizfrågor` : "Ingen quiz";

    return `
      <div class="module-item ${activeClass}" onclick="selectModule(${index})">
        <div class="module-item-title">${index + 1}. ${escapeHtml(title)}</div>
        <div class="module-item-status">${escapeHtml(quizText)}</div>
      </div>
    `;
  }).join("");
}

function selectModule(index) {
  currentModuleIndex = index;
  renderModules();
  renderModule();
}

function renderQuiz(moduleQuiz) {
  if (!moduleQuiz.length) {
    return `<div class="quiz-box"><strong>Quiz</strong><br>Ingen quiz angiven för denna modul.</div>`;
  }

  return `
    <div class="quiz-box">
      <strong>Quiz</strong>
      ${moduleQuiz.map((q, qIndex) => `
        <div class="quiz-question" style="margin-top:16px; border-top:1px solid #e5e7eb; padding-top:12px;">
          <div style="font-weight:700; margin-bottom:8px;">${qIndex + 1}. ${escapeHtml(q.question)}</div>
          <div style="display:grid; gap:8px;">
            ${q.options.map((opt, optIndex) => `
              <label style="display:flex; gap:8px; align-items:flex-start;">
                <input type="radio" name="question_${qIndex}" value="${optIndex + 1}">
                <span>${escapeHtml(opt)}</span>
              </label>
            `).join("")}
          </div>
          <div id="feedback_${qIndex}" style="margin-top:8px; font-size:13px;"></div>
        </div>
      `).join("")}
      <div style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn primary" onclick="checkQuiz()">Rätta quiz</button>
        <div id="quizResult" style="font-weight:700; padding-top:10px;"></div>
      </div>
    </div>
  `;
}

function renderModule() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  if (!currentCourse) {
    renderEmptyContent("Ingen kurs vald.");
    return;
  }

  const courseTitle = getCourseTitle(currentCourse);
  const coursePurpose = getCoursePurpose(currentCourse);
  const courseDescription = getCourseDescription(currentCourse);
  const courseImage = getCourseImage(currentCourse);
  const courseColor = getCourseColor(currentCourse);
  const courseActive = getCourseActive(currentCourse);

  const modules = getCourseModules(currentCourse);

  if (!modules.length) {
    renderEmptyContent("Vald kurs saknar moduler.");
    return;
  }

  const module = modules[currentModuleIndex];

  if (!module) {
    renderEmptyContent("Vald modul kunde inte läsas.");
    return;
  }

  const moduleTitle = getModuleTitle(module, currentModuleIndex);
  const modulePurpose = getModulePurpose(module);
  const moduleDescription = getModuleDescription(module);
  const moduleContent = getModuleContentList(module);
  const moduleVideo = resolveVideoPath(getModuleVideo(module));
  const moduleQuiz = getModuleQuiz(module);

  const imageHtml = courseImage
    ? `<img class="course-image" src="${escapeHtml(courseImage)}" alt="${escapeHtml(courseTitle)}">`
    : "";

  const colorHtml = courseColor
    ? `<div class="muted"><span class="color-badge" style="background:${escapeHtml(courseColor)};"></span><strong>Kursfärg</strong></div>`
    : "";

  const activeHtml = courseActive
    ? `<div class="muted"><strong>Status:</strong> ${escapeHtml(courseActive)}</div>`
    : "";

  const purposeHtml = coursePurpose
    ? `<p class="muted"><strong>Syfte:</strong> ${escapeHtml(coursePurpose)}</p>`
    : "";

  const descriptionHtml = courseDescription
    ? `<p class="muted">${escapeHtml(courseDescription)}</p>`
    : "";

  const modulePurposeHtml = modulePurpose
    ? `<p class="module-text"><strong>Syfte:</strong> ${escapeHtml(modulePurpose)}</p>`
    : "";

  const moduleDescriptionHtml = moduleDescription
    ? `<p class="module-text">${escapeHtml(moduleDescription)}</p>`
    : "";

  const moduleListHtml = moduleContent.length
    ? `<h4>Innehåll</h4><ul class="content-list">${moduleContent.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p class="muted">Ingen innehållslista angiven för denna modul.</p>`;

  const videoHtml = moduleVideo
    ? `
      <div class="video-wrap">
        <h4>Video</h4>
        <video controls preload="metadata" style="width:100%; max-width:900px; border-radius:12px; background:#000;">
          <source src="${escapeHtml(moduleVideo)}" type="video/mp4">
          Din webbläsare stödjer inte video.
        </video>
      </div>`
    : `<div class="note-box">Ingen video angiven för denna modul.</div>`;

  contentArea.innerHTML = `
    <div class="course-header">
      ${imageHtml}
      <div class="course-meta">
        <h2 class="content-title">${escapeHtml(courseTitle)}</h2>
        ${colorHtml}
        ${activeHtml}
        ${purposeHtml}
        ${descriptionHtml}
      </div>
    </div>

    <div class="module-box">
      <h3 class="module-title">Modul ${currentModuleIndex + 1} – ${escapeHtml(moduleTitle)}</h3>
      ${modulePurposeHtml}
      ${moduleDescriptionHtml}
      ${moduleListHtml}
      ${videoHtml}
      ${renderQuiz(moduleQuiz)}
    </div>

    <div class="button-row">
      <button class="btn" onclick="prevModule()">Föregående modul</button>
      <button class="btn primary" onclick="nextModule()">Nästa modul</button>
    </div>
  `;
}

function checkQuiz() {
  if (!currentCourse) return;

  const modules = getCourseModules(currentCourse);
  const module = modules[currentModuleIndex];
  const quiz = getModuleQuiz(module);

  if (!quiz.length) return;

  let correctCount = 0;

  quiz.forEach((q, qIndex) => {
    const selected = document.querySelector(`input[name="question_${qIndex}"]:checked`);
    const feedback = document.getElementById(`feedback_${qIndex}`);

    if (!feedback) return;

    if (!selected) {
      feedback.innerHTML = `<span style="color:#b91c1c;">Inget svar valt.</span>`;
      return;
    }

    const selectedValue = Number(selected.value);

    if (selectedValue === Number(q.correct)) {
      correctCount += 1;
      feedback.innerHTML = `<span style="color:#166534;">Rätt svar.</span>`;
    } else {
      const correctText = q.options[Number(q.correct) - 1] ?? "";
      feedback.innerHTML = `<span style="color:#b91c1c;">Fel svar. Rätt svar är: ${escapeHtml(correctText)}</span>`;
    }
  });

  const result = document.getElementById("quizResult");
  if (result) {
    result.textContent = `Resultat: ${correctCount} av ${quiz.length} rätt`;
  }
}

function prevModule() {
  const modules = currentCourse ? getCourseModules(currentCourse) : [];

  if (!modules.length) return;

  if (currentModuleIndex > 0) {
    currentModuleIndex--;
    renderModules();
    renderModule();
  }
}

function nextModule() {
  const modules = currentCourse ? getCourseModules(currentCourse) : [];

  if (!modules.length) return;

  if (currentModuleIndex < modules.length - 1) {
    currentModuleIndex++;
    renderModules();
    renderModule();
  }
}

async function init() {
  try {
    dataGlobal = await loadData();

    renderCourseSelect();

    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
      renderEmptyContent("JSON-filen innehåller inga kurser.");
      return;
    }

    const urlId = getCourseIdFromUrl();
    const firstCourseId = getCourseId(courses[0], 0);

    loadCourse(urlId || firstCourseId);
  } catch (error) {
    console.error(error);
    renderEmptyContent("Kunde inte läsa kursdata. Kontrollera assets/data/kurser-data.json.");
  }
}

init();
