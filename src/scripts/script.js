// src/scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  const easterSequence = "cavalos";
  let currentSequence = "";
  document.addEventListener("keydown", (e) => {
    currentSequence += e.key.toLowerCase();
    if (!easterSequence.startsWith(currentSequence)) {
      currentSequence = e.key.toLowerCase() === "c" ? "c" : "";
    }
    if (currentSequence === easterSequence) {
      triggerEasterEgg();
    }
  });

  if ('ontouchstart' in window) {
    const triggerElem = document.getElementById('trigger-cavalos');
    if (triggerElem) {
      let tapCount = 0;
      let lastTapTime = 0;
      triggerElem.addEventListener('touchend', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTapTime > 2000) {
          tapCount = 1;
        } else {
          tapCount++;
        }
        lastTapTime = currentTime;
        if (tapCount === 5) {
          triggerEasterEgg();
          tapCount = 0;
        }
      });
    }
  }
});

function triggerEasterEgg() { 
  document.body.innerHTML = "";

  const overlay = document.createElement("div");
  overlay.id = "easter-egg-overlay";
  
  const img = document.createElement("img");
  img.src = "src/media/images/corintia.png";
  img.alt = "Corintia";
  
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function randomizeFlicker() {
    const randomDuration = Math.floor(Math.random() * 500) + 100;
    img.style.animationDuration = `${randomDuration}ms`;
  }
  setInterval(randomizeFlicker, 500);

  if (typeof loopify === "function") {
    loopify("src/media/sounds/bgm055.ogg", (err, player) => {
      if (err) {
        console.error(err);
      } else {
        player.play();
      }
    });
  } else {
    const audio = new Audio("src/media/sounds/bgm055.ogg");
    audio.loop = true;
    audio.play();
  }
}
