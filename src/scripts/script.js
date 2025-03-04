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
    // Se a sequência atual não for prefixo da sequência desejada, reinicia
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

  // Cria um overlay com fundo preto preenchendo a tela
  const overlay = document.createElement("div");
  overlay.id = "easter-egg-overlay";
  
  // Cria o elemento de imagem com o posicionamento exigido
  const img = document.createElement("img");
  img.src = "src/media/images/corintia.png";
  img.alt = "Corintia";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Função para ajustar a animação de brilho aleatória
  function randomizeFlicker() {
    const randomDuration = (Math.random() * 500) + 100; // Entre 100ms e 600ms
    img.style.animationDuration = `${randomDuration}ms`;
  }

  setInterval(randomizeFlicker, 500); // Ajuste a cada 500ms

  // Inicia a reprodução da música usando o loopify (ou fallback se não existir)
  if (typeof loopify === "function") {
    loopify("src/media/sounds/bgm055.ogg");
  } else {
    // Fallback: reprodução manual em loop
    const audio = new Audio("src/media/sounds/bgm055.ogg");
    audio.loop = true;
    audio.play();
  }
}
