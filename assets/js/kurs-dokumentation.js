// ===============================
// HÄMTA URL PARAMETER (kurs id)
// ===============================
function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ===============================
// HÄMTA DATA
// ===============================
async function loadCourses() {
    const response = await fetch("assets/data/kurser-data.json?nocache=" + new Date().getTime());
    return await response.json();
}

// ===============================
// KONVERTERA VIDEO-VÄG
// ===============================
function resolveVideoPath(video) {
    
    if (!video) return "";

    // FALL 1: Redan en full URL (Teams / SharePoint)
    if (video.startsWith("http")) {
        return video;
    }

    // FALL 2: Lokal video (lägg automatiskt till /video/)
    return "video/" + video;
}

// ===============================
// RENDERA KURS
// ===============================
function renderCourse(course) {

    const container = document.getElementById("course-container");

    container.innerHTML = `
        <h1>${course.title}</h1>
        <p>${course.description}</p>
        ${course.modules.map((m, index) => renderModule(m, index)).join("")}
    `;
}

// ===============================
// RENDERA MODUL
// ===============================
function renderModule(module, index) {

    const videoUrl = resolveVideoPath(module.video);

    return `
        <div class="module">

            <h2>Modul ${index + 1}: ${module.title}</h2>

            <p>${module.text}</p>

            ${videoUrl ? `
                <video controls width="100%">
                    <source src="${videoUrl}" type="video/mp4">
                    Din webbläsare stödjer inte video.
                </video>
            ` : ""}

            ${renderQuiz(module.quiz)}

        </div>
    `;
}

// ===============================
// RENDERA QUIZ
// ===============================
function renderQuiz(quiz) {

    if (!quiz || !quiz.questions) return "";

    return `
        <div class="quiz">
            <h3>Kunskapstest</h3>

            ${quiz.questions.map((q, qi) => `
                <div class="question">
                    <p>${qi + 1}. ${q.question}</p>

                    ${q.options.map((opt, oi) => `
                        <label>
                            <input type="radio" name="q${qi}" value="${oi}">
                            ${opt}
                        </label>
                    `).join("<br>")}

                </div>
            `).join("")}
        </div>
    `;
}

// ===============================
// INIT
// ===============================
async function init() {

    const id = getCourseId();

    const data = await loadCourses();

    const course = data.find(c => c.id === id);

    if (!course) {
        document.getElementById("course-container").innerHTML = "<p>Kurs hittades inte</p>";
        return;
    }

    renderCourse(course);
}

init();
