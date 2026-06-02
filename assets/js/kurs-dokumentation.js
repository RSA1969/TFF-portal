let dataGlobal = null;
let currentCourse = null;
let currentModuleIndex = 0;

// ===============================
// URL
// ===============================
function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function setCourseIdInUrl(courseId) {
    const url = new URL(window.location.href);
    url.searchParams.set("id", courseId);
    window.history.replaceState({}, "", url.toString());
}

// ===============================
// DATA
// ===============================
async function loadData() {
    const response = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());

    if (!response.ok) {
        throw new Error("Kunde inte läsa assets/data/kurser-data.json");
    }

    return await response.json();
}

// ===============================
// ROOT-NORMALISERING
// Klarar:
// { "kurser": [...] }
// { "courses": [...] }
// [ ... ]
// ===============================
function getCoursesArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.kurser)) return data.kurser;
    if (Array.isArray(data?.courses)) return data.courses;
    return [];
}

// ===============================
// KURSFÄLT
// ===============================
function getCourseId(course, fallbackIndex = 0) {
    return (
        course?.id ??
        course?.kursId ??
        course?.kursID ??
        course?.kursid ??
        course?.slug ??
        `kurs${fallbackIndex + 1}`
    );
}

function getCourseTitle(course, fallbackIndex = 0) {
    return (
        course?.title ??
        course?.titel ??
        course?.kursTitel ??
        course?.kurstitel ??
        course?.name ??
        course?.namn ??
        `Kurs ${fallbackIndex + 1}`
    );
}

function getCourseDescription(course) {
    return (
        course?.description ??
        course?.beskrivning ??
        course?.text ??
        course?.kursText ??
        course?.kurstext ??
        ""
    );
}

// ===============================
// MODULFÄLT
// ===============================
function getModulesArray(course) {
    if (Array.isArray(course?.modules)) return course.modules;
    if (Array.isArray(course?.moduler)) return course.moduler;
    return [];
}

function getModuleTitle(module, fallbackIndex = 0) {
    return (
        module?.title ??
        module?.titel ??
        module?.modulTitel ??
        module?.modultitel ??
        module?.name ??
        module?.namn ??
        `Modul ${fallbackIndex + 1}`
    );
}

function getModuleText(module) {
    return (
        module?.text ??
        module?.innehall ??
        module?.innehåll ??
        module?.beskrivning ??
        module?.syfte ??
        module?.content ??
        ""
    );
}

function getModuleVideo(module) {
    return (
        module?.video ??
        module?.videoUrl ??
        module?.videourl ??
        module?.film ??
        module?.url ??
        ""
    );
}

// ===============================
// VIDEO
// ===============================
function resolveVideoPath(videoValue) {
    if (!videoValue) return "";

    if (
        videoValue.startsWith("http://") ||
        videoValue.startsWith("https://") ||
        videoValue.startsWith("//")
    ) {
        return videoValue;
    }

    return "video/" + String(videoValue).replace(/^\/+/, "");
}

// ===============================
// HTML-SÄKERHET
// ===============================
function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
    return String(value ?? "").replaceAll('"', "&quot;");
}

// ===============================
// DROPDOWN
// ===============================
function renderCourseSelect() {
    const select = document.getElementById("courseSelect");
    const courses = getCoursesArray(dataGlobal);

    if (!select) {
        console.error("Elementet #courseSelect hittades inte.");
        return;
    }

    if (!courses.length) {
        select.innerHTML = `<option value="">Inga kurser hittades</option>`;
        return;
    }

    select.innerHTML = courses
        .map((course, index) => {
            const courseId = getCourseId(course, index);
            const courseTitle = getCourseTitle(course, index);

            return `<option value="${escapeAttribute(courseId)}">${escapeHtml(courseTitle)}</option>`;
        })
        .join("");

    select.onchange = function () {
        loadCourse(this.value);
    };
}

// ===============================
// LADDA KURS
// ===============================
function loadCourse(requestedId) {
    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
        currentCourse = null;
        renderModules();
        renderEmptyContent("Inga kurser hittades i JSON-filen.");
        return;
    }

    const normalizedCourses = courses.map((course, index) => ({
        raw: course,
        id: String(getCourseId(course, index)),
        title: getCourseTitle(course, index)
    }));

    let selected = normalizedCourses.find(c => c.id === String(requestedId));

    if (!selected) {
        selected = normalizedCourses[0];
    }

    currentCourse = selected.raw;
    currentModuleIndex = 0;

    const select = document.getElementById("courseSelect");
    if (select) {
        select.value = selected.id;
    }

    setCourseIdInUrl(selected.id);

    renderModules();
    renderModule();
}

