let DATA = null;
const container = document.getElementById("courses");
const DATA_URL = "https://raw.githubusercontent.com/RSA1969/TFF-portal/main/assets/data/kurser-data.json";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    DATA = await res.json();
    renderCourses();
  } catch (error) {
    console.error("Laddningsfel:", error);
    container.innerHTML = `
      <section class="state-error card">
        <h1>Fel vid laddning</h1>
        <p>Kunde inte läsa kursdata.</p>
        <ul>
          <li>Kontrollera att filen finns i <code>assets/data/kurser-data.json</code></li>
          <li>Kontrollera att Raw-länken fungerar i webbläsaren</li>
          <li>Kontrollera att JSON-filen inte innehåller syntaxfel</li>
        </ul>
      </section>
    `;
  }
}

function renderCourses() {
  const activeCourses = (DATA?.courses || []).filter(c => String(c.active).trim().toLowerCase() === "ja");

  container.innerHTML = `
    <section class="page-header">
      <h1>Utbildningar</h1>
      <p class="page-subtitle">Välj kurs för att öppna moduler och frågor.</p>
    </section>
    <section id="courseGrid" class="card-grid"></section>
  `;

  const grid = document.getElementById("courseGrid");

  activeCourses.forEach(course => {
    const card = document.createElement("article");
    card.className = "card course-card";
    card.style.background = course.color || "#eaf4f3";
    card.innerHTML = `
      <div class="card-body">
        <h2>${escapeHtml(course.title)}</h2>
        <p>${escapeHtml(course.purpose || "")}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="openCourse(${course.courseId})">Öppna kurs</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openCourse(courseId) {
  const course = (DATA.courses || []).find(c => Number(c.courseId) === Number(courseId));
  const modules = (DATA.modules || [])
    .filter(m => Number(m.courseId) === Number(courseId))
    .sort((a, b) => Number(a.moduleNumber || a.moduleId) - Number(b.moduleNumber || b.moduleId));

  container.innerHTML = `
    <section class="page-header">
      <button class="btn btn-secondary" onclick="renderCourses()">← Tillbaka</button>
      <h1>${escapeHtml(course?.title || "Kurs")}</h1>
      <p class="page-subtitle">${escapeHtml(course?.purpose || "")}</p>
    </section>
    <section id="modules" class="card-grid"></section>
  `;

  const modulesDiv = document.getElementById("modules");

  modules.forEach(module => {
    const card = document.createElement("article");
    card.className = "card module-card";
    card.innerHTML = `
      <div class="card-body">
        <div class="eyebrow">Modul ${escapeHtml(String(module.moduleNumber || ""))}</div>
        <h2>${escapeHtml(module.title)}</h2>
        <p>${escapeHtml(module.purpose || "")}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="openModule(${courseId}, ${module.moduleId})">Starta modul</button>
      </div>
    `;
    modulesDiv.appendChild(card);
  });
}

function openModule(courseId, moduleId) {
  const course = (DATA.courses || []).find(c => Number(c.courseId) === Number(courseId));
  const module = (DATA.modules || []).find(m => Number(m.moduleId) === Number(moduleId));
  const questions = (DATA.questions || [])
    .filter(q => Number(q.moduleId) === Number(moduleId))
    .sort((a, b) => Number(a.questionNumber || a.questionId) - Number(b.questionNumber || b.questionId));

  const contentItems = [module?.content1, module?.content2, module?.content3].filter(Boolean)
    .map(text => `<li>${escapeHtml(text)}</li>`)
    .join("");

  container.innerHTML = `
    <section class="page-header">
      <button class="btn btn-secondary" onclick="openCourse(${courseId})">← Tillbaka till ${escapeHtml(course?.title || "kurs")}</button>
      <h1>${escapeHtml(module?.title || "Modul")}</h1>
      <p class="page-subtitle">${escapeHtml(module?.purpose || "")}</p>
    </section>

    <section class="module-layout">
      <article class="panel">
        <h2>Innehåll</h2>
        <ul class="content-list">${contentItems || "<li>Inget modulmaterial registrerat.</li>"}</ul>
      </article>

      <article class="panel">
        <h2>Video</h2>
        ${buildVideoBlock(module?.video || "")}
      </article>
    </section>

    <section class="quiz-section">
      <div class="quiz-header">
        <h2>Frågor</h2>
        <button class="btn btn-outline" onclick="openModule(${courseId}, ${moduleId})">Blanda om svarsalternativ</button>
      </div>
      <div id="questions" class="question-list"></div>
    </section>
  `;

  renderQuestions(questions);
}

function buildVideoBlock(videoPath) {
  if (!videoPath) return '<p>Ingen videolänk registrerad.</p>';
  const isAbsolute = /^https?:\/\//i.test(videoPath);
  const videoUrl = isAbsolute ? videoPath : `./${videoPath.replace(/^\.\//, "")}`;
  const escapedUrl = escapeAttribute(videoUrl);
  return `
    <video class="module-video" controls preload="metadata">
      <source src="${escapedUrl}" type="video/mp4">
      Din webbläsare stödjer inte videouppspelning.
    </video>
    <p class="video-link-wrap"><a class="video-link" href="${escapedUrl}" target="_blank" rel="noopener noreferrer">Öppna video i ny flik</a></p>
  `;
}

function renderQuestions(questions) {
  const qDiv = document.getElementById("questions");
  qDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const options = shuffle([
      { text: q.option1, key: 1 },
      { text: q.option2, key: 2 },
      { text: q.option3, key: 3 },
      { text: q.option4, key: 4 }
    ]);

    const wrapper = document.createElement("article");
    wrapper.className = "card question-card";
    wrapper.innerHTML = `
      <div class="question-number">Fråga ${index + 1}</div>
      <h3>${escapeHtml(q.question)}</h3>
      <div class="answer-list"></div>
      <div class="answer-feedback" aria-live="polite"></div>
    `;

    const answerList = wrapper.querySelector(".answer-list");
    const feedback = wrapper.querySelector(".answer-feedback");

    options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "btn answer-btn";
      btn.type = "button";
      btn.textContent = option.text;
      btn.dataset.key = String(option.key);
      btn.addEventListener("click", () => checkAnswer(option.key, q.correct, wrapper, feedback, btn));
      answerList.appendChild(btn);
    });

    qDiv.appendChild(wrapper);
  });
}

function checkAnswer(selected, correct, card, feedback, clickedButton) {
  const buttons = card.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (Number(selected) === Number(correct)) {
    clickedButton.classList.add("is-correct");
    feedback.textContent = "Rätt svar.";
    feedback.className = "answer-feedback feedback-correct";
  } else {
    clickedButton.classList.add("is-wrong");
    const correctButton = Array.from(buttons).find(btn => Number(btn.dataset.key) === Number(correct));
    if (correctButton) correctButton.classList.add("is-correct");
    feedback.textContent = "Fel svar. Rätt alternativ är markerat.";
    feedback.className = "answer-feedback feedback-wrong";
  }
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
