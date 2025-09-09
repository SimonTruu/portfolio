document.querySelectorAll("#startMenu .menuItem").forEach(item => {
    item.addEventListener("click", () => {
      const file = `${item.id}.html`;
      window.location.href = file;
    });
});