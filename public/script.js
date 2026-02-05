document.addEventListener("DOMContentLoaded", () => {

  const intro = document.querySelector(".intro");
  const startBtn = document.getElementById("startBtn");

  const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".memory").length;

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const controls = document.querySelector(".controls");

  const bg = document.getElementById("bg-animation");
  const emojis = ["🌸", "🌺", "🌼", "🌹", "❤️", "💖", "💞", "✨"];

  let index = 0;
  let isAnimating = false;

  /* 🌟 INTRO ANIMATION */
  gsap.from(".intro h1", { y: 40, opacity: 0, duration: 1 });
  gsap.from(".intro h2", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
  gsap.from("#startBtn", {
    scale: 0.6,
    opacity: 0,
    delay: 0.6,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  startBtn.addEventListener("click", () => {
    gsap.to(intro, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => intro.style.display = "none"
    });
  });

  /* 🌸 FLOATING EMOJIES */
  function createFloat() {
    const el = document.createElement("div");
    el.className = "float";
    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 18 + Math.random() * 28 + "px";
    el.style.animationDuration = 8 + Math.random() * 8 + "s";

    bg.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }

  setInterval(createFloat, 700);

  /* BUTTON STATE */
  function updateButtons() {
    if (index === 0) {
      controls.classList.add("single");
      controls.classList.remove("dual");
    } else {
      controls.classList.remove("single");
      controls.classList.add("dual");
    }
  }

  /* SLIDE ANIMATIONS */
  function slideNext(i) {
    isAnimating = true;
    gsap.to(slides, {
      x: -i * window.innerWidth,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => isAnimating = false
    });
  }

  function slidePrev(i) {
    isAnimating = true;
    gsap.fromTo(
      slides,
      { x: -(i + 1) * window.innerWidth },
      {
        x: -i * window.innerWidth,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => isAnimating = false
      }
    );
  }

  function slideLoopNext() {
    isAnimating = true;
    gsap.set(slides, { x: window.innerWidth });
    gsap.to(slides, {
      x: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => isAnimating = false
    });
  }

  /* NEXT */
  nextBtn.addEventListener("click", () => {
    if (isAnimating) return;

    if (index === slideCount - 1) {
      index = 0;
      slideLoopNext();
    } else {
      index++;
      slideNext(index);
    }
    updateButtons();
  });

  /* PREV */
  prevBtn.addEventListener("click", () => {
    if (isAnimating) return;

    if (index === 0) {
      index = slideCount - 1;
      slidePrev(index);
    } else {
      index--;
      slidePrev(index);
    }
    updateButtons();
  });

  updateButtons();

  window.addEventListener("resize", () => {
    gsap.set(slides, { x: -index * window.innerWidth });
  });
});
// START BUTTON PREMIUM ANIMATION
gsap.timeline({ repeat: -1, yoyo: true })
  .to("#startBtn", {
    scale: 1.08,
    boxShadow: "0 0 25px rgba(179,0,89,0.6)",
    duration: 1.2,
    ease: "power1.inOut"
  });
  startBtn.addEventListener("mouseenter", () => {
  gsap.to(startBtn, {
    scale: 1.15,
    duration: 0.4,
    ease: "back.out(1.7)"
  });
});

startBtn.addEventListener("mouseleave", () => {
  gsap.to(startBtn, {
    scale: 1,
    duration: 0.4,
    ease: "power2.out"
  });
});
startBtn.addEventListener("click", () => {
  gsap.to(startBtn, {
    scale: 0.9,
    duration: 0.2,
    ease: "power2.in"
  });

  gsap.to(".intro", {
    opacity: 0,
    y: -40,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.inOut",
    onComplete: () => {
      intro.style.display = "none";
    }
  });
});

