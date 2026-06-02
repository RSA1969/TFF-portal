let courses = [];
let currentCourse = null;
let currentModuleIndex = 0;

// ===============================
async function loadData() {
    const res = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());
    courses = await res.json();
}

// ===============================
function resolveVideo(video) {
    if (!video) return "";
    if (video.startsWith("http")) return video;
    return "video/" + video;
}

// ===============================
function renderCourseSelect() {
    const select = document.getElementById("courseSelect");

    select.innerHTML = courses.map(c =>
        `<option value="${c.id}">${c.title}</option>`
    ).join("");

    select.onchange = () => {
        loadCourse(select.value);
    };
}

// ===============================
function loadCourse(id) {
    currentCourse = courses.find(c => c.id === id);
    currentModuleIndex = 0;

    renderModules();
    renderModule();
}

// ===============================
function renderModules() {
    const list = document.getElementById("moduleList");

    list.innerHTML = currentCourse.modules.map((m, i) => `
        <div class="module-item ${i === currentModuleIndex ? "active" : ""}" onclick="selectModule(${i})">
            <strong>${i+1}. ${m.title}</strong>
        </div>
    `).join("");
}

// ===============================
function selectModule(index) {
    currentModuleIndex = index;
    renderModules();
    renderModule();
}

// ===============================
function renderModule() {
    const module = currentCourse.modules[currentModuleIndex];
    const container = document.getElementById("contentArea");

    const video = resolveVideo(module.video);

    container.innerHTML = `
        <h2>${module.title}</h2>

        <p><strong>Syfte:</strong> ${module.text}</p>

        <h3>Innehåll</h3>
        <ul>
            <li>${module.text}</li>
        </ul>

        ${video ? `
            <video controls>
                <source src="${video}" type="video/mp4">
            </video>
        ` : ""}

        <br><br>

        <button class="button" onclick="prevModule()">Föregående</button>
        <button class="button" onclick="nextModule()">Nästa</button>
    `;
}

// ===============================
function nextModule() {
    if (currentModuleIndex < currentCourse.modules.length - 1) {
        currentModuleIndex++;
        renderModules();
        renderModule();
    }
}

// ===============================
function prevModule() {
    if (currentModuleIndex > 0) {
        currentModuleIndex--;
        renderModules();
        renderModule();
    }
}

// ===============================
async function init() {
    await loadData();
    renderCourseSelect();
    loadCourse(courses[0].id);
}

init();
