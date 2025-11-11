document.addEventListener("DOMContentLoaded", () => {
  // Menu logic
  const startMenu = document.getElementById("startMenu");
  const content = document.querySelectorAll(".content");

  // adds on click function to show the section you clicked and hides the rest
  document.querySelectorAll("#startMenu .menuItem").forEach(item => {
    item.addEventListener("click", () => {
      const sectionID = `${item.id}Section`;
      const section = document.getElementById(sectionID);

      startMenu.style.display = "none";
      content.forEach(sec => (sec.style.display = "none"));
      section.style.display = "flex";
    });
  });

  // back button logic
  document.querySelectorAll(".back").forEach(item => {
    item.addEventListener("click", () => {
      content.forEach(sec => (sec.style.display = "none"));
      startMenu.style.display = "flex";
    });
  });

  // Theme toggle 
  const styleToggle = document.getElementById("styleToggel");
  if (styleToggle) {
    styleToggle.addEventListener("click", toggleLight);
  }

  function toggleLight() {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  }

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  // Canvas setup 
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // the particals of the canvas
  class Particle {
    constructor() {
      this.reset();
    }

    // randomizes the attributs of the particals
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.speedY = 0.6 + Math.random() * 1.4;
      this.baseBrightness = 0.3 + Math.random() * 0.9;
      this.size = 1 + Math.random() * 4;
      this.life = 0;
      this.maxLife = 200 + Math.random() * 500;
      this.drift = (Math.random() - 0.5) * 2;
      this.driftChange = 0.002 + Math.random() * 0.004;
    }

    //updates the posistion and restarts the pertical if it has öeft the screen
    update() {
      const heightMod = this.y / canvas.height;
      this.y -= this.speedY;
      this.x += Math.sin(this.life * this.driftChange) * this.drift;
      this.life += heightMod * 2;

      if (this.life > this.maxLife || this.y < -10 || this.x < 0 || this.x > canvas.width){
        this.reset();
      }
    }

    draw() {
      // makes the color change depending on where and when in it life span it is
      const progress = this.life / this.maxLife;
      const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
      const brightness = this.baseBrightness * fade;

      // draws the particals
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);


      const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 2
      );

        // Use precomputed colors (just replace "BRIGHTNESS")
      gradient.addColorStop(0, particleThemes[currentParticleTheme].center.replace("brightness", brightness));
      gradient.addColorStop(0.3, particleThemes[currentParticleTheme].mid.replace("brightness", brightness * 0.8));
      gradient.addColorStop(1, particleThemes[currentParticleTheme].edge);

      // adds the color
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  // ===== Particle system =====
  const particlesArray = Array.from({ length: 300 }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particlesArray) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});

// partical color 
// asked chatgpt for a list of colors
const particleThemes = [
  // 1. Fire
  {
    center: "rgba(255, 140, 40, brightness)",
    mid: "rgba(255, 80, 20, brightness)",
    edge: "rgba(255, 0, 0, 0)"
  },
  // 2. Ice Blue
  {
    center: "rgba(180, 220, 255, brightness)",
    mid: "rgba(120, 180, 255, brightness)",
    edge: "rgba(0, 100, 255, 0)"
  },
  // 3. Pink Glow
  {
    center: "rgba(255, 180, 220, brightness)",
    mid: "rgba(255, 130, 200, brightness)",
    edge: "rgba(255, 180, 220, 0)"
  },
  // 4. Neon Green
  {
    center: "rgba(100, 255, 150, brightness)",
    mid: "rgba(50, 200, 100, brightness)",
    edge: "rgba(0, 255, 0, 0)"
  },
  // 5. Electric Purple ⚡
  {
    center: "rgba(200, 120, 255, brightness)",
    mid: "rgba(160, 70, 255, brightness)",
    edge: "rgba(200, 120, 255, 0)"
  },
  // 6. Golden Sun ✨
  {
    center: "rgba(255, 220, 120, brightness)",
    mid: "rgba(255, 190, 80, brightness)",
    edge: "rgba(255, 200, 0, 0)"
  },
  // 7. Cyan / Aqua 🌊
  {
    center: "rgba(120, 255, 240, brightness)",
    mid: "rgba(80, 220, 220, brightness)",
    edge: "rgba(120, 255, 240, 0)"
  },
  // 8. Toxic Green / Slime 💚
  {
    center: "rgba(180, 255, 0, brightness)",
    mid: "rgba(140, 220, 0, brightness)",
    edge: "rgba(180, 255, 0, 0)"
  },
  // 9. Magma / Lava 🌋
  {
    center: "rgba(255, 80, 0, brightness)",
    mid: "rgba(200, 30, 0, brightness)",
    edge: "rgba(255, 80, 0, 0)"
  },
  // 10. Pastel Sky ☁️
  {
    center: "rgba(255, 200, 240, brightness)",
    mid: "rgba(200, 180, 255, brightness)",
    edge: "rgba(255, 255, 255, 0)"
  }
];


const particleThemeButton = document.getElementById("particleTheme");
var currentParticleTheme = 0;

// updates the partical color
if (particleThemeButton) {
  particleThemeButton.addEventListener("click", () => {
    currentParticleTheme = (currentParticleTheme + 1);
    if(currentParticleTheme >= particleThemes.length) {currentParticleTheme = 0}
    localStorage.setItem("particleTheme", currentParticleTheme);
  });
}

// Load saved particle theme
if (localStorage.getItem("particleTheme")) {
  currentParticleTheme = parseInt(localStorage.getItem("particleTheme"));
}