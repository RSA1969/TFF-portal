const grid = document.getElementById("courseGrid");
const input = document.getElementById("q");
const btnSearch = document.getElementById("btnSearch");

let courses = [];

// Pastellfärger (matchar din design)
const colors = [
    "#D6F5FF",
    "#E8E1FF",
    "#FFF1CC",
    "#E1F7E7",
    "#FFDDE6",
    "#EEE1FF",
    "#FFEBE1",
    "#E9F5FF",
    "#F5E6FF",
    "#FFF5E1",
    "#E1FFF5",
    "#FDE2FF",
    "#E8FFD6",
    "#FFE6CC",
    "#D6EFFF"
];

// Hämta data
fetch("assets/data/kurser-data.json")
    .then(r => r.json())
    .then(data => {
        courses = data.kurser;
        render(courses);
    });

// Rendera kort (DETTA ÄR FIXEN)
function render(list) {

    grid.innerHTML = "";

    list.forEach((kurs, index) => {

        const color = colors[index % colors.length];

        const card = document.createElement("a");

        // ✅ MÅSTE vara card
        card.className = "card";

        // ✅ rätt navigation (din portal använder utbildning.html)
        card.href = `utbildning.html?course=${kurs.id}`;

        // ✅ sätter färg via CSS variabel
        card.style.setProperty("--course-color", color);

        card.innerHTML = `
            <h3>${kurs.titel}</h3>
            <p>${kurs.beskrivning}</p>
            <span class="badge">5 moduler</span>
        `;

        grid.appendChild(card);
    });
}

// Sök
function doSearch() {

    const q = input.value.toLowerCase();

    const filtered = courses.filter(k =>
        k.titel.toLowerCase().includes(q) ||
        k.beskrivning.toLowerCase().includes(q)
    );

    render(filtered);
}

btnSearch.onclick = doSearch;

input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        doSearch();
    }
});
