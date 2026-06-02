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

function getCoursesArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.kurser)) return data.kurser;
    if (Array.isArray(data?.courses)) return data.courses;
    return [];
}

// ===============================
// HJÄLPFUNKTIONER - KURS
// ===============================
function getCourseId(course, fallbackIndex) {
    return String(
        course?.id ??
        course?.kursId ??
        course?.kursID ??
        course?.kursid ??
        course?.slug ??
        ("kurs" + (fallbackIndex + 1))
    );
}

function getCourseTitle(course, fallbackIndex) {
    return String(
        course?.title ??
        course?.titel ??
        course?.kursTitel ??
        course?.kurstitel ??
        course?.name ??
        course?.namn ??
        ("Kurs " + (fallbackIndex + 1))
    );
}

function getCourseDescription(course) {
    return String(
        course?.description ??
        course?.beskrivning ??
        course?.text ??
        course?.kursText ??
        course?.kurstext ??
        ""
    );
}

// ===============================
// HJÄLPFUNKTIONER - MODUL
// ===============================
function getModulesArray(course) {
    if (Array.isArray(course?.modules)) return course.modules;
    if (Array.isArray(course?.moduler)) return course.moduler;
    return [];
}

function getModuleTitle(module, fallbackIndex) {
    return String(
        module?.title ??
        module?.titel ??
        module?.modulTitel ??
        module?.modultitel ??
        module?.name ??
        module?.namn ??
        ("Modul " + (fallbackIndex + 1))
    );
}

function getModuleText(module) {
    return String(
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
    return String(
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

    return "video/" + videoValue.replace(/^\/+/, "");
}

// ===============================
// HTML ESCAPE
// ===============================
function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// ===============================
// UI - TOMT INNEHÅLL
// ===============================
function renderEmptyContent(message) {
    const contentArea = document.getElementById("contentArea");
    if (!contentArea) return;

    contentArea.innerHTML = "<h2 class=\"empty-state\">" + escapeHtml(message) + "</h2>";
}

// ===============================
// UI - DROPDOWN
// ===============================
function renderCourseSelect() {
    const select = document.getElementById("courseSelect");
    if (!select) return;

    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
        select.innerHTML = "<option value=\"\">Inga kurser hittades</option>";
        return;
    }

    let html = "";

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        const courseId = getCourseId(course, i);
        const courseTitle = getCourseTitle(course, i);

        html += "<option value=\"" + escapeHtml(courseId) + "\">" + escapeHtml(courseTitle) + "</option>";
    }

    select.innerHTML = html;

    select.onchange = function () {
        loadCourse(this.value);
    };
}

// ===============================
// UI - LADDA KURS
// ===============================
function loadCourse(requestedId) {
    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
        currentCourse = null;
        renderModules();
        renderEmptyContent("Inga kurser hittades i JSON-filen.");
        return;
    }

    let selectedCourse = null;
    let selectedCourseId = null;

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        const courseId = getCourseId(course, i);

        if (String(courseId) === String(requestedId)) {
            selectedCourse = course;
            selectedCourseId = courseId;
            break;
        }
    }

    if (!selectedCourse) {
        selectedCourse = courses[0];
        selectedCourseId = getCourseId(courses[0], 0);
    }

    currentCourse = selectedCourse;
    currentModuleIndex = 0;

    const select = document.getElementById("courseSelect");
    if (select) {
        select.value = selectedCourseId;
    }

    setCourseIdInUrl(selectedCourseId);

    renderModules();
    renderModule();
}

// ===============================
// UI - MODULLISTA
// ===============================
function renderModules() {
    const list = document.getElementById("moduleList");
    if (!list) return;

    if (!currentCourse) {
        list.innerHTML = "";
        return;
    }

    const modules = getModulesArray(currentCourse);

    if (!modules.length) {
        list.innerHTML = "<div class=\"muted-box\">Inga moduler hittades för vald kurs.</div>";
        return;
    }

    let html = "";

    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const title = getModuleTitle(module, i);
        const activeClass = i === currentModuleIndex ? " active" : "";

        html += ""
            + "<div class=\"module-item" + activeClass + "\" onclick=\"selectModule(" + i + ")\">"
            + "  <div class=\"module-item-title\">" + (i + 1) + ". " + escapeHtml(title) + "</div>"
            + "  <div class=\"module-item-status\">Modul ej klar • Quiz: Ej godkänd</div>"
            + "</div>";
    }

    list.innerHTML = html;
}

// ===============================
// UI - VÄLJ MODUL
// ===============================
function selectModule(index) {
    currentModuleIndex = index;
    renderModules();
    renderModule();
}

// ===============================
// UI - MODULINNEHÅLL
// ===============================
function renderModule() {
    const contentArea = document.getElementById("contentArea");
    if (!contentArea) return;

    if (!currentCourse) {
        renderEmptyContent("Ingen kurs vald.");
        return;
    }

    const courseTitle = getCourseTitle(currentCourse, 0);
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

    let html = "";

    html += "<div class=\"content-header\">";
    html += "  <h2 class=\"content-title\">" + escapeHtml(courseTitle) + "</h2>";

    if (courseDescription) {
        html += "  <p class=\"section-text\">" + escapeHtml(courseDescription) + "</p>";
    }

    html += "</div>";

    html += "<h3>Modul " + (currentModuleIndex + 1) + " – " + escapeHtml(moduleTitle) + "</h3>";

    if (moduleText) {
        html += "<div class=\"content-text\"><p>" + escapeHtml(moduleText) + "</p></div>";
    } else {
        html += "<div class=\"content-text\"><p>Ingen modultext angiven.</p></div>";
    }

    if (videoPath) {
        html += "<div class=\"video-wrap\">";
        html += "  <h3>Video</h3>";
        html += "  <video controls preload=\"metadata\">";
        html += "      <source src=\"" + escapeHtml(videoPath) + "\" type=\"video/mp4\">";
        html += "      Din webbläsare stödjer inte video.";
        html += "  </video>";
        html += "</div>";
    } else {
        html += "<div class=\"muted-box\">Ingen video angiven för denna modul.</div>";
    }

    html += "<div class=\"nav-buttons\">";
    html += "  <button class=\"btn\" onclick=\"prevModule()\">Föregående modul</button>";
    html += "  <button class=\"btn primary\" onclick=\"nextModule()\">Nästa modul</button>";
    html += "</div>";

    contentArea.innerHTML = html;
}

// ===============================
// UI - NAVIGATION
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
``
