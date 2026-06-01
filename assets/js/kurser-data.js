const kurserData = [
  {
    id: "kurs1",
    title: "Kurs 1 - MICROSOFT TEAMS",
    description: "Rätt användning av Teams i vardagsarbetet",
    image: "assets/img/tile-edu.jpg",

    modules: [
      {
        id: "m1",
        title: "Vad är Teams",
        video: "https://yourtenant.sharepoint.com/.../teams1.mp4",

        questions: [
          {
            q: "Vad är Teams?",
            options: [
              "En chattplattform",
              "Ett samarbetsverktyg",
              "Ett mailprogram",
              "Ett dokumentarkiv"
            ],
            correct: 1
          },
          {
            q: "Vad används Teams till?",
            options: [
              "Spela spel",
              "Kommunikation och samarbete",
              "Endast lagring",
              "Endast möten"
            ],
            correct: 1
          }
        ]
      },

      {
        id: "m2",
        title: "Chat och kanaler",
        video: "https://yourtenant.sharepoint.com/.../teams2.mp4",

        questions: [
          {
            q: "Vad är en kanal?",
            options: [
              "Ett möte",
              "En grupp i Teams",
              "En struktur för samarbete",
              "En fil"
            ],
            correct: 2
          }
        ]
      }
    ]
  }
];
``
