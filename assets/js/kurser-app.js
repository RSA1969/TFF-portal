document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("kurser-container");

    if (!container) {
        console.error("Elementet 'kurser-container' hittades inte");
        return;
    }

    // ✅ Hämta JSON (måste ligga på rätt plats i repo)
    fetch("assets/data/kurser-data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte läsa kurser-data.json");
            }
            return response.json();
        })
        .then(data => {
            renderKurser(data.kurser);
        })
        .catch(error => {
            console.error("Fel vid hämtning:", error);
            container.innerHTML = "<p>Fel vid laddning av kurser.</p>";
        });

    function renderKurser(kurser) {
        container.innerHTML = "";

        kurser.forEach((kurs, index) => {
            const card = document.createElement("div");
            card.className = "kurs-card";

            card.innerHTML = `
                <h2>${kurs.titel}</h2>
                <p>${kurs.beskrivning}</p>
                <button onclick="openKurs(${index})">Öppna kurs</button>
            `;

            container.appendChild(card);
        });

        // ✅ Spara globalt så knappen funkar
        window._kurser = kurser;
    }

    // ✅ Navigera till kurs
    window.openKurs = function (index) {
        const kurs = window._kurser[index];

        if (!kurs) {
            console.error("Kurs saknas:", index);
            return;
        }

        // ✅ Spara vald kurs
        localStorage.setItem("selectedKurs", JSON.stringify(kurs));

        // ✅ Gå till kurs-sida (ändra om du vill)
        window.location.href = "kurs_dokumentation.html";
    };
});
