const grid = document.getElementById("courseGrid");

fetch("assets/data/kurser-data.json")
  .then(res => res.json())
  .then(data => {

    grid.innerHTML = "";

    const colors = [
      "#D6F5FF", "#E8E1FF", "#FFF1CC", "#E1F7E7",
      "#FFDDE6", "#EEE1FF", "#FFEBE1", "#E9F5FF",
      "#F5E6FF", "#FFF5E1", "#E1FFF5", "#FDE2FF",
      "#E8FFD6", "#FFE6CC", "#D6EFFF"
    ];

    data.kurser.forEach((kurs, index) => {

      const a = document.createElement("a");

      // ✅ DETTA ÄR KRITISKT
      a.className = "card";

      // ✅ rätt navigation för din portal
      a.href = `utbildning.html?course=${kurs.id}`;

      // ✅ färg per kurs
      a.style.setProperty("--course-color", colors[index % colors.length]);

      // ✅ detta skapar kortet (inte lista)
      a.innerHTML = `
        <h3>${kurs.titel}</h3>
        <p>${kurs.beskrivning}</p>
        <span class="badge">5 moduler</span>
      `;

      grid.appendChild(a);
    });

  })
  .catch(err => {
    console.error("Fel JSON:", err);
  });
