console.log("JS laddad ✅");

const params = new URLSearchParams(window.location.search);
const kursId = params.get("id");

fetch("assets/data/kurser-data.json")
  .then(res => res.json())
  .then(data => {

    console.log("Data laddad ✅", data);

    const kurs = data.kurser.find(k => k.id === kursId);

    if (!kurs) {
      document.body.innerHTML = "Kurs saknas";
      return;
    }

    // Titel
    document.getElementById("kursTitel").textContent = kurs.titel;

    // Text
    document.getElementById("kursText").textContent =
      kurs.syfte || kurs.beskrivning || "";

    // Moduler
    const modDiv = document.getElementById("moduler");
    modDiv.innerHTML = "";

    kurs.moduler.forEach((m, i) => {

      const btn = document.createElement("button");
      btn.textContent = (i + 1) + ". " + m.titel;

      btn.onclick = () => visaModul(m);

      modDiv.appendChild(btn);
    });

    // Visa första modul
    if (kurs.moduler.length > 0) {
      visaModul(kurs.moduler[0]);
    }

  })
  .catch(err => {
    console.error("Fel:", err);
    document.body.innerHTML = "Fel vid laddning";
  });

function visaModul(modul) {

  const video = document.getElementById("video");

  if (video && modul.video) {
    video.src = modul.video;
  }
}
