document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o ano no rodapé dinamicamente
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Easter Egg: detectar a sequência de teclas "cavalo"
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
});

function triggerEasterEgg() {
  // Remove todo o conteúdo da página
  document.body.innerHTML = "";

  // Cria um overlay com fundo preto
  const overlay = document.createElement("div");
  overlay.id = "easter-egg-overlay";

  // Cria o elemento de imagem com posicionamento exigido
  const img = document.createElement("img");
  img.src = "src/media/images/corintia.png";
  img.alt = "Corintia";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Função para ajustar aleatoriamente a duração da animação (em ms)
  function randomizeFlicker() {
    const randomDuration = Math.floor(Math.random() * 500) + 100; // entre 100ms e 600ms
    img.style.animationDuration = `${randomDuration}ms`;
  }
  setInterval(randomizeFlicker, 500);

  // Inicia a música usando Loopify (passando o elemento de áudio)
  if (typeof loopify === "function") {
    const audio = new Audio("src/media/sounds/bgm055.ogg");
    loopify(audio);
  } else {
    // Fallback caso a função não esteja disponível
    const audio = new Audio("src/media/sounds/bgm055.ogg");
    audio.loop = true;
    audio.play();
  }
}
