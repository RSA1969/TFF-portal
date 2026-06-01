document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("courses");

  if (!container) return;

  DATA.courses.forEach(course => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${course.image}" style="width:100%; border-radius:8px;">
      <h2>${course.name}</h2>
      <p>${course.description}</p>
    `;

    card.onclick = () => {
      localStorage.setItem("courseId", course.id);
      window.location.href = "kurser.html";
    };

    container.appendChild(card);

  });

});
