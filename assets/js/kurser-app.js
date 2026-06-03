/* =========================================================
   TFF Digitala Kurser – komplett kurser-app.js
   15 kurser × 5 moduler × 10 frågor
   Video + quiz + progression
   ========================================================= */

/* ---------------------------------------------------------
   1. KONFIGURATION
--------------------------------------------------------- */
const PASS_PERCENT = 80; // 8 av 10 rätt krävs för godkänt

// Dina nya SharePoint-länkar för Kurs 1 modul 1–4.
// Allt annat använder sina vanliga video/kursX_modulY.mp4-sökvägar.
const VIDEO_OVERRIDES = {
  "kurs01_modul01": "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQABWSDYJjqPQoIfGi0z0Ou9AcMxF5Oy4PrqVL_O-_kNaGM?download=1",
  "kurs01_modul02": "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQD71mP6Qek0TLIsqv9_dLTZAbF0Ejm0iqytgK-HSoVan30?download=1",
  "kurs01_modul03": "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQCRb0ptY9iCQJThz0KP2dPMAfjC3fxkyC1F9g3bhnclEwM?download=1",
  "kurs01_modul04": "https://halmstad.sharepoint.com/:v:/s/TestavTeammedbibliotek/IQAQSNKAUbYpQLkt7bg4jpcrAWi_WYKLOb9TLMNIG6zl5BI?download=1"
};

