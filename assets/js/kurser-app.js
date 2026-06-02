(() => {
  const grid = document.getElementById("courseGrid");
  const input = document.getElementById("q");
  const btnSearch = document.getElementById("btnSearch");

  if (!grid) return;

  let allaKurser = [];

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

  function render(kurser) {
    grid.innerHTML = "";

    kurser.forEach((kurs, index) => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = `kurs_dokumentation.html?id=${encodeURIComponent(kurs.id)}`;
      card.style.setProperty("--course-color", colors[index % colors.length]);

      const modulAntal = Array.isArray(kurs.moduler) ? kurs.moduler.length : 0;

      card.innerHTML = `
        <h3>${kurs.titel || ""}</h3>
        <p>${kurs.beskrivning || ""}</p>
        <span class="badge">${modulAntal} moduler</span>
      `;

      grid.appendChild(card);
    });

    if (kurser.length === 0) {
      grid.innerHTML = `
        <div class="emptyState">
          <h3>Inga kurser hittades</h3>
          <p>Ändra sökningen och försök igen.</p>
        </div>
      `;
    }
  }

  function filtrera() {
    const q = (input?.value || "").trim().toLowerCase();

    if (!q) {
      render(allaKurser);
      return;
    }

    const filtrerade = allaKurser.filter(kurs => {
      const text = [
        kurs.titel || "",
        kurs.beskrivning || "",
        ...(Array.isArray(kurs.moduler) ? kurs.moduler.map(m => m.titel || "") : [])
      ].join(" ").toLowerCase();

      return text.includes(q);
    });

    render(filtrerade);
  }

  fetch("assets/data/kurser-data.json", { cache: "no-store" })
    .then(res => {
      if (!res.ok) throw new Error("Kunde inte läsa kurser-data.json");
      return res.json();
    })
    .then(data => {
      allaKurser = Array.isArray(data.kurser) ? data.kurser : [];
      render(allaKurser);
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = `
        <div class="emptyState">
          <h3>Fel vid laddning</h3>
          <p>Kontrollera assets/data/kurser-data.json</p>
        </div>
      `;
    });

  btnSearch?.addEventListener("click", filtrera);
  input?.addEventListener("keydown", e => {
    if (e.key === "Enter") filtrera();
  });
})();