// ===============================
// MODULLISTA
// ===============================
function renderModules() {
    const list = document.getElementById("moduleList");

    if (!list) {
        console.error("Elementet #moduleList hittades inte.");
        return;
    }

    if (!currentCourse) {
        list.innerHTML = "";
        return;
    }

    const modules = getModulesArray(currentCourse);

    if (!modules.length) {
        list.innerHTML = `<div class="muted-box">Inga moduler hittades för vald kurs.</div>`;
        return;
    }

    list.innerHTML = modules
        .map((module, index) => {
            const title = getModuleTitle(module, index);
            const statusText = "Modul ej klar • Quiz: Ej godkänd";

            return `
                <div class="module-item ${index === currentModuleIndex ? "active" : ""}" onclick="selectModule(${index})">
                    <div class="module-item-title">${index + 1}. ${escapeHtml(title)}</div>
                    <div class="module-item-status">${statusText}</div>
                </div>
            `;
        })
        .join("");
}

// ===============================
// VÄLJ MODUL
// ===============================
function selectModule(index) {
    currentModuleIndex = index;
    renderModules();
    renderModule();
}

// ===============================
// TOMT INNEHÅLL
// ===============================
function renderEmptyContent(message) {
    const contentArea = document.getElementById("contentArea");

    if (!contentArea) {
        console.error("Elementet #contentArea hittades inte.");
        return;
    }

    contentArea.innerHTML = `<h2 class="empty-state">${escapeHtml(message)}</h2>`;
}

// ===============================
// RENDERA MODUL
// ===============================
function renderModule() {
    const contentArea = document.getElementById("contentArea");

    if (!contentArea) {
        console.error("Elementet #contentArea hittades inte.");
        return;
    }

    if (!currentCourse) {
        renderEmptyContent("Ingen kurs vald.");
        return;
    }

    const courseTitle = getCourseTitle(currentCourse);
    const courseDescription = getCourseDescription(currentCourse);
    const modules = getModulesArray(currentCourse);

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
    const moduleText = getModuleText(module);
    const rawVideo = getModuleVideo(module);
    const videoPath = resolveVideoPath(rawVideo);

    contentArea.innerHTML = `
        <div class="content-header">
            <h2 class="content-title">${escapeHtml(courseTitle)}</h2>
            ${courseDescription ? `<p class="section-text">${escapeHtml(courseDescription)}</p>` : ""}
        </div>

        <h3>Modul ${currentModuleIndex + 1} – ${escapeHtml(moduleTitle)}</h3>

        <div class="content-text">
            ${moduleText ? `<p>${escapeHtml(moduleText)}</p>` : `<p>Ingen modultext angiven.</p>`}
        </div>

        ${
            videoPath
                ? `
                <div class="video-wrap">
                    <h3>Video</h3>
                    <video controls preload="metadata">
                        <source src="${escapeAttribute(videoPath)}" type="video/mp4">
                        Din webbläsare stödjer inte video.
                    </video>
                </div>
                `
                : `
                <div class="muted-box">
                    Ingen video angiven för denna modul.
                </div>
                `
        }

        <div class="nav-buttons">
            <button class="btn" onclick="prevModule()">Föregående modul</button>
            <button class="btn primary" onclick="nextModule()">Nästa modul</button>
        </div>
    `;
}

// ===============================
// NAVIGATION
// ===============================
function prevModule() {
    const modules = currentCourse ? getModulesArray(currentCourse) : [];

    if (!modules.length) return;

    if (currentModuleIndex > 0) {
        currentModuleIndex--;
        renderModules();
        renderModule();
    }
}

function nextModule() {
    const modules = currentCourse ? getModulesArray(currentCourse) : [];

    if (!modules.length) return;

    if (currentModuleIndex < modules.length - 1) {
        currentModuleIndex++;
        renderModules();
        renderModule();
    }
}

// ===============================
// INIT
// ===============================
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
        renderEmptyContent("Kunde inte läsa kursdata. Kontrollera JSON-strukturen i assets/data/kurser-data.json.");
    }
}

init();
