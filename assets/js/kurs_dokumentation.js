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
function renderCourse(course) {

    const container = document.querySelector(".container");

    container.innerHTML = `
        <div style="display:flex; gap:20px">

            <div style="width:300px">
                <h3>Moduler</h3>

                ${course.modules.map((m, i) => `
                    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
                        <strong>${i+1}. ${m.title}</strong>
                    </div>
                `).join("")}
            </div>

            <div style="flex:1">
                <h2>Innehåll</h2>

                <h3>Video</h3>

                <video controls width="100%">
                    ${resolveVideo(course.modules[0].video)}
                </video>
            </div>

        </div>
    `;
}

// ===============================
async function init() {

    const id = getCourseId();

    const data = await loadData();

    // ✅ VIKTIG FIX HÄR
    const course = data.kurser.find(c => c.id === id);

    if (!course) {
        document.querySelector(".container").innerHTML = "Kurs hittades inte";
        return;
    }

    renderCourse(course);
}

init();
