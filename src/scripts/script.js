// src/scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o ano no rodapé dinamicamente
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Easter Egg: detectar a sequência de teclas "cavalo" (para dispositivos com teclado)
  const easterSequence = "cavalo";
  let currentSequence = "";
  document.addEventListener("keydown", (e) => {
    currentSequence += e.key.toLowerCase();
    // Se a sequência atual não for prefixo da desejada, reinicia
    if (!easterSequence.startsWith(currentSequence)) {
      currentSequence = e.key.toLowerCase() === "c" ? "c" : "";
    }
    if (currentSequence === easterSequence) {
      triggerEasterEgg();
    }
  });

  // Easter Egg: detectar toques no texto "cavalos" exclusivamente para dispositivos de toque
  if ('ontouchstart' in window) {
    const triggerElem = document.getElementById('trigger-cavalos');
    if (triggerElem) {
      let tapCount = 0;
      let lastTapTime = 0;
      triggerElem.addEventListener('touchend', function(e) {
        const currentTime = Date.now();
        // Se mais de 2000ms se passaram entre toques, reinicia a contagem.
        if (currentTime - lastTapTime > 2000) {
          tapCount = 1;
        } else {
          tapCount++;
        }
        lastTapTime = currentTime;
        if (tapCount === 5) {
          triggerEasterEgg();
          tapCount = 0; // Reinicia a contagem após ativar
        }
      });
    }
  }
});

function triggerEasterEgg() { 
  // Remove todo o conteúdo da página
  document.body.innerHTML = "";

  // Cria um overlay com fundo preto preenchendo a tela
  const overlay = document.createElement("div");
  overlay.id = "easter-egg-overlay";
  
  // Cria o elemento de imagem com o posicionamento exigido
  const img = document.createElement("img");
  img.src = "src/media/images/corintia.png";
  img.alt = "Corintia";
  
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Função: ajusta aleatoriamente a duração da animação (em ms)
  function randomizeFlicker() {
    const randomDuration = Math.floor(Math.random() * 500) + 100; // varia entre 100ms e 600ms
    img.style.animationDuration = `${randomDuration}ms`;
  }
  setInterval(randomizeFlicker, 500);

  // Inicia a reprodução da música usando loopify (chamando a função com URI e callback)
  if (typeof loopify === "function") {
    loopify("src/media/sounds/bgm055.ogg", (err, player) => {
      if (err) {
        console.error(err);
      } else {
        player.play();
      }
    });
  } else {
    // Fallback: reprodução manual em loop
    const audio = new Audio("src/media/sounds/bgm055.ogg");
    audio.loop = true;
    audio.play();
  }
}
