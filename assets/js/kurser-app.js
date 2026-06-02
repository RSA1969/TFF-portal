let DATA = null;
const container = document.getElementById("courses");

// ✅ KORREKT RAW-LÄNK
fetch("https://raw.githubusercontent.com/RSA1969/TFF-portal/main/assets/data/kurser-data.json")
.then(res => {
    if (!res.ok) throw new Error("Kan inte läsa JSON");
    return res.json();
})
.then(data => {
    DATA = data;
    renderCourses();
})
.catch(error => {
    container.innerHTML = `
        <h2 style="color:red">Fel vid laddning</h2>
        <p>JSON kunde inte läsas</p>
    `;
    console.error(error);
});

function renderCourses() {

    container.innerHTML = `
        <h1>Utbildningar</h1>
        <div id="courseGrid"></div>
    `;

    const grid = document.getElementById("courseGrid");

    DATA.courses.forEach(c => {
        if (c.active === "Ja") {
            grid.innerHTML += `
                <div class="card" style="background:${c.color}">
                    <h3>${c.title}</h3>
                    <p>${c.purpose}</p>
                    <button onclick="openCourse(${c.courseId})">
                        Öppna kurs
                    </button>
                </div>
            `;
        }
    });
}

function openCourse(courseId) {

    const course = DATA.courses.find(c => c.courseId == courseId);

    container.innerHTML = `
        <h2>${course.title}</h2>
        <button onclick="renderCourses()">← Tillbaka</button>
        <div id="modules"></div>
    `;

    const modulesDiv = document.getElementById("modules");

    DATA.modules
        .filter(m => m.courseId == courseId)
        .forEach(m => {

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

function openModule(courseId, moduleId) {

    const module = DATA.modules.find(m => m.moduleId == moduleId);

    container.innerHTML = `
        <h2>${module.title}</h2>
        <button onclick="openCourse(${courseId})">← Tillbaka</button>

        <video width="100%" controls>
            ${module.video}
        </video>

        <div id="questions"></div>
    `;

    renderQuestions(
        DATA.questions.filter(q => q.moduleId == moduleId)
    );
}

function renderQuestions(questions) {

    const qDiv = document.getElementById("questions");

    questions.forEach((q, i) => {

        let options = [
            {text: q.option1, key: 1},
            {text: q.option2, key: 2},
            {text: q.option3, key: 3},
            {text: q.option4, key: 4}
        ];

        options.sort(() => Math.random() - 0.5);

        let html = `
            <div class="card">
                <p>${i+1}. ${q.question}</p>
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

function checkAnswer(selected, correct, btn) {

    btn.style.backgroundColor =
        selected === correct ? "green" : "red";

    btn.disabled = true;
}
