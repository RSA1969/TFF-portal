let courses = [];
let currentCourse = null;
let currentModuleIndex = 0;

// ===============================
function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ===============================
async function loadData() {
    const res = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());
    return await res.json();
}

// ===============================
function resolveVideo(video) {
    if (!video) return "";
    if (video.startsWith("http")) return video;
    return "video/" + video;
}

// ===============================
function renderCourseSelect(data) {
    const select = document.getElementById("courseSelect");

    select.innerHTML = data.kurser.map(c =>
        `<option value="${c.id}">${c.title}</option>`
    ).join("");

    select.onchange = () => {
        loadCourse(select.value, data);
    };
}

// ===============================
function loadCourse(id, data) {

    currentCourse = data.kurser.find(c => c.id === id);

    currentModuleIndex = 0;

    renderModules();
    renderModule();

    // sätt dropdown rätt
    document.getElementById("courseSelect").value = id;
}

// ===============================
function renderModules() {
    const list = document.getElementById("moduleList");

    list.innerHTML = currentCourse.modules.map((m, i) => `
        <div class="module-item ${i === currentModuleIndex ? "active" : ""}" onclick="selectModule(${i})">
            <strong>${i + 1}. ${m.title}</strong>
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
                ${video}
            </video>
        ` : ""}

        <br><br>

        <button onclick="prevModule()">Föregående</button>
        <button onclick="nextModule()">Nästa</button>
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

    const data = await loadData();

    // fyll dropdown
    renderCourseSelect(data);

    // ✅ HÄR ÄR FIXEN
    const urlCourseId = getCourseId();

    const courseId = urlCourseId || data.kurser[0].id;

    loadCourse(courseId, data);
}

init();
``
