// 🔒 Force page to start clean on reload (mobile safe)
window.scrollTo(0, 0);
document.body.style.overflowX = "hidden";

document.addEventListener("DOMContentLoaded", () => {
  // 🔁 RESET ON RELOAD
  sessionStorage.clear();
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  const startBtn = document.getElementById("startBtn");
  const intro = document.querySelector(".intro");
  const memories = document.querySelectorAll(".memory");

  // ✅ INTRO VISIBLE ON LOAD
  intro.style.display = "flex";
  document.body.style.overflow = "hidden";

  // ❌ Hide memories initially
  memories.forEach(m => m.classList.remove("show"));

  // 🌟 GSAP intro animation
  gsap.from(".intro h1", { y: 40, opacity: 0, duration: 1 });
  gsap.from(".intro h2", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
  gsap.from("#startBtn", {
    scale: 0.7,
    opacity: 0,
    delay: 0.7,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  // ▶️ START JOURNEY
  startBtn.addEventListener("click", () => {
    // GSAP exit intro
    gsap.to(".intro", {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        intro.style.display = "none";
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);

        // Show first memory
        if (memories[0]) {
          memories[0].classList.add("show");

          gsap.from(memories[0].querySelector(".card"), {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
          });
        }
      }
    });
  });

  // 👇 Scroll reveal with GSAP
  window.addEventListener("scroll", () => {
    if (intro.style.display !== "none") return;

    memories.forEach(section => {
      if (section.classList.contains("animated")) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        section.classList.add("show", "animated");

        gsap.from(section.querySelector(".card"), {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      }
    });
  });

  // 🌸❤️ BACKGROUND FLOWERS & HEARTS
  const bg = document.getElementById("bg-animation");
  const items = ["🌸", "🌺", "🌼", "🌹", "❤️", "💖", "💗"];

  function createFloatItem() {
    if (!bg) return;

    const el = document.createElement("div");
    el.className = "float-item";
    el.innerHTML = items[Math.floor(Math.random() * items.length)];

    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 18 + Math.random() * 28 + "px";
    el.style.animationDuration = 7 + Math.random() * 8 + "s";

    bg.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }

  setInterval(createFloatItem, 700);
});
