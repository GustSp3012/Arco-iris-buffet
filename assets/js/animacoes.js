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

  // contagem de numero
  // Função para formatar valor conforme tipo
  function formatarValor(valor, tipo) {
    switch (tipo) {
      case "R$":
        return valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      case "%":
        return valor + "%";
      default:
        return valor.toLocaleString("pt-BR");
    }
  }

  // Função para animar um contador
  function animarContador(elemento, duracao = 2000) {
    const valorFinal = parseInt(elemento.dataset.contagem);
    const tipo = elemento.dataset.contagemType;
    let inicio = null;

    function animar(tempo) {
      if (!inicio) inicio = tempo;
      const progresso = Math.min((tempo - inicio) / duracao, 1);
      const valorAtual = Math.floor(progresso * valorFinal);
      elemento.textContent = formatarValor(valorAtual, tipo);
      if (progresso < 1) requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
  }

  // Função para resetar ao sair da tela
  function resetarContador(el) {
    const tipo = el.dataset.contagemType;
    if (tipo === "R$") el.textContent = "R$ 0,00";
    else if (tipo === "%") el.textContent = "0%";
    else el.textContent = "0";
  }

  // Observer para detectar visibilidade
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const el = entrada.target;
        if (entrada.isIntersecting) {
          el.classList.add("ativo");
          animarContador(el);
        } else {
          el.classList.remove("ativo");
          resetarContador(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Inicializa automaticamente todos os contadores
  document.querySelectorAll("[data-contagem]").forEach((el) => {
    resetarContador(el); // define o valor inicial correto
    observador.observe(el);
  });
});


