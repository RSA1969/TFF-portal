const params = new URLSearchParams(window.location.search);
const kursId = params.get("id");

fetch("assets/data/kurser-data.json")
  .then(res => res.json())
  .then(data => {

    const kurs = data.kurser.find(k => k.id === kursId);

    if (!kurs) {
      document.body.innerHTML = "Kurs saknas";
      return;
    }

    // ===== KURS =====
    document.getElementById("kursTitel").textContent = kurs.titel;
    document.getElementById("kursText").textContent =
      kurs.syfte || kurs.beskrivning || "";

    const modDiv = document.getElementById("moduler");

    kurs.moduler.forEach((modul, index) => {

      const btn = document.createElement("button");
      btn.textContent = (index + 1) + ". " + modul.titel;

      btn.onclick = () => visaModul(modul);

      modDiv.appendChild(btn);
    });

    // Visa första modul
    if (kurs.moduler.length > 0) {
      visaModul(kurs.moduler[0]);
    }
  });

function visaModul(modul) {

  document.getElementById("modulTitel").textContent = modul.titel;
  document.getElementById("modulSyfte").textContent =
    modul.syfte || modul.beskrivning || "";

  const ul = document.getElementById("modulInnehall");
  ul.innerHTML = "";

  modul.innehall.forEach(rad => {
    const li = document.createElement("li");
    li.textContent = rad;
    ul.appendChild(li);
  });

  const video = document.getElementById("video");

  if (modul.video) {
    video.src = modul.video;
  }
}
