document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("kurser-container");

    console.log("✅ JS startar");

    fetch("./assets/data/kurser-data.json")   // ✅ VIKTIG FIX (./)
        .then(res => {
            console.log("✅ Response:", res);

            if (!res.ok) {
                throw new Error("Hittade inte filen: " + res.url);
            }
            return res.json();
        })
        .then(data => {

            console.log("✅ JSON:", data);

            if (!data.kurser) {
                throw new Error("saknar 'kurser' i JSON");
            }

            renderKurser(data.kurser);
        })
        .catch(err => {
            console.error("❌ FEL:", err);

            container.innerHTML = `
                <p>Fel vid laddning av kurser</p>
                <p>${err.message}</p>
            `;
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
