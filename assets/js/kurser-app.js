const grid = document.getElementById("courseGrid");

const colors = [
  "#D6F5FF","#E8E1FF","#FFF1CC","#E1F7E7",
  "#FFDDE6","#EEE1FF","#FFEBE1","#E9F5FF",
  "#F5E6FF","#FFF5E1","#E1FFF5","#FDE2FF",
  "#E8FFD6","#FFE6CC","#D6EFFF"
];

fetch("assets/data/kurser-data.json")
.then(r => r.json())
.then(data => {

  const kurser = data.kurser;

  grid.innerHTML = "";

  kurser.forEach((kurs, i) => {

    const card = document.createElement("a");

    card.className = "card";
    card.href = "kurs_dokumentation.html?id=" + kurs.id;
    card.style.setProperty("--course-color", colors[i % colors.length]);

    card.innerHTML = `
      <h3>${kurs.titel}</h3>
      <p>${kurs.beskrivning}</p>
      <span class="badge">5 moduler</span>
    `;

    grid.appendChild(card);
  });

});
