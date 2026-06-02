let dataGlobal = null;
let currentCourse = null;
let currentModuleIndex = 0;

// =======================
// LOAD DATA
// =======================
async function loadData() {
    const res = await fetch("assets/data/kurser-data.json?nocache=" + Date.now());
    return await res.json();
}

// =======================
// COURSE SELECT
// =======================
function renderCourseSelect() {

    const select = document.getElementById("courseSelect");

    select.innerHTML = dataGlobal.kurser.map(c =>
        `<option value="${c.id}">${c.titel}</option>`
    ).join("");

    select.onchange = (e) => loadCourse(e.target.value);
}

// =======================
// LOAD COURSE
// =======================
function loadCourse(id) {

    currentCourse = dataGlobal.kurser.find(c => c.id === id);

    if (!currentCourse) {
        currentCourse = dataGlobal.kurser[0];
    }

    currentModuleIndex = 0;

    renderModules();
    renderModule();
}

// =======================
// MODULE LIST
// =======================
function renderModules() {

    const list = document.getElementById("moduleList");

    list.innerHTML = currentCourse.moduler.map((m, i) => `
        <div class="module-item ${i === currentModuleIndex ? "active" : ""}"
             onclick="selectModule(${i})"
             style="padding:10px;border:1px solid #ccc;margin-bottom:5px;cursor:pointer;">
            
            <div><strong>${i + 1}. ${m.titel}</strong></div>
            <div style="font-size:12px;color:#666;">${m.quiz?.length || 0} frågor</div>

        </div>
    `).join("");
}

// =======================
function selectModule(i) {
    currentModuleIndex = i;
    renderModules();
    renderModule();
}

// =======================
// VIDEO FIX (VIKTIG)
// =======================
function renderVideo(videoPath) {

    if (!videoPath) return "";

    return `
        <div style="margin-top:20px;">
            <video controls width="100%">
                ${videoPath}
                Din webbläsare stödjer inte video.
            </video>
        </div>
    `;
}

// =======================
// QUIZ
// =======================
function renderQuiz(module) {

    if (!module.quiz || module.quiz.length === 0) {
        return "<p>Ingen quiz för denna modul.</p>";
    }

    return `
        <h3>Quiz</h3>

        ${module.quiz.map((q, qi) => `
            <div style="margin-bottom:20px;">
                
                <strong>${qi + 1}. ${q.question}</strong><br><br>

                ${q.options.map((opt, oi) => `
                    <label>
                        <input type="radio" name="q${qi}" value="${oi + 1}">
                        ${opt}
                    </label><br>
                `).join("")}

                <div id="feedback_${qi}" style="margin-top:5px;"></div>
            </div>
        `).join("")}

        <button onclick="checkQuiz()">Rätta</button>

        <div id="result" style="margin-top:10px;font-weight:bold;"></div>
    `;
}

// =======================
// CHECK QUIZ
// =======================
function checkQuiz() {

    const module = currentCourse.moduler[currentModuleIndex];
    const quiz = module.quiz;

    let score = 0;

    quiz.forEach((q, i) => {

        const selected = document.querySelector(`input[name=q${i}]:checked`);
        const feedback = document.getElementById(`feedback_${i}`);

        if (!selected) {
            feedback.innerHTML = "⚠️ Ingen vald";
            return;
        }

        if (parseInt(selected.value) === q.correct) {
            score++;
            feedback.innerHTML = "✅ Rätt";
        } else {
            feedback.innerHTML = `❌ Fel (rätt svar: ${q.options[q.correct - 1]})`;
        }
    });

    document.getElementById("result").innerText =
        `Resultat: ${score}/${quiz.length}`;
}

// =======================
// RENDER MODULE
// =======================
function renderModule() {

    const m = currentCourse.moduler[currentModuleIndex];

    document.getElementById("contentArea").innerHTML = `
        <h2>${currentCourse.titel}</h2>
        <h3>${m.titel}</h3>

        <p><strong>Syfte:</strong> ${m.syfte}</p>

        <ul>
            ${m.innehall.map(x => `<li>${x}</li>`).join("")}
        </ul>

        ${renderVideo(m.video)}

        ${renderQuiz(m)}
    `;
}

// =======================
// INIT
// =======================
async function init() {

    dataGlobal = await loadData();

    renderCourseSelect();

    loadCourse(dataGlobal.kurser[0].id);
}

init();
