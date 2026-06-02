let DATA = null;
const container = document.getElementById("courses");

// =========================
// HÄMTA JSON
// =========================
fetch("./assets/data/kurser-data.json")
.then(res => {
    if (!res.ok) {
        throw new Error("JSON hittades inte");
    }
    return res.json();
})
.then(data => {
    DATA = data;
    renderCourses();
})
.catch(error => {
    container.innerHTML = `
        <h2>Fel vid laddning</h2>
        <p>Kontrollera att filen finns här:</p>
        <p><b>assets/data/kurser-data.json</b></p>
    `;
    console.error(error);
});

// =========================
// VISA KURSER
// =========================
function renderCourses() {

    container.innerHTML = `
        <h1>Utbildningar</h1>
        <div id="courseGrid"></div>
    `;

    const grid = document.getElementById("courseGrid");

    DATA.courses
    .filter(c => c.active === "Ja")
    .forEach(course => {

        grid.innerHTML += `
            <div class="card" style="background:${course.color}">
                <h3>${course.title}</h3>
                <p>${course.purpose}</p>
                <button onclick="openCourse(${course.courseId})">
                    Öppna kurs
                </button>
            </div>
        `;
    });
}

// =========================
// MODULER
// =========================
function openCourse(courseId) {

    const course = DATA.courses.find(c => c.courseId == courseId);

    container.innerHTML = `
        <h2>${course.title}</h2>
        <button onclick="renderCourses()">← Tillbaka</button>
        <div id="modules"></div>
    `;

    const modulesDiv = document.getElementById("modules");

    const modules = DATA.modules.filter(m => m.courseId == courseId);

    modules.forEach(m => {
        modulesDiv.innerHTML += `
            <div class="card">
                <h3>${m.title}</h3>
                <button onclick="openModule(${courseId}, ${m.moduleId})">
                    Starta modul
                </button>
            </div>
        `;
    });
}

// =========================
// MODUL + VIDEO + FRÅGOR
// =========================
function openModule(courseId, moduleId) {

    const module = DATA.modules.find(m => m.moduleId == moduleId);

    container.innerHTML = `
        <h2>${module.title}</h2>
        <button onclick="openCourse(${courseId})">← Tillbaka</button>

        <video controls>
            <source src="${module.video}" type="video/mp4">
        </video>

        <div id="questions"></div>
    `;

    const questions = DATA.questions.filter(q => q.moduleId == moduleId);

    renderQuestions(questions);
}

// =========================
// FRÅGOR
// =========================
function renderQuestions(questions) {

    const qDiv = document.getElementById("questions");
    qDiv.innerHTML = "<h3>Frågor</h3>";

    questions.forEach((q, index) => {

        let options = [
            {text: q.option1, key: 1},
            {text: q.option2, key: 2},
            {text: q.option3, key: 3},
            {text: q.option4, key: 4}
        ];

        options.sort(() => Math.random() - 0.5);

        let html = `
            <div class="card">
                <p>${index + 1}. ${q.question}</p>
        `;

        options.forEach(o => {
            html += `
                <button onclick="checkAnswer(${o.key}, ${q.correct}, this)">
                    ${o.text}
                </button>
            `;
        });

        html += "</div>";

        qDiv.innerHTML += html;
    });
}

// =========================
// RÄTT
// =========================
function checkAnswer(selected, correct, btn) {

    if (selected == correct) {
        btn.style.backgroundColor = "green";
    } else {
        btn.style.backgroundColor = "red";
    }

    btn.disabled = true;
}