/* ---------------------------------------------------------
   2. KURSER OCH MODULER
   Byggt på din kurs- och modulstruktur.
--------------------------------------------------------- */
const COURSES = [
  {
    id: "kurs01",
    number: 1,
    shortCode: "K1",
    title: "Kurs 1 – MICROSOFT TEAMS",
    purpose: "Rätt användning av Teams i vardagsarbetet.",
    color: "#82c7b8",
    image: "assets/img/tile-mandatory.jpg",
    modules: [
      { id: "kurs01_modul01", number: 1, title: "Modul 1 – Vad är Teams (och vad är det inte)", purpose: "Rätt användning av Teams i vardagsarbetet.", video: "video/kurs1_modul1.mp4", content: ["Introduktion till vad Teams är och inte är.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs01_modul02", number: 2, title: "Modul 2 – Chatt, kanal och möte – rätt val", purpose: "Rätt användning av Teams i vardagsarbetet.", video: "video/kurs1_modul2.mp4", content: ["Introduktion till chatt, kanal och möte – rätt val.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs01_modul03", number: 3, title: "Modul 3 – Möten i Teams – roller & praxis", purpose: "Rätt användning av Teams i vardagsarbetet.", video: "video/kurs1_modul3.mp4", content: ["Introduktion till Teams-möten, roller och praxis.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs01_modul04", number: 4, title: "Modul 4 – Filer i Teams (SharePoint i bakgrunden)", purpose: "Rätt användning av Teams i vardagsarbetet.", video: "video/kurs1_modul4.mp4", content: ["Introduktion till filer i Teams och SharePoint.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs01_modul05", number: 5, title: "Modul 5 – Vanliga misstag i kommunal Teams-användning", purpose: "Rätt användning av Teams i vardagsarbetet.", video: "video/kurs1_modul5.mp4", content: ["Introduktion till vanliga misstag i kommunal Teams-användning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs02",
    number: 2,
    shortCode: "K2",
    title: "Kurs 2 – TRANSKRIBERING",
    purpose: "Effektiv och spårbar omvandling av tal till text.",
    color: "#a7d8f5",
    image: "assets/img/tile-status.jpg",
    modules: [
      { id: "kurs02_modul01", number: 1, title: "Modul 1 – Grundläggande transkribering", purpose: "Effektiv och spårbar omvandling av tal till text.", video: "video/kurs2_modul1.mp4", content: ["Introduktion till grundläggande transkribering.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs02_modul02", number: 2, title: "Modul 2 – Praktisk användning i möten", purpose: "Effektiv och spårbar omvandling av tal till text.", video: "video/kurs2_modul2.mp4", content: ["Introduktion till praktisk användning i möten.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs02_modul03", number: 3, title: "Modul 3 – Kvalitetssäkring", purpose: "Effektiv och spårbar omvandling av tal till text.", video: "video/kurs2_modul3.mp4", content: ["Introduktion till kvalitetssäkring.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs02_modul04", number: 4, title: "Modul 4 – Informationshantering och GDPR", purpose: "Effektiv och spårbar omvandling av tal till text.", video: "video/kurs2_modul4.mp4", content: ["Introduktion till informationshantering och GDPR.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs02_modul05", number: 5, title: "Modul 5 – Tillämpning i verksamheten", purpose: "Effektiv och spårbar omvandling av tal till text.", video: "video/kurs2_modul5.mp4", content: ["Introduktion till tillämpning i verksamheten.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs03",
    number: 3,
    shortCode: "K3",
    title: "Kurs 3 – DOKUMENTATION",
    purpose: "Strukturerad dokumentation enligt regelverk.",
    color: "#f3c9a9",
    image: "assets/img/tile-guides.jpg",
    modules: [
      { id: "kurs03_modul01", number: 1, title: "Modul 1 – Grundläggande dokumentation", purpose: "Strukturerad dokumentation enligt regelverk.", video: "video/kurs3_modul1.mp4", content: ["Introduktion till grundläggande dokumentation.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs03_modul02", number: 2, title: "Modul 2 – Struktur och standard", purpose: "Strukturerad dokumentation enligt regelverk.", video: "video/kurs3_modul2.mp4", content: ["Introduktion till struktur och standard.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs03_modul03", number: 3, title: "Modul 3 – Dokument i M365", purpose: "Strukturerad dokumentation enligt regelverk.", video: "video/kurs3_modul3.mp4", content: ["Introduktion till dokument i M365.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs03_modul04", number: 4, title: "Modul 4 – Efterlevnad – lagar och regler", purpose: "Strukturerad dokumentation enligt regelverk.", video: "video/kurs3_modul4.mp4", content: ["Introduktion till efterlevnad – lagar och regler.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs03_modul05", number: 5, title: "Modul 5 – Praktisk tillämpning", purpose: "Strukturerad dokumentation enligt regelverk.", video: "video/kurs3_modul5.mp4", content: ["Introduktion till praktisk tillämpning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs04",
    number: 4,
    shortCode: "K4",
    title: "Kurs 4 – AI & COPILOT",
    purpose: "Grunderna i AI och Copilot i arbetet.",
    color: "#9fd8cf",
    image: "assets/img/tile-chief.jpg",
    modules: [
      { id: "kurs04_modul01", number: 1, title: "Modul 1 – Vad Copilot är (och inte är)", purpose: "Grunderna i AI och Copilot i arbetet.", video: "video/kurs4_modul1.mp4", content: ["Introduktion till vad Copilot är och inte är.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs04_modul02", number: 2, title: "Modul 2 – Data, behörighet och ansvar", purpose: "Grunderna i AI och Copilot i arbetet.", video: "video/kurs4_modul2.mp4", content: ["Introduktion till data, behörighet och ansvar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs04_modul03", number: 3, title: "Modul 3 – När Copilot hjälper", purpose: "Grunderna i AI och Copilot i arbetet.", video: "video/kurs4_modul3.mp4", content: ["Introduktion till när Copilot hjälper.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs04_modul04", number: 4, title: "Modul 4 – Kvalitetskontroll av AI-svar", purpose: "Grunderna i AI och Copilot i arbetet.", video: "video/kurs4_modul4.mp4", content: ["Introduktion till kvalitetskontroll av AI-svar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs04_modul05", number: 5, title: "Modul 5 – Kommunala exempel och fallgropar", purpose: "Grunderna i AI och Copilot i arbetet.", video: "video/kurs4_modul5.mp4", content: ["Introduktion till kommunala exempel och fallgropar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs05",
    number: 5,
    shortCode: "K5",
    title: "Kurs 5 – PROMPTNING",
    purpose: "Skriva effektiva prompts i Microsoft 365.",
    color: "#eab3b3",
    image: "assets/img/tile-edu.jpg",
    modules: [
      { id: "kurs05_modul01", number: 1, title: "Modul 1 – Promptens byggstenar", purpose: "Skriva effektiva prompts i Microsoft 365.", video: "video/kurs5_modul1.mp4", content: ["Introduktion till promptens byggstenar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs05_modul02", number: 2, title: "Modul 2 – Roller, kontext och mål", purpose: "Skriva effektiva prompts i Microsoft 365.", video: "video/kurs5_modul2.mp4", content: ["Introduktion till roller, kontext och mål.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs05_modul03", number: 3, title: "Modul 3 – Vanliga jobbcase", purpose: "Skriva effektiva prompts i Microsoft 365.", video: "video/kurs5_modul3.mp4", content: ["Introduktion till vanliga jobbcase.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs05_modul04", number: 4, title: "Modul 4 – Förbättra prompt steg för steg", purpose: "Skriva effektiva prompts i Microsoft 365.", video: "video/kurs5_modul4.mp4", content: ["Introduktion till att förbättra prompt steg för steg.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs05_modul05", number: 5, title: "Modul 5 – Promptbibliotek och återanvändning", purpose: "Skriva effektiva prompts i Microsoft 365.", video: "video/kurs5_modul5.mp4", content: ["Introduktion till promptbibliotek och återanvändning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs06",
    number: 6,
    shortCode: "K6",
    title: "Kurs 6 – SKAPA OCH SPARA DOKUMENT",
    purpose: "Korrekt dokumenthantering i vardagen.",
    color: "#c9b8e4",
    image: "assets/img/tile-hrkollegan.jpg",
    modules: [
      { id: "kurs06_modul01", number: 1, title: "Modul 1 – Utkast vs styrdokument", purpose: "Korrekt dokumenthantering i vardagen.", video: "video/kurs6_modul1.mp4", content: ["Introduktion till utkast vs styrdokument.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs06_modul02", number: 2, title: "Modul 2 – Var dokument ska skapas", purpose: "Korrekt dokumenthantering i vardagen.", video: "video/kurs6_modul2.mp4", content: ["Introduktion till var dokument ska skapas.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs06_modul03", number: 3, title: "Modul 3 – Namngivning och struktur", purpose: "Korrekt dokumenthantering i vardagen.", video: "video/kurs6_modul3.mp4", content: ["Introduktion till namngivning och struktur.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs06_modul04", number: 4, title: "Modul 4 – Versionering och livscykel", purpose: "Korrekt dokumenthantering i vardagen.", video: "video/kurs6_modul4.mp4", content: ["Introduktion till versionering och livscykel.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs06_modul05", number: 5, title: "Modul 5 – Återanvändning och spårbarhet", purpose: "Korrekt dokumenthantering i vardagen.", video: "video/kurs6_modul5.mp4", content: ["Introduktion till återanvändning och spårbarhet.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs07",
    number: 7,
    shortCode: "K7",
    title: "Kurs 7 – TEAMS & SHAREPOINT",
    purpose: "Rätt struktur, lagring och behörigheter.",
    color: "#f3b6c6",
    image: "assets/img/tile-atlas.jpg",
    modules: [
      { id: "kurs07_modul01", number: 1, title: "Modul 1 – Team- och kanalstruktur", purpose: "Rätt struktur, lagring och behörigheter.", video: "video/kurs7_modul1.mp4", content: ["Introduktion till team- och kanalstruktur.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs07_modul02", number: 2, title: "Modul 2 – Behörigheter i Teams", purpose: "Rätt struktur, lagring och behörigheter.", video: "video/kurs7_modul2.mp4", content: ["Introduktion till behörigheter i Teams.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs07_modul03", number: 3, title: "Modul 3 – SharePoint i bakgrunden", purpose: "Rätt struktur, lagring och behörigheter.", video: "video/kurs7_modul3.mp4", content: ["Introduktion till SharePoint i bakgrunden.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs07_modul04", number: 4, title: "Modul 4 – Säker delning av filer", purpose: "Rätt struktur, lagring och behörigheter.", video: "video/kurs7_modul4.mp4", content: ["Introduktion till säker delning av filer.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs07_modul05", number: 5, title: "Modul 5 – Vanliga åtkomstfel", purpose: "Rätt struktur, lagring och behörigheter.", video: "video/kurs7_modul5.mp4", content: ["Introduktion till vanliga åtkomstfel.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs08",
    number: 8,
    shortCode: "K8",
    title: "Kurs 8 – GDPR",
    purpose: "Rätt hantering av information och personuppgifter.",
    color: "#f4c2c2",
    image: "assets/img/tile-chief.jpg",
    modules: [
      { id: "kurs08_modul01", number: 1, title: "Modul 1 – Vad är personuppgifter", purpose: "Rätt hantering av information och personuppgifter.", video: "video/kurs8_modul1.mp4", content: ["Introduktion till vad personuppgifter är.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs08_modul02", number: 2, title: "Modul 2 – Personuppgifter i M365", purpose: "Rätt hantering av information och personuppgifter.", video: "video/kurs8_modul2.mp4", content: ["Introduktion till personuppgifter i M365.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs08_modul03", number: 3, title: "Modul 3 – Delning och mottagare", purpose: "Rätt hantering av information och personuppgifter.", video: "video/kurs8_modul3.mp4", content: ["Introduktion till delning och mottagare.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs08_modul04", number: 4, title: "Modul 4 – Lagring och gallring", purpose: "Rätt hantering av information och personuppgifter.", video: "video/kurs8_modul4.mp4", content: ["Introduktion till lagring och gallring.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs08_modul05", number: 5, title: "Modul 5 – Praktiska exempel", purpose: "Rätt hantering av information och personuppgifter.", video: "video/kurs8_modul5.mp4", content: ["Introduktion till praktiska exempel.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs09",
    number: 9,
    shortCode: "K9",
    title: "Kurs 9 – RÄTT VERKTYG",
    purpose: "Välja rätt verktyg för rätt arbete.",
    color: "#d9c1e8",
    image: "assets/img/tile-guides.jpg",
    modules: [
      { id: "kurs09_modul01", number: 1, title: "Modul 1 – När Teams passar bäst", purpose: "Välja rätt verktyg för rätt arbete.", video: "video/kurs9_modul1.mp4", content: ["Introduktion till när Teams passar bäst.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs09_modul02", number: 2, title: "Modul 2 – När e-post passar bäst", purpose: "Välja rätt verktyg för rätt arbete.", video: "video/kurs9_modul2.mp4", content: ["Introduktion till när e-post passar bäst.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs09_modul03", number: 3, title: "Modul 3 – När dokumentyta behövs", purpose: "Välja rätt verktyg för rätt arbete.", video: "video/kurs9_modul3.mp4", content: ["Introduktion till när dokumentyta behövs.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs09_modul04", number: 4, title: "Modul 4 – När ärendehantering krävs", purpose: "Välja rätt verktyg för rätt arbete.", video: "video/kurs9_modul4.mp4", content: ["Introduktion till när ärendehantering krävs.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs09_modul05", number: 5, title: "Modul 5 – Vanliga felval i vardagen", purpose: "Välja rätt verktyg för rätt arbete.", video: "video/kurs9_modul5.mp4", content: ["Introduktion till vanliga felval i vardagen.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs10",
    number: 10,
    shortCode: "K10",
    title: "Kurs 10 – MÖTESKULTUR",
    purpose: "Effektiva digitala möten med tydliga resultat.",
    color: "#f6c09a",
    image: "assets/img/tile-status.jpg",
    modules: [
      { id: "kurs10_modul01", number: 1, title: "Modul 1 – Planering av möten", purpose: "Effektiva digitala möten med tydliga resultat.", video: "video/kurs10_modul1.mp4", content: ["Introduktion till planering av möten.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs10_modul02", number: 2, title: "Modul 2 – Agenda och förväntningar", purpose: "Effektiva digitala möten med tydliga resultat.", video: "video/kurs10_modul2.mp4", content: ["Introduktion till agenda och förväntningar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs10_modul03", number: 3, title: "Modul 3 – Beslut och uppföljning", purpose: "Effektiva digitala möten med tydliga resultat.", video: "video/kurs10_modul3.mp4", content: ["Introduktion till beslut och uppföljning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs10_modul04", number: 4, title: "Modul 4 – Asynkront arbete i Teams", purpose: "Effektiva digitala möten med tydliga resultat.", video: "video/kurs10_modul4.mp4", content: ["Introduktion till asynkront arbete i Teams.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs10_modul05", number: 5, title: "Modul 5 – Mötesetikett", purpose: "Effektiva digitala möten med tydliga resultat.", video: "video/kurs10_modul5.mp4", content: ["Introduktion till mötesetikett.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs11",
    number: 11,
    shortCode: "K11",
    title: "Kurs 11 – FRÅN CHATT TILL STRUKTUR",
    purpose: "Göra kunskap beständig och återanvändbar.",
    color: "#a6dcd4",
    image: "assets/img/tile-mandatory.jpg",
    modules: [
      { id: "kurs11_modul01", number: 1, title: "Modul 1 – Varför chatt inte är arkiv", purpose: "Göra kunskap beständig och återanvändbar.", video: "video/kurs11_modul1.mp4", content: ["Introduktion till varför chatt inte är arkiv.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs11_modul02", number: 2, title: "Modul 2 – Fånga beslut ur dialog", purpose: "Göra kunskap beständig och återanvändbar.", video: "video/kurs11_modul2.mp4", content: ["Introduktion till att fånga beslut ur dialog.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs11_modul03", number: 3, title: "Modul 3 – Skapa struktur av arbetsmaterial", purpose: "Göra kunskap beständig och återanvändbar.", video: "video/kurs11_modul3.mp4", content: ["Introduktion till att skapa struktur av arbetsmaterial.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs11_modul04", number: 4, title: "Modul 4 – Dela rätt – inte allt", purpose: "Göra kunskap beständig och återanvändbar.", video: "video/kurs11_modul4.mp4", content: ["Introduktion till att dela rätt – inte allt.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs11_modul05", number: 5, title: "Modul 5 – Från brus till verksamhetsnytta", purpose: "Göra kunskap beständig och återanvändbar.", video: "video/kurs11_modul5.mp4", content: ["Introduktion till från brus till verksamhetsnytta.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs12",
    number: 12,
    shortCode: "K12",
    title: "Kurs 12 – DIARIEFÖRING",
    purpose: "Korrekt hantering av allmänna handlingar och dokument.",
    color: "#c9d9a6",
    image: "assets/img/tile-edu.jpg",
    modules: [
      { id: "kurs12_modul01", number: 1, title: "Modul 1 – Vad som ska diarieföras", purpose: "Korrekt hantering av allmänna handlingar och dokument.", video: "video/kurs12_modul1.mp4", content: ["Introduktion till vad som ska diarieföras.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs12_modul02", number: 2, title: "Modul 2 – Dokument och ärenden", purpose: "Korrekt hantering av allmänna handlingar och dokument.", video: "video/kurs12_modul2.mp4", content: ["Introduktion till dokument och ärenden.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs12_modul03", number: 3, title: "Modul 3 – Arkivering i praktiken", purpose: "Korrekt hantering av allmänna handlingar och dokument.", video: "video/kurs12_modul3.mp4", content: ["Introduktion till arkivering i praktiken.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs12_modul04", number: 4, title: "Modul 4 – Spårbarhet och kontroll", purpose: "Korrekt hantering av allmänna handlingar och dokument.", video: "video/kurs12_modul4.mp4", content: ["Introduktion till spårbarhet och kontroll.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs12_modul05", number: 5, title: "Modul 5 – Praktisk tillämpning", purpose: "Korrekt hantering av allmänna handlingar och dokument.", video: "video/kurs12_modul5.mp4", content: ["Introduktion till praktisk tillämpning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs13",
    number: 13,
    shortCode: "K13",
    title: "Kurs 13 – GOVERNANCE",
    purpose: "Styrning, struktur och uppföljning i M365.",
    color: "#d4c6f4",
    image: "assets/img/tile-atlas.jpg",
    modules: [
      { id: "kurs13_modul01", number: 1, title: "Modul 1 – Vad governance innebär", purpose: "Styrning, struktur och uppföljning i M365.", video: "video/kurs13_modul1.mp4", content: ["Introduktion till vad governance innebär.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs13_modul02", number: 2, title: "Modul 2 – Roller och ansvar", purpose: "Styrning, struktur och uppföljning i M365.", video: "video/kurs13_modul2.mp4", content: ["Introduktion till roller och ansvar.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs13_modul03", number: 3, title: "Modul 3 – Livscykel för team och innehåll", purpose: "Styrning, struktur och uppföljning i M365.", video: "video/kurs13_modul3.mp4", content: ["Introduktion till livscykel för team och innehåll.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs13_modul04", number: 4, title: "Modul 4 – Uppföljning och kontroll", purpose: "Styrning, struktur och uppföljning i M365.", video: "video/kurs13_modul4.mp4", content: ["Introduktion till uppföljning och kontroll.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs13_modul05", number: 5, title: "Modul 5 – Lokal tillämpning", purpose: "Styrning, struktur och uppföljning i M365.", video: "video/kurs13_modul5.mp4", content: ["Introduktion till lokal tillämpning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs14",
    number: 14,
    shortCode: "K14",
    title: "Kurs 14 – LIVSCYKEL",
    purpose: "Informationshantering genom hela livscykeln.",
    color: "#b7e1cd",
    image: "assets/img/tile-hrkollegan.jpg",
    modules: [
      { id: "kurs14_modul01", number: 1, title: "Modul 1 – Skapande och mottagande", purpose: "Informationshantering genom hela livscykeln.", video: "video/kurs14_modul1.mp4", content: ["Introduktion till skapande och mottagande.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs14_modul02", number: 2, title: "Modul 2 – Aktiv användning", purpose: "Informationshantering genom hela livscykeln.", video: "video/kurs14_modul2.mp4", content: ["Introduktion till aktiv användning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs14_modul03", number: 3, title: "Modul 3 – Bevarande och gallring", purpose: "Informationshantering genom hela livscykeln.", video: "video/kurs14_modul3.mp4", content: ["Introduktion till bevarande och gallring.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs14_modul04", number: 4, title: "Modul 4 – Övergång till arkiv", purpose: "Informationshantering genom hela livscykeln.", video: "video/kurs14_modul4.mp4", content: ["Introduktion till övergång till arkiv.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs14_modul05", number: 5, title: "Modul 5 – Vanliga risker och fel", purpose: "Informationshantering genom hela livscykeln.", video: "video/kurs14_modul5.mp4", content: ["Introduktion till vanliga risker och fel.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  },
  {
    id: "kurs15",
    number: 15,
    shortCode: "K15",
    title: "Kurs 15 – PROCESSARBETE",
    purpose: "Processbaserat arbetssätt i digital miljö.",
    color: "#a8ddd3",
    image: "assets/img/tile-chief.jpg",
    modules: [
      { id: "kurs15_modul01", number: 1, title: "Modul 1 – Vad processbaserat arbete innebär", purpose: "Processbaserat arbetssätt i digital miljö.", video: "video/kurs15_modul1.mp4", content: ["Introduktion till vad processbaserat arbete innebär.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs15_modul02", number: 2, title: "Modul 2 – Kartläggning av arbetsflöden", purpose: "Processbaserat arbetssätt i digital miljö.", video: "video/kurs15_modul2.mp4", content: ["Introduktion till kartläggning av arbetsflöden.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs15_modul03", number: 3, title: "Modul 3 – Koppling till M365", purpose: "Processbaserat arbetssätt i digital miljö.", video: "video/kurs15_modul3.mp4", content: ["Introduktion till koppling till M365.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs15_modul04", number: 4, title: "Modul 4 – Roller, ansvar och uppföljning", purpose: "Processbaserat arbetssätt i digital miljö.", video: "video/kurs15_modul4.mp4", content: ["Introduktion till roller, ansvar och uppföljning.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] },
      { id: "kurs15_modul05", number: 5, title: "Modul 5 – Praktiska verksamhetsexempel", purpose: "Processbaserat arbetssätt i digital miljö.", video: "video/kurs15_modul5.mp4", content: ["Introduktion till praktiska verksamhetsexempel.", "Arbetssätt och struktur i praktiken.", "Vanliga fel, risker och rekommenderade arbetssätt."] }
    ]
  }
];

/* ---------------------------------------------------------
   3. HJÄLPFUNKTIONER
--------------------------------------------------------- */
function getCourse(courseId) {
  return COURSES.find(c => c.id === courseId) || null;
}

function getModule(courseId, moduleId) {
  const c = getCourse(courseId);
  return c ? c.modules.find(m => m.id === moduleId) || null : null;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function progressKey(courseId, moduleId) {
  return `tff_progress_${courseId}_${moduleId}`;
}

function setModuleProgress(courseId, moduleId, data) {
  localStorage.setItem(progressKey(courseId, moduleId), JSON.stringify(data));
}

function getModuleProgress(courseId, moduleId) {
  const raw = localStorage.getItem(progressKey(courseId, moduleId));
  return raw ? JSON.parse(raw) : null;
}

function isModulePassed(courseId, moduleId) {
  const p = getModuleProgress(courseId, moduleId);
  return !!(p && p.passed === true);
}

function isModuleUnlocked(courseId, moduleId) {
  const course = getCourse(courseId);
  if (!course) return false;

  const index = course.modules.findIndex(m => m.id === moduleId);
  if (index === -1) return false;
  if (index === 0) return true;

  const prev = course.modules[index - 1];
  return isModulePassed(courseId, prev.id);
}

function getCourseCompletion(courseId) {
  const course = getCourse(courseId);
  if (!course) return { passed: 0, total: 0, percent: 0 };

  const total = course.modules.length;
  const passed = course.modules.filter(m => isModulePassed(courseId, m.id)).length;
  const percent = total ? Math.round((passed / total) * 100) : 0;
  return { passed, total, percent };
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

/* ---------------------------------------------------------
   4. FRÅGEGENERATOR – 10 frågor per modul
--------------------------------------------------------- */
function shuffleOptionsKeepCorrect(options, correctIndex) {
  const pairs = options.map((text, idx) => ({
    text,
    isCorrect: idx === correctIndex
  }));

  // Enkel deterministisk mixning baserat på textlängder
  pairs.sort((a, b) => (a.text.length % 7) - (b.text.length % 7));

  return {
    options: pairs.map(p => p.text),
    correct: pairs.findIndex(p => p.isCorrect)
  };
}

function buildQuestionSet(moduleTitle, courseTitle, modulePurpose) {
  const raw = [
    {
      question: `Vad är huvudsyftet med modulen "${moduleTitle}"?`,
      options: [modulePurpose, "Att lagra allt lokalt", "Att ersätta all dokumentation med chatt", "Att undvika gemensamma arbetssätt"],
      correct: 0
    },
    {
      question: `Vilket arbetssätt stödjer bäst kursen "${courseTitle}"?`,
      options: ["Gemensam struktur och tydliga ansvar", "Att varje person gör helt olika", "Spridd information på flera privata platser", "Att inget dokumenteras"],
      correct: 0
    },
    {
      question: `Vad är viktigt i modulen "${moduleTitle}"?`,
      options: ["Tydlighet och spårbarhet", "Otydlighet", "Slumpmässig lagring", "Att ansvar saknas"],
      correct: 0
    },
    {
      question: `Vad ska normalt undvikas i "${moduleTitle}"?`,
      options: ["Otydlig eller spridd information", "Tydlig ansvarsfördelning", "Konsekvent struktur", "Gemensamma arbetssätt"],
      correct: 0
    },
    {
      question: `Vilken effekt ger ett bra arbetssätt i "${moduleTitle}"?`,
      options: ["Mer ordning och bättre kvalitet", "Mindre sökbarhet", "Fler dubbletter", "Sämre uppföljning"],
      correct: 0
    },
    {
      question: `Vad är en vanlig risk utan struktur i "${moduleTitle}"?`,
      options: ["Tappad information", "Enklare uppföljning", "Bättre spårbarhet", "Ökad kvalitet"],
      correct: 0
    },
    {
      question: `Vad bör prioriteras i kursen "${courseTitle}"?`,
      options: ["Rätt information på rätt plats", "Privat lagring som förstahandsval", "Ad hoc-arbete", "Brist på rutiner"],
      correct: 0
    },
    {
      question: `Vad kännetecknar best practice i "${moduleTitle}"?`,
      options: ["Standardiserat arbetssätt", "Dolda beslut", "Slumpmässig hantering", "Ingen uppföljning"],
      correct: 0
    },
    {
      question: `Vad stödjer bäst verksamhetsnytta i "${moduleTitle}"?`,
      options: ["Struktur, uppföljning och tydliga ansvar", "Spridda chattar", "Otydliga versioner", "Endast muntlig information"],
      correct: 0
    },
    {
      question: `Vad är det övergripande målet i kursen "${courseTitle}"?`,
      options: ["Att skapa ordning, kvalitet och hållbara arbetssätt", "Att undvika struktur", "Att minska spårbarhet", "Att ersätta alla andra system"],
      correct: 0
    }
  ];

  return raw.map((q, idx) => {
    const mixed = shuffleOptionsKeepCorrect(q.options, q.correct);
    return {
      id: `q${String(idx + 1).padStart(2, "0")}`,
      number: idx + 1,
      question: q.question,
      options: mixed.options,
      correct: mixed.correct
    };
  });
}

function getQuestionsForModule(courseId, moduleId) {
  const course = getCourse(courseId);
  const module = getModule(courseId, moduleId);
  if (!course || !module) return [];
  return buildQuestionSet(module.title, course.title, module.purpose);
}

/* ---------------------------------------------------------
   5. RENDRING – KATALOG
--------------------------------------------------------- */
function renderCourseCatalog(containerId = "coursesGrid") {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = COURSES.map(course => {
    const progress = getCourseCompletion(course.id);
    return `
      <article class="course-card" style="border-top:6px solid ${escapeHtml(course.color)};">
        <div class="course-card__body">
          <div class="course-code">${escapeHtml(course.shortCode)}</div>
          <h3>${escapeHtml(course.title)}</h3>
          <p>${escapeHtml(course.purpose)}</p>
          <div class="progress-bar"><span style="width:${progress.percent}%"></span></div>
          <p class="progress-text">Genomfört: ${progress.passed}/${progress.total} moduler (${progress.percent}%)</p>
          <a class="btn btn-primary" href="utbildning.html?course=${encodeURIComponent(course.id)}">Öppna kurs</a>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   6. RENDRING – KURSVY
--------------------------------------------------------- */
function renderCoursePage() {
  const courseId = getQueryParam("course");
  const course = getCourse(courseId);
  if (!course) return;

  const titleEl = document.getElementById("courseTitle");
  const purposeEl = document.getElementById("coursePurpose");
  const listEl = document.getElementById("moduleList");
  const progressEl = document.getElementById("courseProgress");

  if (titleEl) titleEl.textContent = course.title;
  if (purposeEl) purposeEl.textContent = course.purpose;

  const progress = getCourseCompletion(course.id);
  if (progressEl) {
    progressEl.textContent = `Genomfört: ${progress.passed}/${progress.total} moduler (${progress.percent}%)`;
  }

  if (!listEl) return;

  listEl.innerHTML = course.modules.map(module => {
    const unlocked = isModuleUnlocked(course.id, module.id);
    const passed = isModulePassed(course.id, module.id);

    return `
      <li class="module-item ${unlocked ? "" : "locked"}">
        <div class="module-left">
          <div class="module-number">M${module.number}</div>
          <div class="module-info">
            <h4>${escapeHtml(module.title)}</h4>
            <p>${escapeHtml(module.purpose)}</p>
            <div class="status-row">
              <span class="status ${passed ? "status-passed" : unlocked ? "status-open" : "status-locked"}">
                ${passed ? "Godkänd" : unlocked ? "Öppen" : "Låst"}
              </span>
            </div>
          </div>
        </div>
        <div class="module-actions">
          ${
            unlocked
              ? `<a class="btn btn-primary" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(module.id)}">Öppna modul</a>`
              : `<button class="btn btn-disabled" disabled>Låst</button>`
          }
        </div>
      </li>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   7. RENDRING – MODULSIDA
--------------------------------------------------------- */
function renderModulePage() {
  const courseId = getQueryParam("course");
  const moduleId = getQueryParam("module");

  const course = getCourse(courseId);
  const module = getModule(courseId, moduleId);

  if (!course || !module) {
    document.body.innerHTML = `
      <main class="container">
        <h1>Kurs eller modul hittades inte</h1>
        <p>Kontrollera länken och försök igen.</p>
      </main>
    `;
    return;
  }

  if (!isModuleUnlocked(course.id, module.id)) {
    document.body.innerHTML = `
      <main class="container">
        <h1>Modulen är låst</h1>
        <p>Du måste klara föregående modul innan du kan öppna denna.</p>
        <p><a class="btn btn-primary" href="utbildning.html?course=${encodeURIComponent(course.id)}">Tillbaka till kursen</a></p>
      </main>
    `;
    return;
  }

  const titleEl = document.getElementById("moduleTitle");
  const subtitleEl = document.getElementById("moduleSubtitle");
  const bulletsEl = document.getElementById("moduleBullets");
  const videoEl = document.getElementById("videoContainer");
  const quizEl = document.getElementById("quizContainer");

  if (titleEl) titleEl.textContent = module.title;
  if (subtitleEl) subtitleEl.textContent = `${course.title} – ${module.purpose}`;

  if (bulletsEl) {
    bulletsEl.innerHTML = module.content.map(x => `<li>${escapeHtml(x)}</li>`).join("");
  }

  if (videoEl) {
    const url = getVideoUrl(module);
    if (url.includes("embed=1")) {
      videoEl.innerHTML = `
        <iframe src="${escapeHtml(url)}" width="100%" height="420" frameborder="0" allowfullscreen loading="lazy"></iframe>
      `;
    } else {
      videoEl.innerHTML = `
        <video controls preload="metadata" width="100%">
          <source src="${escapeHtml(url)}" type="video/mp4">
          Din webbläsare stödjer inte video.
        </video>
      `;
    }
  }

  if (quizEl) renderQuiz(course.id, module.id, quizEl);

  const prev = getPrevModule(course.id, module.id);
  const next = getNextModule(course.id, module.id);

  const navEl = document.getElementById("moduleNav");
  if (navEl) {
    navEl.innerHTML = `
      <div class="module-nav-buttons">
        ${
          prev
            ? `<a class="btn btn-secondary" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(prev.id)}">← Föregående modul</a>`
            : `<span></span>`
        }
        <a class="btn btn-outline" href="utbildning.html?course=${encodeURIComponent(course.id)}">Till kursen</a>
        ${
          next && isModuleUnlocked(course.id, next.id)
            ? `<a class="btn btn-secondary" href="kurs_dokumentation.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(next.id)}">Nästa modul →</a>`
            : `<span></span>`
        }
      </div>
    `;
  }
}

function getPrevModule(courseId, moduleId) {
  const course = getCourse(courseId);
  if (!course) return null;
  const index = course.modules.findIndex(m => m.id === moduleId);
  return index > 0 ? course.modules[index - 1] : null;
}

function getNextModule(courseId, moduleId) {
  const course = getCourse(courseId);
  if (!course) return null;
  const index = course.modules.findIndex(m => m.id === moduleId);
  return index >= 0 && index < course.modules.length - 1 ? course.modules[index + 1] : null;
}

/* ---------------------------------------------------------
   8. QUIZ
--------------------------------------------------------- */
function renderQuiz(courseId, moduleId, containerEl) {
  const questions = getQuestionsForModule(courseId, moduleId);

  containerEl.innerHTML = `
    <form id="quizForm" class="quiz-form">
      ${questions.map(q => `
        <fieldset class="quiz-question">
          <legend><strong>Fråga ${q.number}:</strong> ${escapeHtml(q.question)}</legend>
          ${q.options.map((opt, i) => `
            <label class="quiz-option">
              <input type="radio" name="${escapeHtml(q.id)}" value="${i}">
              <span>${escapeHtml(opt)}</span>
            </label>
          `).join("")}
        </fieldset>
      `).join("")}

      <div class="quiz-actions">
        <button type="button" class="btn btn-primary" id="checkQuizBtn">Kontrollera svar</button>
      </div>

      <div id="quizResult"></div>
    </form>
  `;

  const btn = document.getElementById("checkQuizBtn");
  if (btn) {
    btn.addEventListener("click", () => checkQuiz(courseId, moduleId));
  }
}

function checkQuiz(courseId, moduleId) {
  const questions = getQuestionsForModule(courseId, moduleId);
  const resultEl = document.getElementById("quizResult");
  if (!resultEl) return;

  let score = 0;
  let answered = 0;

  questions.forEach(q => {
    const selected = document.querySelector(`input[name="${q.id}"]:checked`);
    if (selected) {
      answered++;
      if (Number(selected.value) === q.correct) score++;
    }
  });

  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= PASS_PERCENT;

  setModuleProgress(courseId, moduleId, {
    score,
    total: questions.length,
    percent,
    passed,
    answeredAt: new Date().toISOString()
  });

  const next = getNextModule(courseId, moduleId);

  resultEl.innerHTML = `
    <div class="quiz-result ${passed ? "passed" : "failed"}">
      <p><strong>Resultat:</strong> ${score} av ${questions.length} rätt (${percent}%)</p>
      <p><strong>Krav för godkänt:</strong> ${PASS_PERCENT}%</p>
      <p><strong>Status:</strong> ${passed ? "Godkänd" : "Inte godkänd"}</p>
      <p><strong>Besvarade frågor:</strong> ${answered} av ${questions.length}</p>
      ${
        passed
          ? `<p>Modulen är godkänd och nästa modul låses upp.</p>`
          : `<p>Du behöver minst ${PASS_PERCENT}% för att låsa upp nästa modul.</p>`
      }

      <div class="result-actions">
        <a class="btn btn-secondary" href="utbildning.html?course=${encodeURIComponent(courseId)}">Tillbaka till kursen</a>
        ${
          passed && next
            ? `<a class="btn btn-primary" href="kurs_dokumentation.html?course=${encodeURIComponent(courseId)}&module=${encodeURIComponent(next.id)}">Gå till nästa modul</a>`
            : ``
        }
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   9. VERKTYG
--------------------------------------------------------- */
function resetAllProgress() {
  COURSES.forEach(course => {
    course.modules.forEach(module => {
      localStorage.removeItem(progressKey(course.id, module.id));
    });
  });
  alert("All progression är rensad.");
}

/* ---------------------------------------------------------
   10. AUTO-INIT
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("coursesGrid")) renderCourseCatalog("coursesGrid");
  if (document.getElementById("moduleList")) renderCoursePage();
  if (document.getElementById("quizContainer")) renderModulePage();
});
