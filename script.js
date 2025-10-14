document.addEventListener("DOMContentLoaded", () => {
  // ===== Menu logic =====
  const startMenu = document.getElementById("startMenu");
  const content = document.querySelectorAll(".content");

  document.querySelectorAll("#startMenu .menuItem").forEach(item => {
    item.addEventListener("click", () => {
      const sectionID = `${item.id}Section`;
      const section = document.getElementById(sectionID);

      startMenu.style.display = "none";
      content.forEach(sec => (sec.style.display = "none"));
      section.style.display = "flex";
    });
  });

  document.querySelectorAll(".back").forEach(item => {
    item.addEventListener("click", () => {
      content.forEach(sec => (sec.style.display = "none"));
      startMenu.style.display = "flex";
    });
  });

  // ===== Theme toggle =====
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

  // ===== Canvas setup =====
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // ===== Particle class =====
  class Particle {
    constructor() {
      this.reset();
    }

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
      const progress = this.life / this.maxLife;
      const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
      const brightness = this.baseBrightness * fade;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient( this.x, this.y, 0, this.x, this.y, this.size * 2);
      gradient.addColorStop(0, `rgba(255, 140, 40, ${brightness})`);
      gradient.addColorStop(0.3, `rgba(255, 80, 20, ${brightness * 0.8})`);
      gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);

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