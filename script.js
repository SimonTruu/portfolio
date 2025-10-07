document.addEventListener("DOMContentLoaded", () => {

const startMenu = document.getElementById("startMenu")
const content = document.querySelectorAll(".content")

document.querySelectorAll("#startMenu .menuItem").forEach(item => {
    item.addEventListener("click", () => {
      sectionID = `${item.id}Section`
      section = document.getElementById(sectionID)

      startMenu.style.display = "none"
      content.forEach(section => section.style.display = "none")

      section.style.display = "flex"
    });
});

document.querySelectorAll(".back").forEach( item => {
  item.addEventListener("click", () => {
    content.forEach(section => section.style.display = "none")
    startMenu.style.display = "flex"
  })
})

document.getElementById("styleToggel").addEventListener("click", toggleLight)

function toggleLight(){
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

if (localStorage.getItem("theme") === "light") {document.body.classList.add("light-mode");}
});