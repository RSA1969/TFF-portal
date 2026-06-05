<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TFF Portal – Kurs</title>

<link rel="stylesheet" href="assets/css/styles.css">

<style>
body { margin:0; font-family: Segoe UI, Arial; }
.container { max-width:1200px; margin:auto; padding:20px; }

.module { border:1px solid #ddd; padding:20px; border-radius:10px; }
video { width:100%; border-radius:10px; margin-top:10px; }

.quiz-question {
    border:1px solid #eee;
    padding:10px;
    border-radius:8px;
    margin-top:15px;
}
</style>

</head>
<body>

<div id="app" class="container"></div>

<script>

// ==========================
// PARAMS
// ==========================
const params = new URLSearchParams(window.location.search);
const courseId = params.get("course");
const moduleId = params.get("module");

// ==========================
// DIN RIKTIGA DATA (1 modul demo – kopiera struktur)
// ==========================
const data = {
    kurs01: {
        title: "Microsoft Teams – Grund",
        modules: {

            kurs01_modul01: {
                title: "Vad är Teams",

                // ✅ DIN SharePoint MP4
                video: "https://halmstad.sharepoint.com/sites/XXXXXXXX/video.mp4",

                quiz: [
                    { question:"Vad är huvudsyftet?",
                      answers:[
                        "Lagra lokalt",
                        "Rätt användning i vardagen",
                        "Undvika samarbete",
                        "Ersätta dokument"
                      ],
                      correct:1
                    },

                    { question:"Vad stödjer bästa arbetssätt?",
                      answers:[
                        "E-post",
                        "Teams kanaler",
                        "USB-minne",
                        "Utskrifter"
                      ],
                      correct:1
                    },

                    { question:"Var används Teams?",
                      answers:["Privat","Enbart IT","Verksamhetssamarbete","Ej alls"],
                      correct:2
                    },

                    { question:"Vilket är rätt struktur?",
                      answers:["Kaos","Filer lokalt","Team + kanal","USB"],
                      correct:2
                    },

                    { question:"Vad ska undvikas?",
                      answers:["Dubbelarbete","Samverkan","Dialog","Planering"],
                      correct:0
                    },

                    { question:"Var lagras filer?",
                      answers:["USB","SharePoint","Mail","Ingenstans"],
                      correct:1
                    },

                    { question:"Vad ökar effektivitet?",
                      answers:["Teams","Papper","USB","Mail"],
                      correct:0
                    },

                    { question:"Vad ger struktur?",
                      answers:["Teams-kanaler","Inbox","USB","Chat"],
                      correct:0
                    },

                    { question:"Vad är en fördel?",
                      answers:["Samarbete","Isolering","Manuellt","Ingen"],
                      correct:0
                    },

                    { question:"Vad är korrekt?",
                      answers:["Teams används i vardagen","Ej relevant","Endast IT","Privat"],
                      correct:0
                    }
                ]
            }

        }
    }
};

// ==========================
// VIDEO FIX (SharePoint)
// ==========================
function fixVideo(url){
    if(!url) return "";
    if(url.includes("sharepoint.com")){
        if(url.includes("?")) return url + "&download=1";
        return url + "?download=1";
    }
    return url;
}

// ==========================
// RENDER
// ==========================
function render(){

    const root = document.getElementById("app");
    const kurs = data[courseId];
    const modul = kurs?.modules[moduleId];

    if(!kurs || !modul){
        root.innerHTML = "<h2>Data saknas</h2>";
        return;
    }

    const videoUrl = fixVideo(modul.video);

    root.innerHTML = `
        <h1>${kurs.title}</h1>

        <div class="module">
            <h2>${modul.title}</h2>

            <video controls>
                <source src="${videoUrl}" type="video/mp4">
            </video>

            <h3>Quiz</h3>

            ${modul.quiz.map((q,i)=>`
                <div class="quiz-question">
                    <strong>Fråga ${i+1}: ${q.question}</strong>
                    ${q.answers.map((a,j)=>`
                        <div>
                            <input type="radio" name="q${i}"> ${a}
                        </div>
                    `).join("")}
                </div>
            `).join("")}

        </div>
    `;
}

render();

</script>

</body>
</html>
