const courses = [

/* ---------------- KURS 1 ---------------- */
{
id:1,
title:"Kurs 1 – MICROSOFT TEAMS",
color:"#82c7b8",
modules:createModules("Teams")
},

/* ---------------- KURS 2 ---------------- */
{
id:2,
title:"Kurs 2 – TRANSKRIBERING",
color:"#a7d8f5",
modules:createModules("Transkribering")
},

/* ---------------- KURS 3 ---------------- */
{
id:3,
title:"Kurs 3 – DOKUMENTATION",
color:"#f3c9a9",
modules:createModules("Dokumentation")
},

/* ---------------- KURS 4 ---------------- */
{
id:4,
title:"Kurs 4 – AI & COPILOT",
color:"#9fd8cf",
modules:createModules("AI")
},

/* ---------------- KURS 5 ---------------- */
{
id:5,
title:"Kurs 5 – PROMPTNING",
color:"#eab3b3",
modules:createModules("Prompt")
},

/* ---------------- KURS 6 ---------------- */
{
id:6,
title:"Kurs 6 – DOKUMENT",
color:"#c9b8e4",
modules:createModules("Dokument")
},

/* ---------------- KURS 7 ---------------- */
{
id:7,
title:"Kurs 7 – TEAMS & SHAREPOINT",
color:"#f3b6c6",
modules:createModules("SharePoint")
},

/* ---------------- KURS 8 ---------------- */
{
id:8,
title:"Kurs 8 – GDPR",
color:"#f4c2c2",
modules:createModules("GDPR")
},

/* ---------------- KURS 9 ---------------- */
{
id:9,
title:"Kurs 9 – RÄTT VERKTYG",
color:"#d9c1e8",
modules:createModules("Verktyg")
},

/* ---------------- KURS 10 ---------------- */
{
id:10,
title:"Kurs 10 – MÖTESKULTUR",
color:"#f6c09a",
modules:createModules("Möten")
},

/* ---------------- KURS 11 ---------------- */
{
id:11,
title:"Kurs 11 – FRÅN CHATT TILL STRUKTUR",
color:"#a6dcd4",
modules:createModules("Struktur")
},

/* ---------------- KURS 12 ---------------- */
{
id:12,
title:"Kurs 12 – DIARIEFÖRING",
color:"#c9d9a6",
modules:createModules("Diarie")
},

/* ---------------- KURS 13 ---------------- */
{
id:13,
title:"Kurs 13 – GOVERNANCE",
color:"#d4c6f4",
modules:createModules("Governance")
},

/* ---------------- KURS 14 ---------------- */
{
id:14,
title:"Kurs 14 – LIVSCYKEL",
color:"#b7e1cd",
modules:createModules("Livscykel")
},

/* ---------------- KURS 15 ---------------- */
{
id:15,
title:"Kurs 15 – PROCESSARBETE",
color:"#a8ddd3",
modules:createModules("Process")
}

];


/* ================================================= */
/* GENERATOR FÖR 5 MODULER PER KURS */
/* ================================================= */
function createModules(name){

return [
createModule(1, name),
createModule(2, name),
createModule(3, name),
createModule(4, name),
createModule(5, name)
];

}


/* ================================================= */
/* GENERATOR FÖR MODUL */
/* ================================================= */
function createModule(id, name){

return {
id: id,
title: "Modul " + id + " – " + name,
content: [
"Introduktion till " + name,
"Arbetssätt",
"Viktiga regler"
],
questions: createQuestions(name)
};

}


/* ================================================= */
/* 10 FRÅGOR PER MODUL */
/* ================================================= */
function createQuestions(name){

return [
{q:"Vad är syftet med " + name + "?", options:["Rätt arbetssätt","Fel arbetssätt","Ingen struktur","Slump"], correct:0},
{q:"Vad är viktigt?", options:["Struktur","Kaos","Mail","Slump"], correct:0},
{q:"Vad ska undvikas?", options:["Struktur","Otydlighet","Dokument","System"], correct:1},
{q:"Vad ger kvalitet?", options:["Ordning","Kaos","Mail","Chat"], correct:0},
{q:"Vad är fel?", options:["Spridd info","Struktur","Ordning","Process"], correct:0},
{q:"Vad gör systemet?", options:["Stödjer arbete","Stoppar arbete","Tar bort data","Ignorerar"], correct:0},
{q:"Var sparas info?", options:["Rätt plats","Fel plats","Ingenstans","Chatt"], correct:0},
{q:"Vad skapar risk?", options:["Otydlighet","Struktur","Plan","System"], correct:0},
{q:"Vad är best practice?", options:["Standard","Slump","Ingen rutin","Ad hoc"], correct:0},
{q:"Vad är resultat?", options:["Ordning","Kaos","Mail","Inget"], correct:0}
];

}
