document.addEventListener("DOMContentLoaded", () => {

const data = window.TFF_DATA.courses;

const select = document.getElementById("courseSelect");
const list = document.getElementById("moduleList");

const title = document.getElementById("courseTitle");
const desc = document.getElementById("courseDesc");

const mTitle = document.getElementById("moduleTitle");
const mPurpose = document.getElementById("modulePurpose");
const mContent = document.getElementById("moduleContent");

const video = document.getElementById("moduleVideo");

// fyll dropdown
data.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c.id;
  opt.textContent = c.title;
  select.appendChild(opt);
});

let currentCourse = data[0];
let currentModule = 0;

function loadCourse() {
  const id = select.value;
  currentCourse = data.find(c => c.id === id);

  title.textContent = currentCourse.title;
  desc.textContent = currentCourse.desc;

  renderModules();
  loadModule(0);
}

function renderModules() {
  list.innerHTML = "";

  currentCourse.modules.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = (i+1) + ". " + m.title;
    li.onclick = () => loadModule(i);
    list.appendChild(li);
  });
}

function loadModule(i) {
  currentModule = i;
  const m = currentCourse.modules[i];

  mTitle.textContent = m.title;
  mPurpose.textContent = m.purpose;

  mContent.innerHTML = "";
  m.content.forEach(c => {
    let li = document.createElement("li");
    li.textContent = c;
    mContent.appendChild(li);
  });

  if (m.video) {
    video.src = m.video;
  } else {
    video.removeAttribute("src");
  }
}

select.addEventListener("change", loadCourse);

loadCourse();

});
