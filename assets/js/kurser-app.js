document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("kurser-container");

    // ✅ HÄMTAR JSON (inte SharePoint!)
    fetch("assets/data/kurser-data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte läsa JSON");
            }
            return response.json();
        })
        .then(data => {
            renderKurser(data.kurser);
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = "<p>Fel vid laddning av kurser</p>";
        });

    function renderKurser(kurser) {

        container.innerHTML = "";

        const colors = ["#8cc9bd", "#a9d0ea", "#e8c09f"];

        kurser.forEach((kurs, index) => {

            const card = document.createElement("div");
            card.className = "kurs-card";
            card.style.background = colors[index % colors.length];

            card.innerHTML = `
                <h2>${kurs.titel}</h2>
                <p>${kurs.beskrivning}</p>
                <button>Öppna kurs</button>
            `;

            card.querySelector("button").addEventListener("click", () => {
                localStorage.setItem("selectedKurs", JSON.stringify(kurs));
                window.location.href = "kurs_dokumentation.html";
            });

            container.appendChild(card);
        });
    }

});
``
