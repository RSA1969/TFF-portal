/* =========================================================
   TFF Digitala Kurser – komplett kurser-app.js
   Anpassad till repo:
   - utbildningar.html = kurskatalog
   - kurser.html = kurssida med moduler
   - kurs_dokumentation.html = modul + video + quiz
   ========================================================= */

(() => {
  "use strict";

  const PASS_PERCENT = 80;

  /* -------------------------------------------------------
     VIDEO-OVERRIDES
     ------------------------------------------------------- */
  const VIDEO_OVERRIDES = {
    "kurs01_modul01":
      "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQABWSDYJjqPQoIfGi0z0Ou9AcMxF5Oy4PrqVL_O-_kNaGM?download=1",
    "kurs01_modul02":
      "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQD71mP6Qek0TLIsqv9_dLTZAbF0Ejm0iqytgK-HSoVan30?download=1",
    "kurs01_modul03":
      "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQCRb0ptY9iCQJThz0KP2dPMAfjC3fxkyC1F9g3bhnclEwM?download=1",
    "kurs01_modul04":
      "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQAQSNKAUbYpQLkt7bg4jpcrAWi_WYKLOb9TLMNIG6zl5BI?download=1"
  };

  /* -------------------------------------------------------
     DATA – 15 KURSER × 5 MODULER
     ------------------------------------------------------- */
  const COURSES = [
    {
      id: "kurs01",
      code: "K1",
      title: "MICROSOFT TEAMS: GRUND & ARBETSSÄTT",
      displayTitle: "Kurs 1 – MICROSOFT TEAMS: GRUND & ARBETSSÄTT",
      purpose: "Rätt användning av Teams i vardagsarbetet.",
      color: "#82c7b8",
      image: "assets/img/tile-mandatory.jpg",
      modules: [
        { id: "kurs01_modul01", number: 1, title: "Vad är Teams (och vad är det inte)", video: "video/kurs1_modul1.mp4" },
        { id: "kurs01_modul02", number: 2, title: "Chat, kanal och möte – rätt val", video: "video/kurs1_modul2.mp4" },
        { id: "kurs01_modul03", number: 3, title: "Möten i Teams – roller & praxis", video: "video/kurs1_modul3.mp4" },
        { id: "kurs01_modul04", number: 4, title: "Filer i Teams (SharePoint i bakgrunden)", video: "video/kurs1_modul4.mp4" },
        { id: "kurs01_modul05", number: 5, title: "Vanliga misstag i kommunal Teams‑användning", video: "video/kurs1_modul5.mp4" }
      ]
    },
    {
      id: "kurs02",
      code: "K2",
      title: "TRANSKRIBERING",
      displayTitle: "Kurs 2 – TRANSKRIBERING",
      purpose: "Effektiv och spårbar omvandling av tal till text.",
      color: "#a7d8f5",
      image: "assets/img/tile-status.jpg",
      modules: [
        { id: "kurs02_modul01", number: 1, title: "Grundläggande transkribering", video: "video/kurs2_modul1.mp4" },
        { id: "kurs02_modul02", number: 2, title: "Praktisk användning i möten", video: "video/kurs2_modul2.mp4" },
        { id: "kurs02_modul03", number: 3, title: "Kvalitetssäkring", video: "video/kurs2_modul3.mp4" },
        { id: "kurs02_modul04", number: 4, title: "Informationshantering & GDPR", video: "video/kurs2_modul4.mp4" },
        { id: "kurs02_modul05", number: 5, title: "Tillämpning i TFF", video: "video/kurs2_modul5.mp4" }
      ]
    },
    {
      id: "kurs03",
      code: "K3",
      title: "Dokumentation (TFF)",
      displayTitle: "Kurs 3 – Dokumentation (TFF)",
      purpose: "Strukturerad dokumentation enligt regelverk.",
      color: "#f3c9a9",
      image: "assets/img/tile-guides.jpg",
      modules: [
        { id: "kurs03_modul01", number: 1, title: "Grundläggande dokumentation", video: "video/kurs3_modul1.mp4" },
        { id: "kurs03_modul02", number: 2, title: "Struktur och standard", video: "video/kurs3_modul2.mp4" },
        { id: "kurs03_modul03", number: 3, title: "Dokument i M365", video: "video/kurs3_modul3.mp4" },
        { id: "kurs03_modul04", number: 4, title: "Efterlevnad (lagar och regler)", video: "video/kurs3_modul4.mp4" },
        { id: "kurs03_modul05", number: 5, title: "Praktisk tillämpning i TFF", video: "video/kurs3_modul5.mp4" }
      ]
    },
    {
      id: "kurs04",
      code: "K4",
      title: "AI & COPILOT: GRUNDERNA",
      displayTitle: "Kurs 4 – AI & COPILOT: GRUNDERNA",
      purpose: "Grunderna i AI och Copilot i arbetet.",
      color: "#9fd8cf",
      image: "assets/img/tile-chief.jpg",
      modules: [
        { id: "kurs04_modul01", number: 1, title: "Vad Copilot är (och inte är)", video: "video/kurs4_modul1.mp4" },
        { id: "kurs04_modul02", number: 2, title: "Data, behörighet och ansvar", video: "video/kurs4_modul2.mp4" },
        { id: "kurs04_modul03", number: 3, title: "När Copilot hjälper – och när den inte gör det", video: "video/kurs4_modul3.mp4" },
        { id: "kurs04_modul04", number: 4, title: "Kvalitetskontroll av AI‑svar", video: "video/kurs4_modul4.mp4" },
        { id: "kurs04_modul05", number: 5, title: "Kommunala exempel & fallgropar", video: "video/kurs4_modul5.mp4" }
      ]
    },
    {
      id: "kurs05",
      code: "K5",
      title: "PROMPTNING I COPILOT (M365)",
      displayTitle: "Kurs 5 – PROMPTNING I COPILOT (M365)",
      purpose: "Skriva effektiva prompts i Microsoft 365.",
      color: "#eab3b3",
      image: "assets/img/tile-edu.jpg",
      modules: [
        { id: "kurs05_modul01", number: 1, title: "Promptens byggstenar", video: "video/kurs5_modul1.mp4" },
        { id: "kurs05_modul02", number: 2, title: "Roller, kontext och mål", video: "video/kurs5_modul2.mp4" },
        { id: "kurs05_modul03", number: 3, title: "Vanliga jobbcase (möten, text, analys)", video: "video/kurs5_modul3.mp4" },
        { id: "kurs05_modul04", number: 4, title: "Förbättra prompt steg‑för‑steg", video: "video/kurs5_modul4.mp4" },
        { id: "kurs05_modul05", number: 5, title: "Promptbibliotek & återanvändning", video: "video/kurs5_modul5.mp4" }
      ]
    },
    {
      id: "kurs06",
      code: "K6",
      title: "SKAPA & SPARA DOKUMENT KORREKT",
      displayTitle: "Kurs 6 – SKAPA & SPARA DOKUMENT KORREKT",
      purpose: "Korrekt dokumenthantering i vardagen.",
      color: "#c9b8e4",
      image: "assets/img/tile-hrkollegan.jpg",
      modules: [
        { id: "kurs06_modul01", number: 1, title: "Utkast vs styrdokument", video: "video/kurs6_modul1.mp4" },
        { id: "kurs06_modul02", number: 2, title: "Var dokument ska skapas", video: "video/kurs6_modul2.mp4" },
        { id: "kurs06_modul03", number: 3, title: "Namngivning & struktur", video: "video/kurs6_modul3.mp4" },
        { id: "kurs06_modul04", number: 4, title: "Versionering och livscykel", video: "video/kurs6_modul4.mp4" },
        { id: "kurs06_modul05", number: 5, title: "Återanvändning och spårbarhet", video: "video/kurs6_modul5.mp4" }
      ]
    },
    {
      id: "kurs07",
      code: "K7",
      title: "TEAMS, SHAREPOINT & BEHÖRIGHETER",
      displayTitle: "Kurs 7 – TEAMS, SHAREPOINT & BEHÖRIGHETER",
      purpose: "Rätt struktur, lagring och behörigheter.",
      color: "#f3b6c6",
      image: "assets/img/tile-atlas.jpg",
      modules: [
        { id: "kurs07_modul01", number: 1, title: "Ägare, medlemmar, gäster", video: "video/kurs7_modul1.mp4" },
        { id: "kurs07_modul02", number: 2, title: "Team‑, kanal‑ och filbehörighet", video: "video/kurs7_modul2.mp4" },
        { id: "kurs07_modul03", number: 3, title: "Flytta innehåll rätt", video: "video/kurs7_modul3.mp4" },
        { id: "kurs07_modul04", number: 4, title: "Dela länkar säkert", video: "video/kurs7_modul4.mp4" },
        { id: "kurs07_modul05", number: 5, title: "Vanliga behörighetsfel", video: "video/kurs7_modul5.mp4" }
      ]
    },
    {
      id: "kurs08",
      code: "K8",
      title: "INFORMATIONSKLASSNING & GDPR I M365",
      displayTitle: "Kurs 8 – INFORMATIONSKLASSNING & GDPR I M365",
      purpose: "Rätt hantering av information och personuppgifter.",
      color: "#f4c2c2",
      image: "assets/img/tile-chief.jpg",
      modules: [
        { id: "kurs08_modul01", number: 1, title: "Vad är informationsklassning?", video: "video/kurs8_modul1.mp4" },
        { id: "kurs08_modul02", number: 2, title: "Känslig data i Teams & SharePoint", video: "video/kurs8_modul2.mp4" },
        { id: "kurs08_modul03", number: 3, title: "Copilot och personuppgifter", video: "video/kurs8_modul3.mp4" },
        { id: "kurs08_modul04", number: 4, title: "Delning och lagring – juridiskt ansvar", video: "video/kurs8_modul4.mp4" },
        { id: "kurs08_modul05", number: 5, title: "Praktiska kommunala exempel", video: "video/kurs8_modul5.mp4" }
      ]
    },
    {
      id: "kurs09",
      code: "K9",
      title: "RÄTT VERKTYG FÖR RÄTT Ärende (E‑post vs Teams vs Dokument)",
      displayTitle: "Kurs 9 – RÄTT VERKTYG FÖR RÄTT Ärende",
      purpose: "Välja rätt verktyg för rätt arbete.",
      color: "#d9c1e8",
      image: "assets/img/tile-guides.jpg",
      modules: [
        { id: "kurs09_modul01", number: 1, title: "När ska du använda e‑post?", video: "video/kurs9_modul1.mp4" },
        { id: "kurs09_modul02", number: 2, title: "När är Teams rätt?", video: "video/kurs9_modul2.mp4" },
        { id: "kurs09_modul03", number: 3, title: "När ska något vara ett dokument?", video: "video/kurs9_modul3.mp4" },
        { id: "kurs09_modul04", number: 4, title: "Beslutsmatris för vardagen", video: "video/kurs9_modul4.mp4" },
        { id: "kurs09_modul05", number: 5, title: "Exempel från kommunal verklighet", video: "video/kurs9_modul5.mp4" }
      ]
    },
    {
      id: "kurs10",
      code: "K10",
      title: "DIGITAL MÖTESKULTUR",
      displayTitle: "Kurs 10 – DIGITAL MÖTESKULTUR",
      purpose: "Effektiva digitala möten med tydliga resultat.",
      color: "#f6c09a",
      image: "assets/img/tile-status.jpg",
      modules: [
        { id: "kurs10_modul01", number: 1, title: "När behövs möte?", video: "video/kurs10_modul1.mp4" },
        { id: "kurs10_modul02", number: 2, title: "Agenda & förväntningar", video: "video/kurs10_modul2.mp4" },
        { id: "kurs10_modul03", number: 3, title: "Beslut, åtgärder och uppföljning", video: "video/kurs10_modul3.mp4" },
        { id: "kurs10_modul04", number: 4, title: "Asynkront arbete i Teams", video: "video/kurs10_modul4.mp4" },
        { id: "kurs10_modul05", number: 5, title: "Mötesetikett i digital miljö", video: "video/kurs10_modul5.mp4" }
      ]
    },
    {
      id: "kurs11",
      code: "K11",
      title: "FRÅN CHATT TILL STRUKTUR",
      displayTitle: "Kurs 11 – FRÅN CHATT TILL STRUKTUR",
      purpose: "Göra kunskap beständig och återanvändbar.",
      color: "#a6dcd4",
      image: "assets/img/tile-mandatory.jpg",
      modules: [
        { id: "kurs11_modul01", number: 1, title: "Varför chatt inte är arkiv", video: "video/kurs11_modul1.mp4" },
        { id: "kurs11_modul02", number: 2, title: "Fånga beslut ur dialog", video: "video/kurs11_modul2.mp4" },
        { id: "kurs11_modul03", number: 3, title: "Skapa struktur av arbetsmaterial", video: "video/kurs11_modul3.mp4" },
        { id: "kurs11_modul04", number: 4, title: "Dela rätt – inte allt", video: "video/kurs11_modul4.mp4" },
        { id: "kurs11_modul05", number: 5, title: "Från brus till verksamhetsnytta", video: "video/kurs11_modul5.mp4" }
      ]
    },
    {
      id: "kurs12",
      code: "K12",
      title: "Diarieföring och arkivering (TFF)",
      displayTitle: "Kurs 12 – Diarieföring och arkivering (TFF)",
      purpose: "Korrekt hantering av allmänna handlingar och dokument.",
      color: "#c9d9a6",
      image: "assets/img/tile-edu.jpg",
      modules: [
        { id: "kurs12_modul01", number: 1, title: "Grundläggande begrepp och regelverk", video: "video/kurs12_modul1.mp4" },
        { id: "kurs12_modul02", number: 2, title: "Diarieföring i praktiken", video: "video/kurs12_modul2.mp4" },
        { id: "kurs12_modul03", number: 3, title: "Arkivering och bevarande", video: "video/kurs12_modul3.mp4" },
        { id: "kurs12_modul04", number: 4, title: "GDPR och informationssäkerhet", video: "video/kurs12_modul4.mp4" },
        { id: "kurs12_modul05", number: 5, title: "Praktisk tillämpning i TFF", video: "video/kurs12_modul5.mp4" }
      ]
    },
    {
      id: "kurs13",
      code: "K13",
      title: "STYRNING & GOVERNANCE I M365 (TFF)",
      displayTitle: "Kurs 13 – STYRNING & GOVERNANCE I M365 (TFF)",
      purpose: "Styrning, struktur och uppföljning i M365.",
      color: "#d4c6f4",
      image: "assets/img/tile-atlas.jpg",
      modules: [
        { id: "kurs13_modul01", number: 1, title: "Vad är governance i M365", video: "video/kurs13_modul1.mp4" },
        { id: "kurs13_modul02", number: 2, title: "Roller och ansvar", video: "video/kurs13_modul2.mp4" },
        { id: "kurs13_modul03", number: 3, title: "Livscykelhantering", video: "video/kurs13_modul3.mp4" },
        { id: "kurs13_modul04", number: 4, title: "Struktur och standarder", video: "video/kurs13_modul4.mp4" },
        { id: "kurs13_modul05", number: 5, title: "Uppföljning och kontroll", video: "video/kurs13_modul5.mp4" }
      ]
    },
    {
      id: "kurs14",
      code: "K14",
      title: "INFORMATIONENS LIVSCYKEL",
      displayTitle: "Kurs 14 – INFORMATIONENS LIVSCYKEL",
      purpose: "Informationshantering genom hela livscykeln.",
      color: "#b7e1cd",
      image: "assets/img/tile-hrkollegan.jpg",
      modules: [
        { id: "kurs14_modul01", number: 1, title: "Informationsflöde", video: "video/kurs14_modul1.mp4" },
        { id: "kurs14_modul02", number: 2, title: "Allmän handling", video: "video/kurs14_modul2.mp4" },
        { id: "kurs14_modul03", number: 3, title: "Bevarande och gallring", video: "video/kurs14_modul3.mp4" },
        { id: "kurs14_modul04", number: 4, title: "Koppling till arkiv", video: "video/kurs14_modul4.mp4" },
        { id: "kurs14_modul05", number: 5, title: "Praktisk tillämpning (TFF)", video: "video/kurs14_modul5.mp4" }
      ]
    },
    {
      id: "kurs15",
      code: "K15",
      title: "ARBETA PROCESSBASERAT I M365",
      displayTitle: "Kurs 15 – ARBETA PROCESSBASERAT I M365",
      purpose: "Processbaserat arbetssätt i digital miljö.",
      color: "#a8ddd3",
      image: "assets/img/tile-chief.jpg",
      modules: [
        { id: "kurs15_modul01", number: 1, title: "Processer i verksamheten", video: "video/kurs15_modul1.mp4" },
        { id: "kurs15_modul02", number: 2, title: "Från process till digitalt stöd", video: "video/kurs15_modul2.mp4" },
        { id: "kurs15_modul03", number: 3, title: "Struktur per process", video: "video/kurs15_modul3.mp4" },
        { id: "kurs15_modul04", number: 4, title: "Standardisering", video: "video/kurs15_modul4.mp4" },
        { id: "kurs15_modul05", number: 5, title: "Koppling till ledningssystem", video: "video/kurs15_modul5.mp4" }
      ]
    }
  ];

  /* -------------------------------------------------------
     HJÄLPARE
     ------------------------------------------------------- */
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getCourse(courseId) {
    return COURSES.find(c => c.id === courseId) || null;
  }

  function getModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    return course.modules.find(m => m.id === moduleId) || null;
  }

  function getPrevModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    const idx = course.modules.findIndex(m => m.id === moduleId);
    return idx > 0 ? course.modules[idx - 1] : null;
  }

  function getNextModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    const idx = course.modules.findIndex(m => m.id === moduleId);
    return idx >= 0 && idx < course.modules.length - 1 ? course.modules[idx + 1] : null;
  }

  function progressKey(courseId, moduleId) {
    return `tff_progress_${courseId}_${moduleId}`;
  }

  function saveProgress(courseId, moduleId, data) {
    localStorage.setItem(progressKey(courseId, moduleId), JSON.stringify(data));
  }

  function readProgress(courseId, moduleId) {
    const raw = localStorage.getItem(progressKey(courseId, moduleId));
    return raw ? JSON.parse(raw) : null;
  }

  function isPassed(courseId, moduleId) {
    const p = readProgress(courseId, moduleId);
    return !!(p && p.passed === true);
  }

  function isUnlocked(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return false;
    const idx = course.modules.findIndex(m => m.id === moduleId);
    if (idx === -1) return false;
    if (idx === 0) return true;
    return isPassed(courseId, course.modules[idx - 1].id);
  }

  function getCourseProgress(courseId) {
    const course = getCourse(courseId);
    if (!course) return { passed: 0, total: 0, percent: 0 };
    const total = course.modules.length;
    const passed = course.modules.filter(m => isPassed(courseId, m.id)).length;
    return { passed, total, percent: total ? Math.round((passed / total) * 100) : 0 };
  }

  function normalizeVideoUrl(url) {
    if (!url) return "";
    if (url.includes("sharepoint.com")) {
      if (url.includes("download=1") || url.includes("embed=1")) return url;
      return url.includes("?") ? `${url}&download=1` : `${url}?download=1`;
    }
    return url;
  }

  function getVideoUrl(module) {
    return normalizeVideoUrl(VIDEO_OVERRIDES[module.id] || module.video || "");
  }

  function pageName() {
    const path = window.location.pathname || "";
    return path.split("/").pop().toLowerCase();
  }

  /* -------------------------------------------------------
     AUTO-LAYOUT om containrar saknas
     ------------------------------------------------------- */
  function ensureCatalogLayout() {
    let root = qs("#coursesGrid");
    if (root) return root;

    const main = qs("main") || document.body;
    main.innerHTML = `
      <section class="tff-wrap">
        <header class="tff-hero">
          <h1>TFF – Kurskatalog</h1>
          <p>15 kurser med 5 moduler per kurs, video, quiz och progression.</p>
          <button id="resetProgressBtn" class="tff-btn tff-btn-ghost">Rensa progression</button>
        </header>
        <section id="coursesGrid" class="tff-courses-grid"></section>
      </section>
    `;
    return qs("#coursesGrid");
  }

  function ensureCourseLayout() {
    let list = qs("#moduleList");
    if (list) return {
      title: qs("#courseTitle"),
      purpose: qs("#coursePurpose"),
      progress: qs("#courseProgress"),
      list
    };

    const main = qs("main") || document.body;
    main.innerHTML = `
      <section class="tff-wrap">
        <nav class="tff-topnav">
          <a class="tff-btn tff-btn-ghost" href="utbildningar.html">← Till kurskatalogen</a>
          <button id="resetProgressBtn" class="tff-btn tff-btn-ghost">Rensa progression</button>
        </nav>
        <header class="tff-hero">
          <h1 id="courseTitle">Kurs</h1>
          <p id="coursePurpose"></p>
          <p id="courseProgress" class="tff-progress-text"></p>
        </header>
        <ul id="moduleList" class="tff-module-list"></ul>
      </section>
    `;
    return {
      title: qs("#courseTitle"),
      purpose: qs("#coursePurpose"),
      progress: qs("#courseProgress"),
      list: qs("#moduleList")
    };
  }

  function ensureModuleLayout() {
    let quizContainer = qs("#quizContainer");
    if (quizContainer) {
      return {
        title: qs("#moduleTitle"),
        subtitle: qs("#moduleSubtitle"),
        bullets: qs("#moduleBullets"),
        video: qs("#videoContainer"),
        quiz: quizContainer,
        nav: qs("#moduleNav")
      };
    }

    const main = qs("main") || document.body;
    main.innerHTML = `
      <section class="tff-wrap">
        <nav class="tff-topnav">
          <a class="tff-btn tff-btn-ghost" href="utbildningar.html">← Kurskatalog</a>
          <button id="resetProgressBtn" class="tff-btn tff-btn-ghost">Rensa progression</button>
        </nav>

        <section class="tff-card">
          <h1 id="moduleTitle">Modul</h1>
          <p id="moduleSubtitle"></p>
        </section>

        <section class="tff-card">
          <h2>Innehåll</h2>
          <ul id="moduleBullets"></ul>
        </section>

        <section class="tff-card">
          <h2>Video</h2>
          <div id="videoContainer"></div>
        </section>

        <section class="tff-card">
          <h2>Quiz</h2>
          <div id="quizContainer"></div>
        </section>

        <section class="tff-card">
          <div id="moduleNav"></div>
        </section>
      </section>
    `;
    return {
      title: qs("#moduleTitle"),
      subtitle: qs("#moduleSubtitle"),
      bullets: qs("#moduleBullets"),
      video: qs("#videoContainer"),
      quiz: qs("#quizContainer"),
      nav: qs("#moduleNav")
    };
  }

  /* -------------------------------------------------------
     CSS-injektion
     ------------------------------------------------------- */
  function injectStyles() {
    if (qs("#tff-kurser-app-styles")) return;
    const style = document.createElement("style");
    style.id = "tff-kurser-app-styles";
    style.textContent = `
      :root{
        --tff-bg:#f6f7fb;
        --tff-card:#ffffff;
        --tff-text:#1f2937;
        --tff-muted:#6b7280;
        --tff-line:#e5e7eb;
        --tff-primary:#2563eb;
        --tff-success:#16a34a;
        --tff-danger:#dc2626;
        --tff-shadow:0 10px 24px rgba(2,6,23,.08);
        --tff-radius:18px;
      }
      body{background:var(--tff-bg);}
      .tff-wrap{max-width:1160px;margin:0 auto;padding:20px;font-family:Segoe UI,Arial,sans-serif;color:var(--tff-text);}
      .tff-hero,.tff-card{
        background:var(--tff-card);border-radius:var(--tff-radius);
        box-shadow:var(--tff-shadow);padding:24px;margin-bottom:20px;
      }
      .tff-hero h1,.tff-card h1,.tff-card h2{margin:0 0 10px 0;}
      .tff-hero p,.tff-card p{margin:0;color:var(--tff-muted);line-height:1.6;}
      .tff-topnav{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;}
      .tff-btn{
        display:inline-flex;align-items:center;justify-content:center;
        padding:12px 16px;border:none;border-radius:12px;
        text-decoration:none;font-weight:600;cursor:pointer;
      }
      .tff-btn-primary{background:var(--tff-primary);color:#fff;}
      .tff-btn-ghost{background:#fff;border:1px solid var(--tff-line);color:var(--tff-text);}
      .tff-courses-grid{
        display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:18px;
      }
      .tff-course-card{
        background:#fff;border-radius:18px;box-shadow:var(--tff-shadow);
        overflow:hidden;border-top:6px solid #ccc;
      }
      .tff-course-card-body{padding:20px;}
      .tff-chip{
        display:inline-block;padding:6px 10px;border-radius:999px;
        font-size:.84rem;font-weight:700;background:#eef2ff;color:#4338ca;margin-bottom:10px;
      }
      .tff-course-card h3{margin:0 0 10px;font-size:1.12rem;line-height:1.35;}
      .tff-course-card p{margin:0 0 10px;color:var(--tff-muted);line-height:1.55;}
      .tff-progress{
        width:100%;height:10px;background:#edf2f7;border-radius:999px;overflow:hidden;margin:12px 0 8px;
      }
      .tff-progress span{display:block;height:100%;background:#10b981;}
      .tff-progress-text{font-weight:600;color:#111827 !important;}
      .tff-module-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;}
      .tff-module-item{
        background:#fff;border-radius:18px;box-shadow:var(--tff-shadow);
        padding:18px;display:flex;justify-content:space-between;gap:16px;align-items:center;
      }
      .tff-module-item.locked{opacity:.62;}
      .tff-module-left{display:flex;gap:14px;align-items:flex-start;flex:1;}
      .tff-module-badge{
        min-width:54px;height:54px;border-radius:14px;background:#eef2ff;color:#4338ca;
        display:flex;align-items:center;justify-content:center;font-weight:700;
      }
      .tff-module-info h4{margin:0 0 8px;}
      .tff-module-info p{margin:0 0 8px;color:var(--tff-muted);}
      .tff-status{display:inline-flex;padding:6px 10px;border-radius:999px;font-size:.84rem;font-weight:700;}
      .tff-status-open{background:#dbeafe;color:#1d4ed8;}
      .tff-status-passed{background:#dcfce7;color:#166534;}
      .tff-status-locked{background:#fee2e2;color:#991b1b;}
      #moduleBullets{padding-left:20px;margin:0;}
      #moduleBullets li{margin-bottom:8px;line-height:1.6;}
      #videoContainer video,#videoContainer iframe{
        width:100%;border-radius:14px;background:#000;min-height:320px;
      }
      .tff-quiz-form{display:flex;flex-direction:column;gap:16px;}
      .tff-quiz-question{
        border:1px solid var(--tff-line);border-radius:14px;padding:16px;
      }
      .tff-quiz-question legend{
        padding:0 8px;font-weight:700;line-height:1.5;
      }
      .tff-quiz-option{
        display:flex;gap:8px;align-items:flex-start;padding:8px 0;
        cursor:pointer;line-height:1.5;
      }
      .tff-quiz-actions{display:flex;justify-content:flex-start;}
      .tff-result{
        border-radius:14px;padding:16px;margin-top:8px;
      }
      .tff-result-success{background:#dcfce7;color:#166534;}
      .tff-result-fail{background:#fee2e2;color:#991b1b;}
      .tff-result p{margin:0 0 8px;color:inherit;}
      .tff-result-actions{
        display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;
      }
      .tff-module-nav{
        display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;
      }
      @media (max-width:720px){
        .tff-module-item{flex-direction:column;align-items:stretch;}
      }
    `;
    document.head.appendChild(style);
  }

  /* -------------------------------------------------------
     QUIZ-DATA – 10 frågor per modul
     ------------------------------------------------------- */
  function deterministicShuffle(options, seed) {
    const arr = options.map((text, idx) => ({ text, idx }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed + i * 7) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildQuestions(course, module) {
    const raw = [
      {
        question: `Vad är huvudsyftet med modulen "${module.title}"?`,
        options: [
          course.purpose,
          "Att lagra allt lokalt",
          "Att ersätta all dokumentation med chatt",
          "Att undvika gemensamma arbetssätt"
        ],
        correct: 0
      },
      {
        question: `Vilket arbetssätt stödjer bäst kursen "${course.displayTitle}"?`,
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
        question: `Vad bör prioriteras i kursen "${course.displayTitle}"?`,
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
        question: `Vad är det övergripande målet i kursen "${course.displayTitle}"?`,
        options: [
          "Att skapa ordning, kvalitet och hållbara arbetssätt",
          "Att undvika struktur",
          "Att minska spårbarhet",
          "Att ersätta alla andra system"
        ],
        correct: 0
      }
    ];

    return raw.map((item, index) => {
      const shuffled = deterministicShuffle(item.options, course.code.length + module.number + index);
      const correctText = item.options[item.correct];
      return {
        id: `${module.id}_q${String(index + 1).padStart(2, "0")}`,
        number: index + 1,
        question: item.question,
        options: shuffled.map(x => x.text),
        correct: shuffled.findIndex(x => x.text === correctText)
      };
    });
  }

  /* -------------------------------------------------------
     RENDRING – KATALOG
     ------------------------------------------------------- */
  function renderCatalogPage() {
    const root = ensureCatalogLayout();

    root.innerHTML = COURSES.map(course => {
      const p = getCourseProgress(course.id);
      return `
        <article class="tff-course-card" style="border-top-color:${escapeHtml(course.color)}">
          <div class="tff-course-card-body">
            <span class="tff-chip">${escapeHtml(course.code)}</span>
            <h3>${escapeHtml(course.displayTitle)}</h3>
            <p>${escapeHtml(course.purpose)}</p>
            <div class="tff-progress"><span style="width:${p.percent}%"></span></div>
            <p class="tff-progress-text">Genomfört: ${p.passed}/${p.total} moduler (${p.percent}%)</p>
            <a class="tff-btn tff-btn-primary" href="kurser.html?course=${encodeURIComponent(course.id)}">Öppna kurs</a>
          </div>
        </article>
      `;
    }).join("");

    bindResetButton();
  }

  /* -------------------------------------------------------
     RENDRING – KURS
     ------------------------------------------------------- */
  function renderCoursePage() {
    const courseId = getParam("course");
    const course = getCourse(courseId);

    const layout = ensureCourseLayout();

    if (!course) {
      layout.list.innerHTML = `<li class="tff-card">Kurs hittades inte.</li>`;
      return;
    }

    if (layout.title) layout.title.textContent = course.displayTitle;
    if (layout.purpose) layout.purpose.textContent = course.purpose;

    const p = getCourseProgress(course.id);
    if (layout.progress) {
      layout.progress.textContent = `Genomfört: ${p.passed}/${p.total} moduler (${p.percent}%)`;
    }

    layout.list.innerHTML = course.modules.map(module => {
      const unlocked = isUnlocked(course.id, module.id);
      const passed = isPassed(course.id, module.id);

      return `
        <li class="tff-module-item ${unlocked ? "" : "locked"}">
          <div class="tff-module-left">
            <div class="tff-module-badge">M${module.number}</div>
            <div class="tff-module-info">
              <h4>${escapeHtml(module.title)}</h4>
              <p>${escapeHtml(course.purpose)}</p>
              <span class="tff-status ${
                passed ? "tff-status-passed" : unlocked ? "tff-status-open" : "tff-status-locked"
              }">
                ${passed ? "Godkänd" : unlocked ? "Öppen" : "Låst"}
              </span>
            </div>
          </div>
          <div>
            ${
              unlocked
                ? `<a class="tff-btn tff-btn-primary" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(module.id)}">Öppna modul</a>`
                : `<button class="tff-btn tff-btn-ghost" disabled>Låst</button>`
            }
          </div>
        </li>
      `;
    }).join("");

    bindResetButton();
  }

  /* -------------------------------------------------------
     RENDRING – MODUL + QUIZ
     ------------------------------------------------------- */
  function renderModulePage() {
    const courseId = getParam("course");
    const moduleId = getParam("module");
    const course = getCourse(courseId);
    const module = getModule(courseId, moduleId);

    const layout = ensureModuleLayout();

    if (!course || !module) {
      if (layout.quiz) {
        layout.quiz.innerHTML = `<div class="tff-card">Kurs eller modul hittades inte.</div>`;
      }
      return;
    }

    if (!isUnlocked(course.id, module.id)) {
      document.body.innerHTML = `
        <section class="tff-wrap">
          <section class="tff-card">
            <h1>Modulen är låst</h1>
            <p>Du måste klara föregående modul innan du kan öppna denna.</p>
            <p style="margin-top:12px">
              <a class="tff-btn tff-btn-primary" href="kurser.html?course=${encodeURIComponent(course.id)}">Tillbaka till kursen</a>
            </p>
          </section>
        </section>
      `;
      return;
    }

    if (layout.title) layout.title.textContent = module.title;
    if (layout.subtitle) layout.subtitle.textContent = `${course.displayTitle} – ${course.purpose}`;

    if (layout.bullets) {
      layout.bullets.innerHTML = [
        `Syfte: ${course.purpose}`,
        `Fokusområde: ${module.title}`,
        "Arbetssätt och struktur i praktiken",
        "Vanliga fel, risker och rekommenderade arbetssätt"
      ].map(item => `<li>${escapeHtml(item)}</li>`).join("");
    }

    if (layout.video) {
      const videoUrl = getVideoUrl(module);
      if (videoUrl.includes("embed=1")) {
        layout.video.innerHTML = `
          <iframe src="${escapeHtml(videoUrl)}" width="100%" height="420" frameborder="0" allowfullscreen loading="lazy"></iframe>
        `;
      } else {
        layout.video.innerHTML = `
          <video controls preload="metadata">
            <source src="${escapeHtml(videoUrl)}" type="video/mp4">
            Din webbläsare stödjer inte video.
          </video>
        `;
      }
    }

    if (layout.quiz) {
      renderQuiz(course, module, layout.quiz);
    }

    if (layout.nav) {
      const prev = getPrevModule(course.id, module.id);
      const next = getNextModule(course.id, module.id);

      layout.nav.innerHTML = `
        <div class="tff-module-nav">
          ${
            prev
              ? `<a class="tff-btn tff-btn-ghost" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(prev.id)}">← Föregående modul</a>`
              : `<span></span>`
          }
          <a class="tff-btn tff-btn-primary" href="kurser.html?course=${encodeURIComponent(course.id)}">Till kursen</a>
          ${
            next && isUnlocked(course.id, next.id)
              ? `<a class="tff-btn tff-btn-ghost" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(next.id)}">Nästa modul →</a>`
              : `<span></span>`
          }
        </div>
      `;
    }

    bindResetButton();
  }

  function renderQuiz(course, module, container) {
    const questions = buildQuestions(course, module);

    container.innerHTML = `
      <form id="tffQuizForm" class="tff-quiz-form">
        ${questions.map(q => `
          <fieldset class="tff-quiz-question">
            <legend><strong>Fråga ${q.number}:</strong> ${escapeHtml(q.question)}</legend>
            ${q.options.map((option, index) => `
              <label class="tff-quiz-option">
                <input type="radio" name="${escapeHtml(q.id)}" value="${index}">
                <span>${escapeHtml(option)}</span>
              </label>
            `).join("")}
          </fieldset>
        `).join("")}

        <div class="tff-quiz-actions">
          <button type="button" id="tffCheckQuizBtn" class="tff-btn tff-btn-primary">Kontrollera svar</button>
        </div>

        <div id="tffQuizResult"></div>
      </form>
    `;

    const button = qs("#tffCheckQuizBtn", container);
    if (button) {
      button.addEventListener("click", () => checkQuiz(course, module, questions));
    }
  }

  function checkQuiz(course, module, questions) {
    let score = 0;
    let answered = 0;

    questions.forEach(q => {
      const selected = qs(`input[name="${q.id}"]:checked`);
      if (selected) {
        answered++;
        if (Number(selected.value) === q.correct) score++;
      }
    });

    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= PASS_PERCENT;

    saveProgress(course.id, module.id, {
      score,
      total: questions.length,
      percent,
      passed,
      timestamp: new Date().toISOString()
    });

    const next = getNextModule(course.id, module.id);
    const result = qs("#tffQuizResult");

    if (result) {
      result.innerHTML = `
        <div class="tff-result ${passed ? "tff-result-success" : "tff-result-fail"}">
          <p><strong>Resultat:</strong> ${score} av ${questions.length} rätt (${percent}%)</p>
          <p><strong>Krav:</strong> ${PASS_PERCENT}% för godkänt</p>
          <p><strong>Status:</strong> ${passed ? "Godkänd" : "Inte godkänd"}</p>
          <p><strong>Besvarade frågor:</strong> ${answered} av ${questions.length}</p>
          ${
            passed
              ? `<p>Modulen är godkänd. Nästa modul låses upp automatiskt.</p>`
              : `<p>Du behöver nå minst ${PASS_PERCENT}% för att låsa upp nästa modul.</p>`
          }
          <div class="tff-result-actions">
            <a class="tff-btn tff-btn-ghost" href="kurser.html?course=${encodeURIComponent(course.id)}">Till kursen</a>
            ${
              passed && next
                ? `<a class="tff-btn tff-btn-primary" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(next.id)}">Gå till nästa modul</a>`
                : ``
            }
          </div>
        </div>
      `;
    }
  }

  /* -------------------------------------------------------
     RENSNING
     ------------------------------------------------------- */
  function resetAllProgress() {
    COURSES.forEach(course => {
      course.modules.forEach(module => {
        localStorage.removeItem(progressKey(course.id, module.id));
      });
    });
    window.location.reload();
  }

  function bindResetButton() {
    const btn = qs("#resetProgressBtn");
    if (btn) {
      btn.onclick = resetAllProgress;
    }
  }

  /* -------------------------------------------------------
     INIT
     ------------------------------------------------------- */
  function init() {
    injectStyles();

    const current = pageName();

    if (current === "utbildningar.html") {
      renderCatalogPage();
      return;
    }

    if (current === "kurser.html") {
      renderCoursePage();
      return;
    }

    if (current === "kurs_dokumentation.html") {
      renderModulePage();
      return;
    }

    // Fallback om sidan redan innehåller specifika element
    if (qs("#coursesGrid")) {
      renderCatalogPage();
      return;
    }
    if (qs("#moduleList")) {
      renderCoursePage();
      return;
    }
    if (qs("#quizContainer") || qs("#videoContainer")) {
      renderModulePage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);

  // Exponera reset vid behov från knappar/console
  window.resetAllTffCourseProgress = resetAllProgress;
})();
