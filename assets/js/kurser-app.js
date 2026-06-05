(() => {
  "use strict";

  const PASS_PERCENT = 80;

  /* =========================================================
     VIDEO-OVERRIDES
     - SharePoint-länkar öppnas i ny flik
     - Lokal mp4 används som fallback för inline-video
     ========================================================= */
  const VIDEO_OVERRIDES = {
    kurs01_modul01: "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQABWSDYJjqPQoIfGi0z0Ou9AcMxF5Oy4PrqVL_O-_kNaGM",
    kurs01_modul02: "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQD71mP6Qek0TLIsqv9_dLTZAbF0Ejm0iqytgK-HSoVan30",
    kurs01_modul03: "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQCRb0ptY9iCQJThz0KP2dPMAfjC3fxkyC1F9g3bhnclEwM",
    kurs01_modul04: "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQAQSNKAUbYpQLkt7bg4jpcrAWi_WYKLOb9TLMNIG6zl5BI"
  };

  /* =========================================================
     ALLA 15 KURSER
     ========================================================= */
  const COURSE_DEFS = [
    {
      id: "kurs01",
      code: "K1",
      title: "Kurs 1 – MICROSOFT TEAMS: GRUND & ARBETSSÄTT",
      purpose: "Rätt användning av Teams i vardagsarbetet.",
      color: "#9fdcd0",
      tag1: "Grundutbildning",
      tag2: "System",
      modules: [
        "Modul 1 – Vad är Teams (och vad är det inte)",
        "Modul 2 – Chatt, kanal och möte – rätt val",
        "Modul 3 – Möten i Teams – roller & praxis",
        "Modul 4 – Filer i Teams (SharePoint i bakgrunden)",
        "Modul 5 – Vanliga misstag i kommunal Teams‑användning"
      ]
    },
    {
      id: "kurs02",
      code: "K2",
      title: "Kurs 2 – TRANSKRIBERING",
      purpose: "Effektiv och spårbar omvandling av tal till text.",
      color: "#a7d8f5",
      tag1: "Grundutbildning",
      tag2: "Arbetssätt",
      modules: [
        "Modul 1 – Grundläggande transkribering",
        "Modul 2 – Praktisk användning i möten",
        "Modul 3 – Kvalitetssäkring",
        "Modul 4 – Informationshantering & GDPR",
        "Modul 5 – Tillämpning i TFF"
      ]
    },
    {
      id: "kurs03",
      code: "K3",
      title: "Kurs 3 – Dokumentation (TFF)",
      purpose: "Strukturerad dokumentation enligt regelverk.",
      color: "#f0c8a8",
      tag1: "Grundutbildning",
      tag2: "Dokument",
      modules: [
        "Modul 1 – Grundläggande dokumentation",
        "Modul 2 – Struktur och standard",
        "Modul 3 – Dokument i M365",
        "Modul 4 – Efterlevnad (lagar och regler)",
        "Modul 5 – Praktisk tillämpning i TFF"
      ]
    },
    {
      id: "kurs04",
      code: "K4",
      title: "Kurs 4 – AI & COPILOT: GRUNDERNA",
      purpose: "Grunderna i AI och Copilot i arbetet.",
      color: "#9fdcd0",
      tag1: "AI",
      tag2: "M365",
      modules: [
        "Modul 1 – Vad Copilot är (och inte är)",
        "Modul 2 – Data, behörighet och ansvar",
        "Modul 3 – När Copilot hjälper – och när den inte gör det",
        "Modul 4 – Kvalitetskontroll av AI‑svar",
        "Modul 5 – Kommunala exempel & fallgropar"
      ]
    },
    {
      id: "kurs05",
      code: "K5",
      title: "Kurs 5 – PROMPTNING I COPILOT (M365)",
      purpose: "Skriva effektiva prompts i Microsoft 365.",
      color: "#eab3b3",
      tag1: "AI",
      tag2: "Prompt",
      modules: [
        "Modul 1 – Promptens byggstenar",
        "Modul 2 – Roller, kontext och mål",
        "Modul 3 – Vanliga jobbcase (möten, text, analys)",
        "Modul 4 – Förbättra prompt steg‑för‑steg",
        "Modul 5 – Promptbibliotek & återanvändning"
      ]
    },
    {
      id: "kurs06",
      code: "K6",
      title: "Kurs 6 – SKAPA & SPARA DOKUMENT KORREKT",
      purpose: "Korrekt dokumenthantering i vardagen.",
      color: "#d5c4ef",
      tag1: "Dokument",
      tag2: "M365",
      modules: [
        "Modul 1 – Utkast vs styrdokument",
        "Modul 2 – Var dokument ska skapas",
        "Modul 3 – Namngivning & struktur",
        "Modul 4 – Versionering och livscykel",
        "Modul 5 – Återanvändning och spårbarhet"
      ]
    },
    {
      id: "kurs07",
      code: "K7",
      title: "Kurs 7 – TEAMS, SHAREPOINT & BEHÖRIGHETER",
      purpose: "Rätt struktur, lagring och behörigheter.",
      color: "#f3b6c6",
      tag1: "System",
      tag2: "Behörighet",
      modules: [
        "Modul 1 – Ägare, medlemmar, gäster",
        "Modul 2 – Team‑, kanal‑ och filbehörighet",
        "Modul 3 – Flytta innehåll rätt",
        "Modul 4 – Dela länkar säkert",
        "Modul 5 – Vanliga behörighetsfel"
      ]
    },
    {
      id: "kurs08",
      code: "K8",
      title: "Kurs 8 – INFORMATIONSKLASSNING & GDPR I M365",
      purpose: "Rätt hantering av information och personuppgifter.",
      color: "#f4c2c2",
      tag1: "GDPR",
      tag2: "Säkerhet",
      modules: [
        "Modul 1 – Vad är informationsklassning?",
        "Modul 2 – Känslig data i Teams & SharePoint",
        "Modul 3 – Copilot och personuppgifter",
        "Modul 4 – Delning och lagring – juridiskt ansvar",
        "Modul 5 – Praktiska kommunala exempel"
      ]
    },
    {
      id: "kurs09",
      code: "K9",
      title: "Kurs 9 – RÄTT VERKTYG FÖR RÄTT ÄRENDE",
      purpose: "Välja rätt verktyg för rätt arbete.",
      color: "#d9c1e8",
      tag1: "Arbetssätt",
      tag2: "M365",
      modules: [
        "Modul 1 – När ska du använda e‑post?",
        "Modul 2 – När är Teams rätt?",
        "Modul 3 – När ska något vara ett dokument?",
        "Modul 4 – Beslutsmatris för vardagen",
        "Modul 5 – Exempel från kommunal verklighet"
      ]
    },
    {
      id: "kurs10",
      code: "K10",
      title: "Kurs 10 – DIGITAL MÖTESKULTUR",
      purpose: "Effektiva digitala möten med tydliga resultat.",
      color: "#f6c09a",
      tag1: "Möten",
      tag2: "Arbetssätt",
      modules: [
        "Modul 1 – När behövs möte?",
        "Modul 2 – Agenda & förväntningar",
        "Modul 3 – Beslut, åtgärder och uppföljning",
        "Modul 4 – Asynkront arbete i Teams",
        "Modul 5 – Mötesetikett i digital miljö"
      ]
    },
    {
      id: "kurs11",
      code: "K11",
      title: "Kurs 11 – FRÅN CHATT TILL STRUKTUR",
      purpose: "Göra kunskap beständig och återanvändbar.",
      color: "#a6dcd4",
      tag1: "Dokument",
      tag2: "Arbetssätt",
      modules: [
        "Modul 1 – Varför chatt inte är arkiv",
        "Modul 2 – Fånga beslut ur dialog",
        "Modul 3 – Skapa struktur av arbetsmaterial",
        "Modul 4 – Dela rätt – inte allt",
        "Modul 5 – Från brus till verksamhetsnytta"
      ]
    },
    {
      id: "kurs12",
      code: "K12",
      title: "Kurs 12 – Diarieföring och arkivering (TFF)",
      purpose: "Korrekt hantering av allmänna handlingar och dokument.",
      color: "#c9d9a6",
      tag1: "Arkiv",
      tag2: "Efterlevnad",
      modules: [
        "Modul 1 – Grundläggande begrepp och regelverk",
        "Modul 2 – Diarieföring i praktiken",
        "Modul 3 – Arkivering och bevarande",
        "Modul 4 – GDPR och informationssäkerhet",
        "Modul 5 – Praktisk tillämpning i TFF"
      ]
    },
    {
      id: "kurs13",
      code: "K13",
      title: "Kurs 13 – STYRNING & GOVERNANCE I M365 (TFF)",
      purpose: "Styrning, struktur och uppföljning i M365.",
      color: "#d4c6f4",
      tag1: "Governance",
      tag2: "M365",
      modules: [
        "Modul 1 – Vad är governance i M365",
        "Modul 2 – Roller och ansvar",
        "Modul 3 – Livscykelhantering",
        "Modul 4 – Struktur och standarder",
        "Modul 5 – Uppföljning och kontroll"
      ]
    },
    {
      id: "kurs14",
      code: "K14",
      title: "Kurs 14 – INFORMATIONENS LIVSCYKEL",
      purpose: "Informationshantering genom hela livscykeln.",
      color: "#b7e1cd",
      tag1: "Informationshantering",
      tag2: "Efterlevnad",
      modules: [
        "Modul 1 – Informationsflöde",
        "Modul 2 – Allmän handling",
        "Modul 3 – Bevarande och gallring",
        "Modul 4 – Koppling till arkiv",
        "Modul 5 – Praktisk tillämpning (TFF)"
      ]
    },
    {
      id: "kurs15",
      code: "K15",
      title: "Kurs 15 – ARBETA PROCESSBASERAT I M365",
      purpose: "Processbaserat arbetssätt i digital miljö.",
      color: "#a8ddd3",
      tag1: "Process",
      tag2: "Ledningssystem",
      modules: [
        "Modul 1 – Processer i verksamheten",
        "Modul 2 – Från process till digitalt stöd",
        "Modul 3 – Struktur per process",
        "Modul 4 – Standardisering",
        "Modul 5 – Koppling till ledningssystem"
      ]
    }
  ];

  const COURSES = COURSE_DEFS.map((course, courseIndex) => ({
    ...course,
    modules: course.modules.map((moduleTitle, moduleIndex) => ({
      id: `${course.id}_modul${String(moduleIndex + 1).padStart(2, "0")}`,
      number: moduleIndex + 1,
      title: moduleTitle,
      video: `video/kurs${String(courseIndex + 1).padStart(2, "0")}_modul${String(
        moduleIndex + 1
      ).padStart(2, "0")}.mp4`,
      audio: `assets/audio/kurs${String(courseIndex + 1).padStart(2, "0")}_modul${String(
        moduleIndex + 1
      ).padStart(2, "0")}.mp3`
    }))
  }));

  /* =========================================================
     STORAGE
     ========================================================= */
  function moduleStateKey(courseId, moduleId) {
    return `tff_module_state_${courseId}_${moduleId}`;
  }

  function courseLastKey(courseId) {
    return `tff_course_last_${courseId}`;
  }

  function getModuleState(courseId, moduleId) {
    const raw = localStorage.getItem(moduleStateKey(courseId, moduleId));
    if (!raw) {
      return {
        moduleDone: false,
        quizPassed: false,
        quizScore: 0,
        quizPercent: 0
      };
    }

    try {
      return JSON.parse(raw);
    } catch {
      return {
        moduleDone: false,
        quizPassed: false,
        quizScore: 0,
        quizPercent: 0
      };
    }
  }

  function setModuleState(courseId, moduleId, patch) {
    const current = getModuleState(courseId, moduleId);
    const updated = { ...current, ...patch };
    localStorage.setItem(moduleStateKey(courseId, moduleId), JSON.stringify(updated));
    localStorage.setItem(courseLastKey(courseId), moduleId);
    return updated;
  }

  function clearAllProgress() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tff_module_state_") || key.startsWith("tff_course_last_")) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  }

  /* =========================================================
     HELPERS
     ========================================================= */
  function byId(id) {
    return document.getElementById(id);
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function pageName() {
    const path = window.location.pathname || "";
    return path.split("/").pop().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getCourse(courseId) {
    return COURSES.find((c) => c.id === courseId) || null;
  }

  function getModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    return course.modules.find((m) => m.id === moduleId) || null;
  }

  function getPrevModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    const index = course.modules.findIndex((m) => m.id === moduleId);
    return index > 0 ? course.modules[index - 1] : null;
  }

  function getNextModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    const index = course.modules.findIndex((m) => m.id === moduleId);
    return index >= 0 && index < course.modules.length - 1 ? course.modules[index + 1] : null;
  }

  function getVideoUrl(module) {
    return VIDEO_OVERRIDES[module.id] || module.video || "";
  }

  function getAudioUrl(module) {
    return module.audio || "";
  }

  function isSharePointUrl(url) {
    return typeof url === "string" && url.includes("sharepoint.com");
  }

  function getCourseProgress(courseId) {
    const course = getCourse(courseId);
    if (!course) {
      return { done: 0, total: 0, percent: 0, allApproved: false };
    }

    const total = course.modules.length;
    let done = 0;
    let approved = true;

    course.modules.forEach((module) => {
      const state = getModuleState(course.id, module.id);
      if (state.moduleDone) done += 1;
      if (!state.quizPassed) approved = false;
    });

    return {
      done,
      total,
      percent: total ? Math.round((done / total) * 100) : 0,
      allApproved: approved && total > 0
    };
  }

  function getLastVisitedModule(courseId) {
    const stored = localStorage.getItem(courseLastKey(courseId));
    if (!stored) return null;
    return getModule(courseId, stored);
  }

  /* =========================================================
     STYLING
     ========================================================= */
  function injectStyles() {
    if (document.getElementById("tff-ui-styles")) return;

    const style = document.createElement("style");
    style.id = "tff-ui-styles";
    style.textContent = `
      :root {
        --bg: #f3f4f6;
        --card: #ffffff;
        --line: #d9dfe5;
        --text: #1f2937;
        --muted: #6b7280;
        --blue: #1f65b8;
        --blue-dark: #0f4f96;
        --green-soft: #eef7f4;
        --btn-ghost: #f7fafb;
        --shadow: 0 6px 18px rgba(0,0,0,.07);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: Segoe UI, Arial, sans-serif;
      }

      .wrap {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 16px 20px;
      }

      .topbar {
        background: #fff;
        border-bottom: 1px solid var(--line);
        padding: 14px 0;
        margin-bottom: 18px;
      }

      .topbar-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        flex-wrap: wrap;
      }

      .title-block h1 {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
      }

      .title-block p {
        margin: 2px 0 0;
        color: var(--muted);
        font-size: 14px;
        font-weight: 600;
      }

      .top-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }

      .pill {
        background: var(--green-soft);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 10px 14px;
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        padding: 12px 16px;
        font-weight: 800;
        font-size: 14px;
        text-decoration: none;
        border: 1px solid var(--line);
        background: #fff;
        color: var(--text);
        cursor: pointer;
      }

      .btn-primary {
        background: var(--blue);
        color: #fff;
        border-color: var(--blue);
      }

      .btn-primary:hover {
        background: var(--blue-dark);
      }

      .btn-ghost {
        background: var(--btn-ghost);
      }

      .catalog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        gap: 18px;
      }

      .catalog-card {
        background: #fff;
        border-radius: 18px;
        box-shadow: var(--shadow);
        padding: 18px;
        border-top: 6px solid #cfd8dc;
      }

      .catalog-card h3 {
        margin: 6px 0 8px;
        font-size: 18px;
        line-height: 1.35;
      }

      .catalog-card p {
        margin: 0 0 12px;
        color: var(--muted);
        line-height: 1.55;
      }

      .chip {
        display: inline-block;
        padding: 6px 10px;
        border-radius: 999px;
        background: #eef2ff;
        color: #4338ca;
        font-weight: 800;
        font-size: 12px;
      }

      .progress-bar {
        width: 100%;
        height: 10px;
        border-radius: 999px;
        background: #e7edf2;
        overflow: hidden;
        margin: 12px 0 8px;
      }

      .progress-bar span {
        display: block;
        height: 100%;
        background: #6bc4b2;
      }

      .page-grid {
        display: grid;
        grid-template-columns: 340px 1fr;
        gap: 18px;
      }

      .panel {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 18px;
        box-shadow: var(--shadow);
        padding: 18px;
      }

      .panel h2,
      .panel h3 {
        margin: 0 0 12px;
      }

      .panel p {
        margin: 0 0 12px;
        color: var(--muted);
        line-height: 1.55;
      }

      .course-select {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid var(--line);
        border-radius: 14px;
        font-weight: 700;
        font-size: 14px;
        background: #fff;
      }

      .module-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 14px;
      }

      .module-card {
        display: block;
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 12px;
        background: #fff;
      }

      .module-card.active {
        border-color: #b8d8d2;
        background: #f2faf7;
      }

      .module-card strong {
        display: block;
        font-size: 16px;
        line-height: 1.35;
        margin-bottom: 6px;
      }

      .module-card small {
        display: block;
        color: var(--muted);
        font-weight: 700;
        line-height: 1.4;
      }

      .right-main {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }

      .title-row h2 {
        margin: 0 0 6px;
        font-size: 18px;
      }

      .title-row p {
        margin: 0;
        color: var(--muted);
      }

      .tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .tag {
        background: var(--green-soft);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }

      .audio-row {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        padding-top: 6px;
        border-top: 1px solid var(--line);
      }

      .audio-status {
        color: var(--muted);
        font-weight: 700;
        font-size: 14px;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: 16px;
      }

      .info-card,
      .status-card {
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 16px;
        background: #fff;
      }

      .info-card h3,
      .status-card h3 {
        margin: 0 0 10px;
        font-size: 16px;
      }

      .label {
        font-weight: 800;
        margin-bottom: 6px;
      }

      .bullet-list {
        padding-left: 18px;
        margin: 0;
      }

      .bullet-list li {
        margin-bottom: 8px;
        line-height: 1.55;
      }

      .button-row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 12px;
      }

      .note-box {
        margin-top: 14px;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 12px;
        background: #fafafa;
        color: var(--muted);
        line-height: 1.55;
        font-size: 14px;
      }

      .video-card video {
        width: 100%;
        border-radius: 14px;
        background: #000;
        min-height: 320px;
      }

      .quiz-card {
        border-top: 1px solid var(--line);
        padding-top: 14px;
      }

      .quiz-form {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .quiz-question {
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 14px;
        background: #fff;
      }

      .quiz-question legend {
        font-weight: 800;
        padding: 0 4px;
      }

      .quiz-option {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        padding: 6px 0;
        line-height: 1.45;
      }

      .quiz-result {
        border-radius: 14px;
        padding: 14px;
        margin-top: 10px;
      }

      .quiz-success {
        background: #edf9f1;
        color: #166534;
      }

      .quiz-fail {
        background: #fef2f2;
        color: #991b1b;
      }

      .nav-row {
        display: flex;
        gap: 10px;
        margin-top: 14px;
      }

      @media (max-width: 980px) {
        .page-grid {
          grid-template-columns: 1fr;
        }

        .content-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* =========================================================
     QUIZFRÅGOR
     ========================================================= */
  function seededShuffle(options, seed) {
    const arr = options.map((text) => ({ text }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed + i * 13) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildQuestions(course, module) {
    const templates = [
      {
        question: `Vad är huvudsyftet med "${module.title}"?`,
        options: [
          course.purpose,
          "Att lagra allt lokalt",
          "Att ersätta all dokumentation med chatt",
          "Att undvika gemensamma arbetssätt"
        ],
        correct: 0
      },
      {
        question: `Vilket arbetssätt stödjer bäst "${course.title}"?`,
        options: [
          "Gemensam struktur och tydliga ansvar",
          "Att varje person gör helt olika",
          "Spridd information på flera privata platser",
          "Att inget dokumenteras"
        ],
        correct: 0
      },
      {
        question: `Vad är viktigt i modulen "${module.title}"?`,
        options: [
          "Tydlighet och spårbarhet",
          "Otydlighet",
          "Slumpmässig lagring",
          "Att ansvar saknas"
        ],
        correct: 0
      },
      {
        question: `Vad ska normalt undvikas i "${module.title}"?`,
        options: [
          "Otydlig eller spridd information",
          "Tydlig ansvarsfördelning",
          "Konsekvent struktur",
          "Gemensamma arbetssätt"
        ],
        correct: 0
      },
      {
        question: `Vilken effekt ger ett bra arbetssätt i "${module.title}"?`,
        options: [
          "Mer ordning och bättre kvalitet",
          "Mindre sökbarhet",
          "Fler dubbletter",
          "Sämre uppföljning"
        ],
        correct: 0
      },
      {
        question: `Vad är en vanlig risk utan struktur i "${module.title}"?`,
        options: [
          "Tappad information",
          "Enklare uppföljning",
          "Bättre spårbarhet",
          "Ökad kvalitet"
        ],
        correct: 0
      },
      {
        question: `Vad bör prioriteras i "${course.title}"?`,
        options: [
          "Rätt information på rätt plats",
          "Privat lagring som förstahandsval",
          "Ad hoc-arbete",
          "Brist på rutiner"
        ],
        correct: 0
      },
      {
        question: `Vad kännetecknar best practice i "${module.title}"?`,
        options: [
          "Standardiserat arbetssätt",
          "Dolda beslut",
          "Slumpmässig hantering",
          "Ingen uppföljning"
        ],
        correct: 0
      },
      {
        question: `Vad stödjer bäst verksamhetsnytta i "${module.title}"?`,
        options: [
          "Struktur, uppföljning och tydliga ansvar",
          "Spridda chattar",
          "Otydliga versioner",
          "Endast muntlig information"
        ],
        correct: 0
      },
      {
        question: `Vad är det övergripande målet i "${course.title}"?`,
        options: [
          "Att skapa ordning, kvalitet och hållbara arbetssätt",
          "Att undvika struktur",
          "Att minska spårbarhet",
          "Att ersätta alla andra system"
        ],
        correct: 0
      }
    ];

    return templates.map((item, index) => {
      const shuffled = seededShuffle(item.options, course.code.length + module.number + index);
      const correctText = item.options[item.correct];

      return {
        id: `${module.id}_q${String(index + 1).padStart(2, "0")}`,
        number: index + 1,
        question: item.question,
        options: shuffled.map((x) => x.text),
        correct: shuffled.findIndex((x) => x.text === correctText)
      };
    });
  }

  /* =========================================================
     KATALOGSIDA
     ========================================================= */
  function renderCatalogPage() {
    const root = byId("app");
    if (!root) return;

    root.innerHTML = `
      <div class="topbar">
        <div class="topbar-inner">
          <div class="title-block">
            <h1>TFF – Kurskatalog</h1>
            <p>Kurser • Moduler • Video • Quiz • Progress</p>
          </div>
          <div class="top-actions">
            <button id="resetProgressBtn" class="btn btn-ghost">Återställ progress</button>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="catalog-grid" id="catalogGrid"></div>
      </div>
    `;

    const grid = byId("catalogGrid");

    grid.innerHTML = COURSES.map((course) => {
      const progress = getCourseProgress(course.id);
      const approved = progress.allApproved ? "Godkänd" : "Ej godkänd";
      const firstModule = course.modules[0];

      return `
        <article class="catalog-card" style="border-top-color:${escapeHtml(course.color)}">
          <span class="chip">${escapeHtml(course.code)}</span>
          <h3>${escapeHtml(course.title)}</h3>
          <p>${escapeHtml(course.purpose)}</p>

          <div class="progress-bar">
            <span style="width:${progress.percent}%"></span>
          </div>

          <p><strong>Genomfört:</strong> ${progress.done}/${progress.total} moduler (${progress.percent}%)</p>
          <p><strong>Status:</strong> ${approved}</p>

          <a href="kurser.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(firstModule.id)}" class="btn btn-primary">
            Öppna kurs
          </a>
        </article>
      `;
    }).join("");

    const resetBtn = byId("resetProgressBtn");
    if (resetBtn) resetBtn.onclick = clearAllProgress;
  }

  /* =========================================================
     VIDEO-RENDERING
     - SharePoint: knapp till ny flik
     - Lokal video: inline i <video>
     ========================================================= */
  function renderVideo(videoBox, module) {
    const videoUrl = getVideoUrl(module);

    if (!videoUrl) {
      videoBox.innerHTML = `
        <div class="note-box">
          Ingen video är kopplad till denna modul ännu.
        </div>
      `;
      return;
    }

    if (isSharePointUrl(videoUrl)) {
      videoBox.innerHTML = `
        <div class="note-box">
          Den här videon öppnas i SharePoint i ny flik.
          <div class="button-row" style="margin-top:12px;">
            <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              Öppna video i SharePoint
            </a>
          </div>
        </div>
      `;
      return;
    }

    videoBox.innerHTML = `
      <video controls preload="metadata" style="width:100%; border-radius:14px; background:#000;">
        <source src="${videoUrl}" type="video/mp4">
        Din webbläsare stödjer inte video.
      </video>
    `;
  }

  /* =========================================================
     UTBILDNINGSSIDA
     ========================================================= */
  function renderTrainingPage() {
    const root = byId("app");
    if (!root) return;

    const courseId = getParam("course") || COURSES[0].id;
    const course = getCourse(courseId) || COURSES[0];

    const moduleId = getParam("module");
    const module =
      getModule(course.id, moduleId) ||
      getLastVisitedModule(course.id) ||
      course.modules[0];

    const courseProgress = getCourseProgress(course.id);
    const moduleState = getModuleState(course.id, module.id);

    root.innerHTML = `
      <div class="topbar">
        <div class="topbar-inner">
          <div class="title-block">
            <h1>TFF – Utbildning</h1>
            <p>Moduler • Podd • Progress • Godkänd</p>
          </div>

          <div class="top-actions">
            <div class="pill">Progress: ${courseProgress.percent}%</div>
            <div class="pill">Kurs: ${courseProgress.allApproved ? "Godkänd" : "Ej godkänd"}</div>
            <button id="resetProgressBtn" class="btn btn-ghost">Återställ progress</button>
            <a href="utbildningar.html" class="btn btn-primary">Till kurskatalog</a>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="page-grid">
          <aside class="panel">
            <h2>Kurs</h2>
            <p>Välj kurs och navigera via modulerna.</p>

            <select id="courseSelect" class="course-select"></select>

            <h3 style="margin-top:18px;">Moduler</h3>
            <div id="moduleSidebar" class="module-list"></div>

            <div class="note-box">
              Modulerna använder samma kursfärg. Ljud kan kräva klick p.g.a. webbläsarpolicy.
            </div>
          </aside>

          <main class="panel right-main">
            <div class="title-row">
              <div>
                <h2 id="courseTitle"></h2>
                <p id="coursePurpose"></p>
              </div>
              <div class="tags">
                <span class="tag" id="tag1"></span>
                <span class="tag" id="tag2"></span>
              </div>
            </div>

            <div class="audio-row">
              <button id="playAudioBtn" class="btn btn-ghost">Spela ljud</button>
              <label style="display:flex;gap:8px;align-items:center;font-weight:700;">
                <input type="checkbox" id="resumeToggle">
                Fortsätt där jag slutade
              </label>
              <span class="audio-status" id="audioStatus"></span>
            </div>

            <div class="content-grid">
              <section class="info-card">
                <h3>Modul</h3>
                <p id="moduleTitleLine"></p>

                <div class="label">Syfte</div>
                <p id="modulePurposeLine"></p>

                <div class="label">Innehåll</div>
                <ul class="bullet-list" id="moduleBullets"></ul>
              </section>

              <section class="status-card">
                <h3>Progress i modul</h3>
                <p id="moduleProgressLine"></p>

                <div class="button-row">
                  <button id="markDoneBtn" class="btn btn-ghost">Markera modul som klar</button>
                  <button id="showQuizBtn" class="btn btn-primary">Godkänn quiz</button>
                </div>

                <div class="note-box">
                  Quiz visas längre ned på sidan. Om MP3 saknas visas bara informationsrad.
                </div>
              </section>
            </div>

            <section class="panel video-card">
              <h3>Video</h3>
              <div id="videoBox"></div>
            </section>

            <section class="quiz-card">
              <h3>Quiz</h3>
              <div id="quizBox"></div>
            </section>

            <div class="nav-row">
              <button id="prevBtn" class="btn btn-ghost">Föregående modul</button>
              <button id="nextBtn" class="btn btn-primary">Nästa modul</button>
            </div>
          </main>
        </div>
      </div>
    `;

    const courseSelect = byId("courseSelect");
    courseSelect.innerHTML = COURSES.map((c) => `
      <option value="${c.id}" ${c.id === course.id ? "selected" : ""}>
        ${escapeHtml(c.title)}
      </option>
    `).join("");

    courseSelect.onchange = (e) => {
      const selectedCourse = getCourse(e.target.value);
      if (!selectedCourse) return;
      const firstModule = selectedCourse.modules[0];
      window.location.href = `kurser.html?course=${encodeURIComponent(selectedCourse.id)}&module=${encodeURIComponent(firstModule.id)}`;
    };

    byId("courseTitle").textContent = course.title;
    byId("coursePurpose").textContent = `Syfte: ${course.purpose}`;
    byId("tag1").textContent = course.tag1 || "Kurs";
    byId("tag2").textContent = course.tag2 || "System";

    const sidebar = byId("moduleSidebar");
    sidebar.innerHTML = course.modules.map((m, index) => {
      const state = getModuleState(course.id, m.id);
      const active = m.id === module.id ? "active" : "";

      return `
        <a href="kurser.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(m.id)}" class="module-card ${active}">
          <strong>${index + 1}. ${escapeHtml(m.title)}</strong>
          <small>Modul ${state.moduleDone ? "klar" : "ej klar"} • Quiz: ${state.quizPassed ? "Godkänd" : "Ej godkänd"}</small>
        </a>
      `;
    }).join("");

    byId("moduleTitleLine").textContent = module.title;
    byId("modulePurposeLine").textContent = course.purpose;

    const bulletList = byId("moduleBullets");
    bulletList.innerHTML = `
      <li>${escapeHtml(module.title.replace(/^Modul \\d+ – /, ""))}</li>
      <li>Arbetssätt och struktur i praktiken</li>
      <li>Vanliga fel, risker och rekommenderade arbetssätt</li>
      <li>Koppling till kommunal verksamhet och Microsoft 365</li>
    `;

    byId("moduleProgressLine").textContent =
      `Modul: ${moduleState.moduleDone ? "klar" : "ej klar"} • Quiz: ${moduleState.quizPassed ? "Godkänd" : "Ej godkänd"}`;

    const videoBox = byId("videoBox");
    renderVideo(videoBox, module);

    const audioStatus = byId("audioStatus");
    const playAudioBtn = byId("playAudioBtn");
    const audioUrl = getAudioUrl(module);
    const audio = audioUrl ? new Audio(audioUrl) : null;

    if (audio) {
      audio.addEventListener("error", () => {
        audioStatus.textContent = "Ingen ljudfil hittades för modulen.";
      });

      audio.addEventListener("canplaythrough", () => {
        audioStatus.textContent = "Ljudfil hittad för modulen.";
      });
    } else {
      audioStatus.textContent = "Ingen ljudfil är kopplad till modulen.";
    }

    playAudioBtn.onclick = async () => {
      if (!audio) {
        audioStatus.textContent = "Ingen ljudfil är kopplad till modulen.";
        return;
      }

      try {
        await audio.play();
        audioStatus.textContent = "Ljud spelas upp.";
      } catch {
        audioStatus.textContent = "Ljud kunde inte starta. Kontrollera att MP3-filen finns.";
      }
    };

    byId("resumeToggle").checked = true;

    byId("markDoneBtn").onclick = () => {
      const current = getModuleState(course.id, module.id);
      setModuleState(course.id, module.id, {
        moduleDone: !current.moduleDone
      });
      window.location.reload();
    };

    byId("showQuizBtn").onclick = () => {
      byId("quizBox").scrollIntoView({ behavior: "smooth", block: "start" });
    };

    renderQuiz(course, module);

    const prev = getPrevModule(course.id, module.id);
    const next = getNextModule(course.id, module.id);

    const prevBtn = byId("prevBtn");
    const nextBtn = byId("nextBtn");

    prevBtn.disabled = !prev;
    nextBtn.disabled = !next;

    prevBtn.onclick = () => {
      if (!prev) return;
      window.location.href = `kurser.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(prev.id)}`;
    };

    nextBtn.onclick = () => {
      if (!next) return;
      window.location.href = `kurser.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(next.id)}`;
    };

    const resetBtn = byId("resetProgressBtn");
    if (resetBtn) resetBtn.onclick = clearAllProgress;
  }

  /* =========================================================
     QUIZ
     ========================================================= */
  function renderQuiz(course, module) {
    const quizBox = byId("quizBox");
    if (!quizBox) return;

    const questions = buildQuestions(course, module);

    quizBox.innerHTML = `
      <form id="quizForm" class="quiz-form">
        ${questions.map((q) => `
          <fieldset class="quiz-question">
            <legend>Fråga ${q.number}: ${escapeHtml(q.question)}</legend>
            ${q.options.map((option, index) => `
              <label class="quiz-option">
                <input type="radio" name="${q.id}" value="${index}">
                <span>${escapeHtml(option)}</span>
              </label>
            `).join("")}
          </fieldset>
        `).join("")}

        <div class="button-row">
          <button type="button" class="btn btn-primary" id="checkQuizBtn">Rätta quiz</button>
        </div>

        <div id="quizResult"></div>
      </form>
    `;

    const checkBtn = byId("checkQuizBtn");
    if (!checkBtn) return;

    checkBtn.onclick = () => {
      let score = 0;
      let answered = 0;

      questions.forEach((q) => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (selected) {
          answered += 1;
          if (Number(selected.value) === q.correct) {
            score += 1;
          }
        }
      });

      const percent = Math.round((score / questions.length) * 100);
      const passed = percent >= PASS_PERCENT;

      setModuleState(course.id, module.id, {
        quizPassed: passed,
        quizScore: score,
        quizPercent: percent
      });

      const result = byId("quizResult");
      result.innerHTML = `
        <div class="quiz-result ${passed ? "quiz-success" : "quiz-fail"}">
          <p><strong>Resultat:</strong> ${score} av ${questions.length} rätt (${percent}%)</p>
          <p><strong>Status:</strong> ${passed ? "Godkänd" : "Inte godkänd"}</p>
          <p><strong>Besvarade frågor:</strong> ${answered} av ${questions.length}</p>
          <p>${passed ? "Quizet är godkänt." : "Du behöver minst 80% rätt för godkänt."}</p>
        </div>
      `;

      const line = byId("moduleProgressLine");
      if (line) {
        const state = getModuleState(course.id, module.id);
        line.textContent =
          `Modul: ${state.moduleDone ? "klar" : "ej klar"} • Quiz: ${state.quizPassed ? "Godkänd" : "Ej godkänd"}`;
      }

      const sidebarCard = document.querySelector("a.module-card.active small");
      if (sidebarCard) {
        const state = getModuleState(course.id, module.id);
        sidebarCard.textContent =
          `Modul ${state.moduleDone ? "klar" : "ej klar"} • Quiz: ${state.quizPassed ? "Godkänd" : "Ej godkänd"}`;
      }
    };
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    injectStyles();
    const page = pageName();

    if (page === "utbildningar.html" || page === "" || page === "index.html") {
      renderCatalogPage();
      return;
    }

    if (page === "kurser.html" || page === "kurs_dokumentation.html") {
      renderTrainingPage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
