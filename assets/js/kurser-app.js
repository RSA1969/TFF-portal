document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("kurser-container");

    // Debug – visar att JS körs
    console.log("✅ kurser-app.js laddad");

    // ✅ Hämta JSON lokalt (GitHub kompatibelt)
    fetch("assets/data/kurser-data.json")
        .then(response => {

            console.log("Svar från server:", response);

            if (!response.ok) {
                throw new Error("JSON-filen hittades inte");
            }

            return response.json();
        })
        .then(data => {

            console.log("✅ JSON laddad:", data);

            // Säker fallback
            const kurser = data.kurser || [];

            renderKurser(kurser);
        })
        .catch(error => {

            console.error("❌ FEL:", error);

            container.innerHTML = `
                <p>Fel vid laddning av kurser</p>
                <p>${error.message}</p>
            `;
        });


    // ✅ Rendera kurskort
    function renderKurser(kurser) {

        container.innerHTML = "";

        if (!kurser || kurser.length === 0) {
            container.innerHTML = "<p>Inga kurser hittades</p>";
            return;
        }

        const colors = [
            "#8cc9bd",
            "#a9d0ea",
            "#e8c09f",
            "#d6c9f4",
            "#f2df9c"
        ];

        kurser.forEach((kurs, index) => {

            const card = document.createElement("div");
            card.className = "kurs-card";
            card.style.background = colors[index % colors.length];

            card.innerHTML = `
                <h2>${kurs.titel || "Ingen titel"}</h2>
