(function () {
  const STORAGE_KEY = "tffPortalCourses";
  const PROGRESS_KEY = "tffPortalProgress";
  const RESULTS_KEY = "tffPortalResults";

  const courseDefinitions = [
    {
      id: 1,
      title: "Kurs 1 – MICROSOFT TEAMS",
      purpose: "Rätt användning av Teams i vardagsarbetet.",
      color: "#82c7b8",
      modules: [
        "Vad är Teams (och vad är det inte)",
        "Chatt, kanal och möte – rätt val",
        "Möten i Teams – roller & praxis",
        "Filer i Teams (SharePoint i bakgrunden)",
        "Vanliga misstag i kommunal Teams-användning"
      ]
    },
    {
      id: 2,
      title: "Kurs 2 – TRANSKRIBERING",
      purpose: "Effektiv och spårbar omvandling av tal till text.",
      color: "#a7d8f5",
      modules: [
        "Grundläggande transkribering",
        "Praktisk användning i möten",
        "Kvalitetssäkring",
        "Informationshantering och GDPR",
        "Tillämpning i verksamheten"
      ]
    },
    {
      id: 3,
      title: "Kurs 3 – DOKUMENTATION",
      purpose: "Strukturerad dokumentation enligt regelverk.",
      color: "#f3c9a9",
      modules: [
        "Grundläggande dokumentation",
        "Struktur och standard",
        "Dokument i M365",
        "Efterlevnad – lagar och regler",
        "Praktisk tillämpning"
      ]
    },
    {
      id: 4,
      title: "Kurs 4 – AI & COPILOT",
      purpose: "Grunderna i AI och Copilot i arbetet.",
      color: "#9fd8cf",
      modules: [
        "Vad Copilot är (och inte är)",
        "Data, behörighet och ansvar",
        "När Copilot hjälper",
        "Kvalitetskontroll av AI-svar",
        "Kommunala exempel och fallgropar"
      ]
    },
    {
      id: 5,
      title: "Kurs 5 – PROMPTNING",
      purpose: "Skriva effektiva prompts i Microsoft 365.",
      color: "#eab3b3",
      modules: [
        "Promptens byggstenar",
        "Roller, kontext och mål",
        "Vanliga jobbcase",
        "Förbättra prompt steg för steg",
        "Promptbibliotek och återanvändning"
      ]
    },
    {
      id: 6,
      title: "Kurs 6 – SKAPA OCH SPARA DOKUMENT",
      purpose: "Korrekt dokumenthantering i vardagen.",
      color: "#c9b8e4",
      modules: [
        "Utkast vs styrdokument",
        "Var dokument ska skapas",
        "Namngivning och struktur",
        "Versionering och livscykel",
        "Återanvändning och spårbarhet"
      ]
    },
    {
      id: 7,
      title: "Kurs 7 – TEAMS & SHAREPOINT",
      purpose: "Rätt struktur, lagring och behörigheter.",
      color: "#f3b6c6",
      modules: [
        "Team- och kanalstruktur",
        "Behörigheter i Teams",
        "SharePoint i bakgrunden",
        "Säker delning av filer",
        "Vanliga åtkomstfel"
      ]
    },
    {
      id: 8,
      title: "Kurs 8 – GDPR",
      purpose: "Rätt hantering av information och personuppgifter.",
      color: "#f4c2c2",
      modules: [
        "Vad är personuppgifter",
        "Personuppgifter i M365",
        "Delning och mottagare",
        "Lagring och gallring",
        "Praktiska exempel"
      ]
    },
    {
      id: 9,
      title: "Kurs 9 – RÄTT VERKTYG",
      purpose: "Välja rätt verktyg för rätt arbete.",
      color: "#d9c1e8",
      modules: [
        "När Teams passar bäst",
        "När e-post passar bäst",
        "När dokumentyta behövs",
        "När ärendehantering krävs",
        "Vanliga felval i vardagen"
      ]
    },
    {
      id: 10,
      title: "Kurs 10 – MÖTESKULTUR",
      purpose: "Effektiva digitala möten med tydliga resultat.",
      color: "#f6c09a",
      modules: [
        "Planering av möten",
        "Agenda och förväntningar",
        "Beslut och uppföljning",
        "Asynkront arbete i Teams",
        "Mötesetikett"
      ]
    },
    {
      id: 11,
      title: "Kurs 11 – FRÅN CHATT TILL STRUKTUR",
      purpose: "Göra kunskap beständig och återanvändbar.",
      color: "#a6dcd4",
      modules: [
        "Varför chatt inte är arkiv",
        "Fånga beslut ur dialog",
        "Skapa struktur av arbetsmaterial",
        "Dela rätt – inte allt",
        "Från brus till verksamhetsnytta"
      ]
    },
    {
      id: 12,
      title: "Kurs 12 – DIARIEFÖRING",
      purpose: "Korrekt hantering av allmänna handlingar och dokument.",
      color: "#c9d9a6",
      modules: [
        "Vad som ska diarieföras",
        "Dokument och ärenden",
        "Arkivering i praktiken",
        "Spårbarhet och kontroll",
        "Praktisk tillämpning"
      ]
    },
    {
      id: 13,
      title: "Kurs 13 – GOVERNANCE",
      purpose: "Styrning, struktur och uppföljning i M365.",
      color: "#d4c6f4",
      modules: [
        "Vad governance innebär",
        "Roller och ansvar",
        "Livscykel för team och innehåll",
        "Uppföljning och kontroll",
        "Lokal tillämpning"
      ]
    },
    {
      id: 14,
      title: "Kurs 14 – LIVSCYKEL",
      purpose: "Informationshantering genom hela livscykeln.",
      color: "#b7e1cd",
      modules: [
        "Skapande och mottagande",
        "Aktiv användning",
        "Bevarande och gallring",
        "Övergång till arkiv",
        "Vanliga risker och fel"
      ]
    },
    {
      id: 15,
      title: "Kurs 15 – PROCESSARBETE",
      purpose: "Processbaserat arbetssätt i digital miljö.",
      color: "#a8ddd3",
      modules: [
        "Vad processbaserat arbete innebär",
        "Kartläggning av arbetsflöden",
        "Koppling till M365",
        "Roller, ansvar och uppföljning",
        "Praktiska verksamhetsexempel"
      ]
    }
  ];

  function createQuestions(courseTitle, moduleTitle, purpose) {
    return [
      {
        q: `Vad är huvudsyftet med modulen "${moduleTitle}"?`,
        options: [
          purpose,
          "Att ersätta all dokumentation med chatt",
          "Att undvika gemensamma arbetssätt",
          "Att lagra allt lokalt"
        ],
        correct: 0
      },
      {
        q: `Vilket arbetssätt stödjer bäst kursen "${courseTitle}"?`,
        options: [
          "Spridd information på flera privata platser",
          "Gemensam struktur och tydliga ansvar",
          "Att varje person gör helt olika",
          "Att inget dokumenteras"
        ],
        correct: 1
      },
      {
        q: `Vad är viktigt i modulen "${moduleTitle}"?`,
        options: [
          "Tydlighet och spårbarhet",
          "Otydlighet",
          "Slumpmässig lagring",
          "Att ansvar saknas"
        ],
        correct: 0
      },
      {
        q: `Vad ska normalt undvikas i "${moduleTitle}"?`,
        options: [
          "Konsekvent struktur",
          "Tydlig ansvarsfördelning",
          "Otydlig eller spridd information",
          "Gemensamma arbetssätt"
        ],
        correct: 2
      },
      {
        q: `Vilken effekt ger ett bra arbetssätt i "${moduleTitle}"?`,
        options: [
          "Mindre sökbarhet",
          "Mer ordning och bättre kvalitet",
          "Sämre uppföljning",
          "Fler dubbletter"
        ],
        correct: 1
      },
      {
        q: `Vad är en vanlig risk utan struktur i "${moduleTitle}"?`,
        options: [
          "Tappad information",
          "Ökad kvalitet",
          "Bättre spårbarhet",
          "Enklare uppföljning"
        ],
        correct: 0
      },
      {
        q: `Vad bör prioriteras i kursen "${courseTitle}"?`,
        options: [
          "Rätt information på rätt plats",
          "Privat lagring som förstahandsval",
          "Brist på rutiner",
          "Ad hoc-arbete"
        ],
        correct: 0
      },
      {
        q: `Vad kännetecknar best practice i "${moduleTitle}"?`,
        options: [
          "Standardiserat arbetssätt",
          "Slumpmässig hantering",
          "Ingen uppföljning",
          "Dolda beslut"
        ],
        correct: 0
      },
      {
        q: `Vad stödjer bäst verksamhetsnytta i "${moduleTitle}"?`,
        options: [
          "Otydliga versioner",
          "Struktur, uppföljning och tydliga ansvar",
          "Spridda chattar",
          "Endast muntlig information"
        ],
        correct: 1
      },
      {
        q: `Vad är det övergripande målet i kursen "${courseTitle}"?`,
        options: [
          "Att skapa ordning, kvalitet och hållbara arbetssätt",
          "Att undvika struktur",
          "Att minska spårbarhet",
          "Att ersätta alla andra system"
        ],
        correct: 0
      }
    ];
  }

  function buildDefaults() {
    return courseDefinitions.map(course => ({
      id: course.id,
      title: course.title,
      purpose: course.purpose,
      color: course.color,
      modules: course.modules.map((moduleTitle, index) => ({
        id: index + 1,
        title: `Modul ${index + 1} – ${moduleTitle}`,
        purpose: course.purpose,
        video: "",
        content: [
          `Introduktion till ${moduleTitle.toLowerCase()}.`,
          "Arbetssätt och struktur i praktiken.",
          "Vanliga fel, risker och rekommenderade arbetssätt."
        ],
        questions: createQuestions(course.title, moduleTitle, course.purpose)
      }))
    }));
  }

  function getCourses() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return buildDefaults();
      }
    }
    return buildDefaults();
  }

  function saveCourses(courses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }

  function resetCourses() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getCourse(courseId) {
    return getCourses().find(c => Number(c.id) === Number(courseId));
  }

  function getModule(courseId, moduleId) {
    const course = getCourse(courseId);
    if (!course) return null;
    return course.modules.find(m => Number(m.id) === Number(moduleId));
  }

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  function setModuleProgress(courseId, moduleId, patch) {
    const progress = getProgress();
    progress[courseId] = progress[courseId] || {};
    progress[courseId][moduleId] = {
      completed: false,
      quizPassed: false,
      score: 0,
      total: 0,
      ...(progress[courseId][moduleId] || {}),
      ...patch
    };
    saveProgress(progress);
  }

  function getModuleProgress(courseId, moduleId) {
    const progress = getProgress();
    return (
      progress?.[courseId]?.[moduleId] || {
        completed: false,
        quizPassed: false,
        score: 0,
        total: 0
      }
    );
  }

  function resetCourseProgress(courseId) {
    const progress = getProgress();
    delete progress[courseId];
    saveProgress(progress);
  }

  function getResults() {
    try {
      return JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveResult(result) {
    const results = getResults();
    results.push(result);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  }

  function clearResults() {
    localStorage.removeItem(RESULTS_KEY);
  }

  window.PortalData = {
    STORAGE_KEY,
    PROGRESS_KEY,
    RESULTS_KEY,
    getCourses,
    saveCourses,
    resetCourses,
    getCourse,
    getModule,
    getProgress,
    saveProgress,
    setModuleProgress,
    getModuleProgress,
    resetCourseProgress,
    getResults,
    saveResult,
    clearResults
  };
})();
