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
// HJÄLP - HTML escape
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
// LADDA DATA
// ===============================
async function loadData() {
    const response = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());

    if (!response.ok) {
        throw new Error("Kunde inte läsa assets/data/kurser-data.json");
    }

    return await response.json();
}

// ===============================
// NORMALISERING - ROOT
// ===============================
function getCoursesArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.kurser)) return data.kurser;
    if (Array.isArray(data?.courses)) return data.courses;
    return [];
}

// ===============================
// NORMALISERING - KURSFÄLT
// Anpassad efter din JSON
// ===============================
function getCourseId(course, index = 0) {
    return String(
        course?.id ??
        course?.kursId ??
        course?.kursID ??
        ("kurs" + (index + 1))
    );
}

function getCourseTitle(course, index = 0) {
    return String(
        course?.titel ??
        course?.title ??
        ("Kurs " + (index + 1))
    );
}

function getCoursePurpose(course) {
    return String(
        course?.syfte ??
        course?.purpose ??
        ""
    );
}

function getCourseDescription(course) {
    return String(
        course?.beskrivning ??
        course?.description ??
        ""
    );
}

function getCourseImage(course) {
    return String(
        course?.image ??
        course?.bild ??
        ""
    );
}

function getCourseColor(course) {
    return String(
        course?.color ??
        ""
    );
}

function getCourseActive(course) {
    return String(
        course?.active ??
        ""
    );
}

function getCourseModules(course) {
    if (Array.isArray(course?.moduler)) return course.moduler;
    if (Array.isArray(course?.modules)) return course.modules;
    return [];
}

// ===============================
// NORMALISERING - MODULFÄLT
// Anpassad efter din JSON
// ===============================
function getModuleId(module, index = 0) {
    return String(
        module?.id ??
        ("m" + (index + 1))
    );
}

function getModuleTitle(module, index = 0) {
    return String(
        module?.titel ??
        module?.title ??
        ("Modul " + (index + 1))
    );
}

function getModulePurpose(module) {
    return String(
        module?.syfte ??
        module?.purpose ??
        ""
    );
}

function getModuleDescription(module) {
    return String(
        module?.beskrivning ??
        module?.description ??
        ""
    );
}

function getModuleContentList(module) {
    if (Array.isArray(module?.innehall)) return module.innehall;
    if (Array.isArray(module?.innehåll)) return module.innehåll;
    if (Array.isArray(module?.content)) return module.content;
    return [];
}

function getModuleVideo(module) {
    return String(
        module?.video ??
        module?.videoUrl ??
        ""
    );
}

function getModuleQuiz(module) {
    if (Array.isArray(module?.quiz)) return module.quiz;
    if (Array.isArray(module?.questions)) return module.questions;
    if (Array.isArray(module?.frågor)) return module.frågor;
    return [];
}

// ===============================
// VIDEO-PATH
// ===============================
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

// ===============================
// TOMT INNEHÅLL
// ===============================
function renderEmptyContent(message) {
    const contentArea = document.getElementById("contentArea");
    if (!contentArea) return;

    contentArea.innerHTML = `
        <h2 class="empty-state">${escapeHtml(message)}</h2>
    `;
}

// ===============================
// DROPDOWN
// ===============================
function renderCourseSelect() {
    const select = document.getElementById("courseSelect");
    if (!select) return;

    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
        select.innerHTML = `<option value="">Inga kurser hittades</option>`;
        return;
    }

    select.innerHTML = courses
        .map((course, index) => {
            const id = getCourseId(course, index);
            const title = getCourseTitle(course, index);
            return `<option value="${escapeHtml(id)}">${escapeHtml(title)}</option>`;
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

// ===============================
// MODULLISTA
// ===============================
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

    list.innerHTML = modules
        .map((module, index) => {
            const title = getModuleTitle(module, index);
            const quizCount = getModuleQuiz(module).length;
            const activeClass = index === currentModuleIndex ? "active" : "";
            const quizText =
