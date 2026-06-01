const courses = [
{
  id: 11,
  title: "Kurs 11 – FRÅN CHATT TILL STRUKTUR",
  purpose: "Göra kunskap beständig och återanvändbar.",
  color: "#a6dcd4",

  modules: [
    {
      id: 1,
      title: "Modul 1 – Varför chatt inte är arkiv",
      content: ["Varför chatt inte är arkiv","Risker","Struktur"],

      questions: [
        {q:"Vad är problemet?", options:["A","B","C","D"], correct:1},
        {q:"Vad ska göras?", options:["A","B","C","D"], correct:0},
        {q:"Var sparas info?", options:["A","B","C","D"], correct:2},
        {q:"Risk?", options:["A","B","C","D"], correct:3},
        {q:"Syfte?", options:["A","B","C","D"], correct:0},
        {q:"Fel arbetssätt?", options:["A","B","C","D"], correct:2},
        {q:"Rätt metod?", options:["A","B","C","D"], correct:1},
        {q:"Varför struktur?", options:["A","B","C","D"], correct:0},
        {q:"Vad saknas annars?", options:["A","B","C","D"], correct:2},
        {q:"Effekt?", options:["A","B","C","D"], correct:1}
      ]
    },

    {
      id: 2,
      title: "Modul 2 – Fånga beslut",
      content: ["Beslut","Dokumentation","Spårbarhet"],
      questions: new Array(10).fill({q:"Exempel fråga", options:["A","B","C","D"], correct:1})
    },

    {
      id: 3,
      title: "Modul 3 – Skapa struktur",
      content: ["Struktur","Ordning"],
      questions: new Array(10).fill({q:"Exempel fråga", options:["A","B","C","D"], correct:1})
    },

    {
      id: 4,
      title: "Modul 4 – Dela rätt",
      content: ["Behörighet","Säkerhet"],
      questions: new Array(10).fill({q:"Exempel fråga", options:["A","B","C","D"], correct:1})
    },

    {
      id: 5,
      title: "Modul 5 – Nytta",
      content: ["Effekt","Verksamhetsnytta"],
      questions: new Array(10).fill({q:"Exempel fråga", options:["A","B","C","D"], correct:1})
    }
  ]
}
];
