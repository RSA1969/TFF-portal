(() => {(() data = Array.isArray(window.TFF_KURSER) ? window.TFF_KURSER : [];
  const pageSize = 9;

  let currentPage = 1;
  let searchText = "";
  let selectedCategories = new Set();

  const elGrid = document.getElementById("coursesGrid");
  const elPagination = document.getElementById("pagination");
  const elResultCount = document.getElementById("resultCount");
  const elSearch = document.getElementById("courseSearch");
  const elReset = document.getElementById("resetFilters");
  const elCategoryList = document.getElementById("categoryList");
  const elLangSv = document.getElementById("langSv");

  const escapeHtml = (str) =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const uniqueCategories = (items) => {
    const s = new Set();
    items.forEach(x => s.add(((x.category || "Övrigt")).trim()));
    return Array.from(s).sort((a,b) => a.localeCompare(b, "sv"));
  };

  const buildCategoryFilters = () => {
    const cats = uniqueCategories(data);
    elCategoryList.innerHTML = "";

    cats.forEach(cat => {
      const label = document.createElement("label");
      label.className = "checkbox checkbox--stack";
      label.innerHTML = `
        <input type="checkbox" data-cat="${escapeHtml(cat)}" />
        <span>${escapeHtml(cat)}</span>
      `;
      elCategoryList.appendChild(label);
    });

    elCategoryList.addEventListener("change", (e) => {
      const t = e.target;
      if (t && t.matches('input[type="checkbox"][data-cat]')) {
        const cat = t.getAttribute("data-cat");
        if (t.checked) selectedCategories.add(cat);
        else selectedCategories.delete(cat);
        currentPage = 1;
        render();
      }
    });
  };

  const applyFilters = (items) => {
    const q = (searchText || "").trim().toLowerCase();
    const langOk = elLangSv ? elLangSv.checked : true;

    return items.filter(item => {
      const langMatch = langOk ? ((item.language || "sv") === "sv") : true;

      const cat = (item.category || "Övrigt").trim();
      const catMatch = selectedCategories.size === 0 ? true : selectedCategories.has(cat);

      const title = (item.title || "").toLowerCase();
      const modulesText = Array.isArray(item.modules) ? item.modules.join(" ").toLowerCase() : "";
      const textMatch = q.length === 0 ? true : (title.includes(q) || modulesText.includes(q));

      return langMatch && catMatch && textMatch;
    });
  };

  const paginate = (items) => {
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    currentPage = Math.min(currentPage, pages);

    const start = (currentPage - 1) * pageSize;
    const slice = items.slice(start, start + pageSize);
    return { slice, total, pages };
  };

  const renderPagination = (pages) => {
    elPagination.innerHTML = "";
    if (pages <= 1) return;

    for (let p = 1; p <= pages; p++) {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = String(p);
      if (p === currentPage) a.classList.add("is-active");

      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = p;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      elPagination.appendChild(a);
    }
  };

  const renderCards = (items) => {
    elGrid.innerHTML = "";

    items.forEach(item => {
      const title = item.title || "Kurs";
      const category = item.category || "Övrigt";
      const modules = Array.isArray(item.modules) ? item.modules : [];

      const card = document.createElement("article");
      card.className = "course-card";

      card.innerHTML = `
        <div class="course-card__thumb" aria-hidden="true"></div>
        <div class="course-card__body">
          <div class="course-card__meta">${escapeHtml(category)}</div>
          <h2 class="course-card__title">${escapeHtml(title)}</h2>

          <button type="button" class="course-card__toggle" aria-expanded="false">
            Visa moduler (${modules.length})
          </button>

          <ul class="course-card__modules" hidden>
            ${modules.map(m => `<li>${escapeHtml(m)}</li>`).join("")}
          </ul>
        </div>
      `;

      const btn = card.querySelector(".course-card__toggle");
      const list = card.querySelector(".course-card__modules");

      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        list.hidden = expanded;
        btn.textContent = expanded ? `Visa moduler (${modules.length})` : "Dölj moduler";
      });

      elGrid.appendChild(card);
    });
  };

  const render = () => {
    const filtered = applyFilters(data);
    const { slice, total, pages } = paginate(filtered);

    elResultCount.textContent = `${total} träffar`;
    renderCards(slice);
    renderPagination(pages);
  };

  // Events
  elSearch.addEventListener("input", () => {
    searchText = elSearch.value || "";
    currentPage = 1;
    render();
  });

  elLangSv.addEventListener("change", () => {
    currentPage = 1;
    render();
  });

  elReset.addEventListener("click", () => {
    searchText = "";
    elSearch.value = "";
    selectedCategories.clear();

    elCategoryList
      .querySelectorAll('input[type="checkbox"][data-cat]')
      .forEach(cb => cb.checked = false);

    elLangSv.checked = true;

    currentPage = 1;
    render();
  });

  buildCategoryFilters();
  render();
})();
``
