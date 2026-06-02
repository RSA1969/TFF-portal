let dataGlobal = null;
let currentCourse = null;
let currentModuleIndex = 0;

// ===============================
// URL-ID
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
// DATAHÄMTNING
// ===============================
async function loadData() {
    const response = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());

    if (!response.ok) {
        throw new Error("Kunde inte läsa assets/data/kurser-data.json");
    }

    return await response.json();
}

// ===============================
// NORMALISERING AV ROOT
// Klarar:
// { kurser: [...] }
// { courses: [...] }
// [ ... ]
// ===============================
function getCoursesArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.kurser)) return data.kurser;
    if (Array.isArray(data?.courses)) return data.courses;
    return [];
}

// ===============================
// HJÄLPFUNKTIONER FÖR DIN BENÄMNING
// Klarar olika fältnamn utan att krascha
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

    return "video/" + videoValue.replace(/^\/+/, "");
}

// ===============================
// DROPDOWN
// ===============================
function renderCourseSelect() {
    const select = document.getElementById("courseSelect");
    const courses = getCoursesArray(dataGlobal);

    if (!courses.length) {
        select.innerHTML = `<option value="">Inga kurser hittades</option>`;
        return;
    }

    select.innerHTML = courses
        .map((course, index) => {
            const courseId = getCourseId(course, index);
            const courseTitle = getCourseTitle(course, index);

            return `<option value="${escapeHtml(courseId)}">${escapeHtml(courseTitle)}</option>`;
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

    // Om URL-id inte matchar exakt, använd första kursen
    if (!selected) {
        selected = normalizedCourses[0];
    }

    currentCourse = selected.raw;
    currentModuleIndex = 0;

    document.getElementById("courseSelect").value = selected.id;
    setCourseIdInUrl(selected.id);

    renderModules();
    renderModule();
}

// ===============================
// MODULLISTA
// ===============================
function renderModules() {
    const list = document.getElementById("moduleList");

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
// MODULINNEHÅLL
// ===============================
function renderModule() {
    const contentArea = document.getElementById("contentArea");

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

