document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".animar-letras[data-text]");

  elementos.forEach((el) => {
    const textoOriginal = el.dataset.text;

    function animarTexto() {
      el.innerHTML = ""; // limpa antes de recriar

      // Separa por palavras
      const palavras = textoOriginal.split(" ");

      palavras.forEach((palavra, wIndex) => {
        // cria um span para a palavra inteira
        const palavraSpan = document.createElement("span");
        palavraSpan.style.whiteSpace = "nowrap"; // evita quebra no meio da palavra

        palavra.split("").forEach((char, i) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.classList.add("letra");
          span.style.animationDelay = `${
            (i + wIndex * palavra.length) * 0.08
          }s`;
          palavraSpan.appendChild(span);
        });

        el.appendChild(palavraSpan);

        // adiciona espaço entre palavras
        if (wIndex !== palavras.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      // Tempo total da animação
      const tempoTotal = textoOriginal.length * 80 + 1500;

      // Aplica fadeOut
      setTimeout(() => {
        el.querySelectorAll(".letra").forEach((letra) => {
          letra.classList.add("fadeOut");
        });
      }, textoOriginal.length * 80 + 700);

      // Recomeça o ciclo
      setTimeout(animarTexto, tempoTotal);
    }

    animarTexto();
  });
});
