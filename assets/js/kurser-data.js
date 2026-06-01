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
              "Teams lagrar alla filer lokalt på användarens dator",
              "Teams är en ingång till SharePoint för filer",
              "Teams ersätter alla verksamhetssystem",
              "Teams är endast ett chattverktyg"
            ],
            correct: 1
          },
          {
            q: "Modul 1 syftar främst till att:",
            options: [
              "Lära klickvägar i detalj",
              "Träna mötesbokning",
              "Skapa grundförståelse",
              "Förklara endast versionering"
            ],
            correct: 2
          }
        ]
      },

      {
        id: "k1m2",
        title: "Modul 2 – Chat, kanal och möte – rätt val",
        purpose: "Förstå grundval av kommunikationssätt i Teams och när chat, kanal eller möte ska användas.",
        video: "https://halmstad.sharepoint.com/sites/TestavTeammedbibliotek/Delade%20dokument/Kurser/Kurs%201%20%E2%80%93%20MICROSOFT%20TEAMS%20-%20GRUND%20%26%20ARBETSS%C3%84T/Modul%202%20Chat,%20kanal%20och%20m%C3%B6te%20%E2%80%93%20r%C3%A4tt%20val.mp4?download=1",

        questions: [
          {
            q: "När används chatt bäst i Teams?",
            options: [
              "För korta, snabba avstämningar mellan få personer",
              "För långsiktig gemensam dokumentation",
              "För formella beslut som alla ska hitta senare",
              "För central lagring av filer"
            ],
            correct: 0
          },
          {
            q: "Vad är en kanal i Teams främst till för?",
            options: [
              "Privata enskilda meddelanden",
              "Strukturerat samarbete för en grupp kring ett ämne",
              "Endast videomöten",
              "Personlig att-göra-lista"
            ],
            correct: 1
          },
          {
            q: "När är kanal bättre än chatt?",
            options: [
              "När information ska vara gemensam och möjlig att hitta senare",
              "När bara två personer ska prata privat",
              "När man bara vill testa något tillfälligt",
              "När man vill undvika struktur"
            ],
            correct: 0
          },
          {
            q: "När behövs ett möte i stället för chatt eller kanal?",
            options: [
              "När frågan kräver dialog, beslut eller gemensam genomgång",
              "När man vill lagra ett dokument",
              "När man inte vill att andra ska se information",
              "När man vill slippa agenda"
            ],
            correct: 0
          },
          {
            q: "Vad är en vanlig risk med att använda chatt för fel typ av information?",
            options: [
              "Information blir svårare att återfinna och följa upp",
              "Filer får automatiskt bättre struktur",
              "Beslut blir tydligare",
              "Behörigheter blir enklare"
            ],
            correct: 0
          },
          {
            q: "Hur bör viktig gemensam information spridas?",
            options: [
              "I privat chatt mellan två personer",
              "I kanal där rätt grupp har tillgång",
              "I sms utanför Teams",
              "I personliga anteckningar"
            ],
            correct: 1
          },
          {
            q: "Vad kännetecknar en privat chatt?",
            options: [
              "Den är bäst för gemensam långtidsdokumentation",
              "Den ersätter kanalstruktur helt",
              "Den passar begränsad kommunikation mellan få personer",
              "Den är alltid offentlig för hela teamet"
            ],
            correct: 2
          },
          {
            q: "När är Teams bättre än e-post?",
            options: [
              "När flera ska samarbeta löpande kring samma innehåll",
              "När man vill skapa fler bilagor och duplicera filer",
              "När informationen inte ska delas",
              "När ingen annan behöver se historiken"
            ],
            correct: 0
          },
          {
            q: "Vad är en viktig skillnad mellan kanal och chatt?",
            options: [
              "Kanal är för strukturerat grupparbete, chatt för snabbare direktdialog",
              "Chatt sparas i SharePoint men kanal sparas inte",
              "Kanal kan inte innehålla filer",
              "Chatt är alltid bättre för beslut"
            ],
            correct: 0
          },
          {
            q: "Vilket är ett vanligt fel arbetssätt?",
            options: [
              "Att välja kommunikationssätt efter syfte och mottagare",
              "Att lägga gemensam viktig information i privat chatt",
              "Att använda kanal för återkommande samarbete",
              "Att kalla till möte när dialog behövs"
            ],
            correct: 1
          }
        ]
      },

      {
        id: "k1m3",
        title: "Modul 3 – Möten i Teams – roller & praxis",
        purpose: "Förstå mötets struktur, roller, agenda, beslut och uppföljning i Teams.",
        video: "https://halmstad.sharepoint.com/sites/TestavTeammedbibliotek/Delade%20dokument/Kurser/Kurs%201%20%E2%80%93%20MICROSOFT%20TEAMS%20-%20GRUND%20%26%20ARBETSS%C3%84T/Modul%203%20M%C3%B6ten%20i%20Teams%20%E2%80%93%20roller%20%26%20praxis.mp4?download=1",

        questions: [
          {
            q: "Vad är organisatörens huvudansvar i ett Teams-möte?",
            options: [
              "Att bara skicka en länk utan sammanhang",
              "Att sätta syfte, deltagare och struktur för mötet",
              "Att skriva alla deltagarnas anteckningar",
              "Att alltid dela hela sin skärm"
            ],
            correct: 1
          },
          {
            q: "Vad förväntas av deltagare i ett välfungerande möte?",
            options: [
              "Att vara förberedda och bidra utifrån syftet",
              "Att undvika frågor",
              "Att spara all dokumentation lokalt",
              "Att lämna mötet utan uppföljning"
            ],
            correct: 0
          },
          {
            q: "När ska möte normalt inte bokas?",
            options: [
              "När frågan kan lösas enklare via kanal eller kort avstämning",
              "När flera behöver fatta beslut",
              "När en genomgång krävs",
              "När roller behöver tydliggöras"
            ],
            correct: 0
          },
          {
            q: "Vad behövs före ett möte för att öka kvaliteten?",
            options: [
              "En tydlig agenda och syfte",
              "Så många deltagare som möjligt",
              "Att ingen får underlag i förväg",
              "Att allt sker improviserat"
            ],
            correct: 0
          },
          {
            q: "Vad bör dokumenteras under eller efter mötet?",
            options: [
              "Endast småprat i början",
              "Beslut, ansvar och nästa steg",
              "Bara vilka som loggade in först",
              "Ingenting om mötet var kort"
            ],
            correct: 1
          },
          {
            q: "Vad är en agenda?",
            options: [
              "En teknisk inställning i Teams",
              "En lista över mötets syfte och punkter",
              "En privat chatt mellan två personer",
              "En mapp i SharePoint"
            ],
            correct: 1
          },
          {
            q: "Hur bör beslut hanteras i ett möte?",
            options: [
              "De ska vara tydliga och gå att följa upp",
              "De ska lämnas muntliga utan spårbarhet",
              "De ska bara finnas i enskilda anteckningar",
              "De ska undvikas i Teams"
            ],
            correct: 0
          },
          {
            q: "Vad innebär uppföljning efter möte?",
            options: [
              "Att man bokar ett nytt möte direkt oavsett behov",
              "Att ansvar, aktiviteter och beslut följs upp",
              "Att alla filer flyttas till lokal dator",
              "Att mötet raderas"
            ],
            correct: 1
          },
          {
            q: "Vad menas med roller i ett möte?",
            options: [
              "Att alla gör exakt samma sak",
              "Att endast chefen får prata",
              "Att olika deltagare har olika ansvar och funktion",
              "Att alla måste presentera"
            ],
            correct: 2
          },
          {
            q: "Vilket är ett vanligt mötesfel?",
            options: [
              "Tydligt syfte och tydligt avslut",
              "Ingen agenda och oklart nästa steg",
              "Dokumenterade beslut",
              "Rätt deltagare i mötet"
            ],
            correct: 1
          }
        ]
      },

      {
        id: "k1m4",
        title: "Modul 4 – Filer i Teams (SharePoint i bakgrunden)",
        purpose: "Förstå grundläggande filhantering i Teams och hur SharePoint fungerar i bakgrunden.",
        video: "https://halmstad.sharepoint.com/sites/TestavTeammedbibliotek/Delade%20dokument/Kurser/Kurs%201%20%E2%80%93%20MICROSOFT%20TEAMS%20-%20GRUND%20%26%20ARBETSS%C3%84T/Modul%204%20Filer%20i%20Teams%20(SharePoint%20i%20bakgrunden).mp4?download=1",

        questions: [
          {
            q: "Var lagras filer som delas i en Teams-kanal?",
            options: [
              "På användarens lokala hårddisk",
              "I SharePoint kopplat till teamet",
              "I Outlook",
              "I en privat chatt automatiskt"
            ],
            correct: 1
          },
          {
            q: "Vad är SharePoint i relation till Teams-filer?",
            options: [
              "Det bakomliggande dokumentlagret",
              "Ett separat videomötesverktyg",
              "Enbart ett arkiv utanför Teams",
              "En lokal mappstruktur"
            ],
            correct: 0
          },
          {
            q: "Varför bör gemensamma filer inte sparas lokalt som huvudlösning?",
            options: [
              "För att lokal lagring minskar spårbarhet och samarbete",
              "För att lokala filer alltid blir offentliga",
              "För att inga filer kan öppnas lokalt",
              "För att Teams blockerar Word-filer"
            ],
            correct: 0
          },
          {
            q: "Vad menas med versioner av ett dokument?",
            options: [
              "Olika färgteman i filen",
              "Sparade historiska ändringar av samma fil",
              "Antalet deltagare som öppnat filen",
              "Att varje användare får en egen permanent kopia"
            ],
            correct: 1
          },
          {
            q: "Hur undviks dubbletter bäst i samarbete?",
            options: [
              "Genom att flera arbetar i samma gemensamma fil",
              "Genom att skicka nya bilagor varje gång",
              "Genom att spara lokalt först och dela senare",
              "Genom att skapa kopior för varje person"
            ],
            correct: 0
          },
          {
            q: "Vad händer ofta när filer delas fel väg i chatt eller e-post?",
            options: [
              "Det blir automatiskt bättre struktur",
              "Risken för parallella kopior och oklar senaste version ökar",
              "SharePoint slutar fungera",
              "Alla behörigheter försvinner"
            ],
            correct: 1
          },
          {
            q: "När är kanal kopplad till filer särskilt viktig?",
            options: [
              "När arbetet är gemensamt och ska vara sökbart för gruppen",
              "När ingen annan ska hitta dokumentet",
              "När filen bara är privat",
              "När man vill undvika metadata"
            ],
            correct: 0
          },
          {
            q: "Vilket är ett vanligt fel i filhantering?",
            options: [
              "Att jobba i samma gemensamma dokument",
              "Att skapa många lokala kopior och skicka runt dem",
              "Att använda versionering",
              "Att lagra filer i rätt team"
            ],
            correct: 1
          },
          {
            q: "Hur hittar man enklast rätt filer i Teams?",
            options: [
              "Genom tydlig struktur, rätt kanal och gemensam plats",
              "Genom att fråga i privat chatt varje gång",
              "Genom att spara allt på skrivbordet",
              "Genom att undvika kanalstruktur"
            ],
            correct: 0
          },
          {
            q: "Vad är rätt arbetssätt för gemensamma dokument?",
            options: [
              "Spara lokalt först och flytta senare om någon frågar",
              "Arbeta i rätt Teams-yta där filer delas gemensamt",
              "Skicka alltid som e-postbilaga",
              "Använd privat chatt som huvudarkiv"
            ],
            correct: 1
          }
        ]
      },

      {
        id: "k1m5",
        title: "Modul 5 – Vanliga misstag i kommunal Teams‑användning",
        purpose: "Identifiera vanliga misstag kring chatt, lokal lagring, struktur och behörighet i kommunal Teams-användning.",
        video: "https://halmstad.sharepoint.com/sites/TestavTeammedbibliotek/Delade%20dokument/Kurser/Kurs%201%20%E2%80%93%20MICROSOFT%20TEAMS%20-%20GRUND%20%26%20ARBETSS%C3%84T/Modul%205%20Vanliga%20misstag%20i%20kommunal%20Teams%E2%80%91anv%C3%A4ndning.mp4?download=1",

        questions: [
          {
            q: "Vilket är ett vanligt misstag i Teams-användning?",
            options: [
              "Att välja verktyg efter syfte",
              "Att lägga gemensam viktig information i privat chatt",
              "Att arbeta i gemensam kanal",
              "Att dokumentera beslut"
            ],
            correct: 1
          },
          {
            q: "Vad kan hända om dokument huvudsakligen lagras lokalt i stället för gemensamt?",
            options: [
              "Bättre samarbete",
              "Mindre personberoende",
              "Sämre spårbarhet och större sårbarhet",
              "Automatisk versionskontroll"
            ],
            correct: 2
          },
          {
            q: "Vad är en risk med otydliga behörigheter?",
            options: [
              "Att rätt personer kan samarbeta enklare",
              "Att fel personer får tillgång eller att rätt personer saknar åtkomst",
              "Att Teams byter språk automatiskt",
              "Att videomöten blockeras"
            ],
            correct: 1
          },
          {
            q: "Vilket problem uppstår ofta när chatt används för sådant som borde ligga i kanal?",
            options: [
              "Information blir mindre sökbar och mindre gemensam",
              "Versionering förbättras",
              "Beslut blir tydligare",
              "Dokument delas mer korrekt"
            ],
            correct: 0
          },
          {
            q: "Varför är struktur viktig i Teams?",
            options: [
              "För att göra information tydlig, sökbar och gemensam",
              "För att få fler notiser",
              "För att göra allt privat",
              "För att undvika samarbete"
            ],
            correct: 0
          },
          {
            q: "Vad kan hända vid otydligt arbetssätt i Teams?",
            options: [
              "Mindre dubbelarbete direkt",
              "Ökad tydlighet utan behov av regler",
              "Förvirring, dubbelarbete och tappad information",
              "Automatisk diarieföring"
            ],
            correct: 2
          },
          {
            q: "Vad kan vara en säkerhetsrisk i Teams-arbetet?",
            options: [
              "Tydlig kanalstruktur",
              "Rätt behörigheter",
              "Fel delning eller dokument på fel plats",
              "Gemensam dokumenthantering"
            ],
            correct: 2
          },
          {
            q: "Vad menas med dubbelarbete i detta sammanhang?",
            options: [
              "Att flera jobbar i samma gemensamma fil",
              "Att samma information skapas och lagras på flera olika ställen",
              "Att ett möte har två deltagare",
              "Att både Word och Excel används"
            ],
            correct: 1
          },
          {
            q: "Varför är spårbarhet viktig i kommunal verksamhet?",
            options: [
              "För att kunna följa vad som beslutats, ändrats och var information finns",
              "För att undvika all struktur",
              "För att göra personliga mappar viktigast",
              "För att Teams ska fungera snabbare"
            ],
            correct: 0
          },
          {
            q: "Vad beskriver uttrycket 'vilda västern' i digitalt samarbete bäst?",
            options: [
              "Ett välstyrt och tydligt arbetssätt",
              "En situation med otydlig struktur, olika arbetssätt och låg kontroll",
              "Ett tekniskt fel i Teams",
              "En godkänd kommunal standard"
            ],
            correct: 1
          }
        ]
      }
    ]
  }
];
