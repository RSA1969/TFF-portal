document.addEventListener("DOMContentLoaded", function () {
  const coursesGrid = document.getElementById("coursesGrid");
  if (!coursesGrid || !window.PortalData) return;

  const courses = PortalData.getCourses();

  coursesGrid.innerHTML = "";

  const imageMap = {
    1: "assets/img/tile-mandatory.jpg",
    2: "assets/img/tile-status.jpg",
    3: "assets/img/tile-guides.jpg",
    4: "assets/img/tile-chief.jpg",
    5: "assets/img/tile-edu.jpg",
    6: "assets/img/tile-hrkollegan.jpg",
    7: "assets/img/tile-atlas.jpg",
    8: "assets/img/tile-chief.jpg",
    9: "assets/img/tile-guides.jpg",
    10: "assets/img/tile-status.jpg",
    11: "assets/img/tile-mandatory.jpg",
    12: "assets/img/tile-edu.jpg",
    13: "assets/img/tile-atlas.jpg",
    14: "assets/img/tile-hrkollegan.jpg",
    15: "assets/img/tile-chief.jpg"
  };

  courses.forEach(course => {
    const progress = PortalData.getProgress();
    const courseProgress = progress[course.id] || {};
    const completedModules = Object.values(courseProgress).filter(m => m.quizPassed).length;
    const totalModules = course.modules.length;
    const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-card__image-wrap">
        <img class="course-card__image" src="${imageMap[course.id] || "assets/img/tile-mandatory.jpg"}" alt="${course.title}">
      </div>
      <div class="course-card__body">
        <h3>${course.title}</h3>
        <p>${course.purpose}</p>

        <div class="course-progress">
          <div class="course-progress__label">Progress: ${completedModules}/${totalModules} moduler</div>
          <div class="progress-bar">
            <div class="progress-bar__fill" style="width:${percent}%"></div>
          </div>
        </div>

        <button class="btn btn-primary">Öppna kurs</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", function () {
      localStorage.setItem("selectedCourseId", course.id);
      window.location.href = "kurser.html";
    });

    coursesGrid.appendChild(card);
  });
});
