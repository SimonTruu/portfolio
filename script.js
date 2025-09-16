const startMenu = document.getElementById("startMenu")
const content = document.querySelectorAll(".content")

document.querySelectorAll("#startMenu .menuItem").forEach(item => {
    item.addEventListener("click", () => {
      sectionID = `${item.id}Section`
      section = document.getElementById(sectionID)

      startMenu.classList.add("hidden")
      content.forEach(section => section.classList.add("hidden"))

      section.classList.remove("hidden")
      
/*
      const file = `${item.id}.html`;
      window.location.href = file;
*/
    });
});

function toggleLight(){
  document.body.classList.toggle("light-mode");
}

