const kurserData = [
  {
    id: "kurs1",
    title: "Kurs 1 – MICROSOFT TEAMS - GRUND & ARBETSSÄTT",
    description: "Rätt användning av Teams i vardagsarbetet.",
    image: "assets/img/tile-mandatory.jpg",
    color: "#82c7b8",
    active: true,

    modules: [
      {
        id: "k1m1",
        title: "Modul 1 – Vad är Teams (och vad är det inte)",
        purpose: "Skapa en gemensam grundförståelse för vad Teams är och hur det ska användas i arbetet.",
        video: "https://halmstad.sharepoint.com/sites/TestavTeammedbibliotek/Delade%20dokument/Kurser/Kurs%201%20%E2%80%93%20MICROSOFT%20TEAMS%20-%20GRUND%20%26%20ARBETSS%C3%84T/Modul%201%20Vad%20%C3%A4r%20Teams%20(och%20vad%20%C3%A4r%20det%20inte).mp4?download=1",

        questions: [
          {
            q: "Vad är Microsoft Teams i första hand?",
            options: [
              "Ett e-postsystem",
              "En samarbetsyta för kommunikation och dokument",
              "Ett personligt anteckningsverktyg",
              "Ett rent arkivsystem"
            ],
            correct: 1
          },
          {
            q: "Vad är Teams inte avsett för?",
            options: [
              "Samarbete i grupp",
              "Möten och chatt",
              "Långsiktig personlig lagring",
              "Samredigering av filer"
            ],
            correct: 2
          },
          {
            q: "Vad skapas automatiskt när ett Team skapas?",
            options: [
              "En SharePoint-webbplats",
              "Ett nytt privat mejlkonto",
              "En lokal mapp på datorn",
              "En separat mobilapp"
            ],
            correct: 0
          },
          {
            q: "Varför ska arbete som flera behöver tillgång till ske i Teams?",
            options: [
              "För att få fler färger i dokument",
              "För att minska personberoende",
              "För att slippa versioner",
              "För att Teams ersätter alla andra system"
            ],
            correct: 1
          },
          {
            q: "Vem äger informationen i ett Team?",
            options: [
              "Den som senast ändrade filen",
              "Microsoft",
              "Organisationen via Teamet",
              "Den första medlemmen"
            ],
            correct: 2
          },
          {
            q: "Vad är en risk med att arbeta utanför Teams när flera ska samarbeta?",
            options: [
              "För mycket struktur",
              "Informationsförlust och versionsproblem",
              "Automatiskt bättre säkerhet",
              "Färre notifieringar"
            ],
            correct: 1
          },
          {
            q: "Teams används främst för att ersätta vilket arbetssätt?",
            options: [
              "Bara telefonsamtal",
              "Bara fysiska möten",
              "Ostrukturerad e-post och lokala mappar",
              "Diarieföring"
            ],
            correct: 2
          },
          {
            q: "Vad är grundtanken med Teams?",
            options: [
              "Gemensamt arbete på rätt plats",
              "Allt ska vara privat",
              "Allt ska vara temporärt",
              "Endast kommunikation"
            ],
            correct: 0
          },
          {
            q: "Vilket påstående är korrekt?",
            options: [
