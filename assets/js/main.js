$(document).ready(function () {
  const $sidebar = $(".sidebar-container");

  // abrir
  $("#menu").on("click", function (e) {
    e.preventDefault();
    $sidebar.addClass("active");
  });

  // fechar
  $(".sidebar-close").on("click", function (e) {
    e.preventDefault();
    $sidebar.removeClass("active");
  });
  //gsap animation
  gsap.to("#img", {
    // y: 30, // distância que sobe/ desce
    // duration: 2, // duração da animação
    // ease: "power2.inOut",
    // repeat: -1, // repete infinitamente
    // yoyo: true, // volta suavemente para posição inicial

    scale: 1.1, // aumenta para 120%
    duration: 0.6, // duração da animação em segundos
    ease: "power1.inOut",
    repeat: -1, // repete infinitamente
    yoyo: true, // volta suavemente ao tamanho original
  });

  // ===============================
  // 🎬 Controle do vídeo ao clicar
  // ===============================
  const $videoBg = $(".video-bg");
  const $video = $videoBg.find("video")[0];
  let loopInterval;
  let somAtivo = false;

  // Função para iniciar loop automático antes do clique
  function startLoop() {
    loopInterval = setInterval(() => {
      if ($video.currentTime >= $video.duration - 0.05) {
        $video.currentTime = 0;
        $video.play();
      }
    }, 100);
  }

  startLoop();

  // Função para ativar som e esconder overlay/texto
  function ativarSom() {
    clearInterval(loopInterval);
    $videoBg.addClass("hide-overlay");
    $video.muted = false;
    $video.currentTime = 0;
    $video.play();
    somAtivo = true;
  }

  // Função para resetar para o estado inicial
  function resetVideo() {
    $videoBg.removeClass("hide-overlay");
    $video.muted = true;
    $video.currentTime = 0;
    $video.play();
    startLoop();
    somAtivo = false;
  }

  // Clique no botão para ativar som
  $("#ativar-video").on("click", function (e) {
    e.stopPropagation(); // evita que o clique no botão acione o clique do videoBg
    ativarSom();
  });

  // Clique em qualquer área do vídeo quando o som está ativo (exceto no botão)
  $videoBg.on("click", function (e) {
    if (somAtivo && !$(e.target).closest("#ativar-video").length) {
      resetVideo();
    }
  });

  // Monitoramento do final do vídeo após ativar som
  $video.addEventListener("timeupdate", () => {
    if (somAtivo && $video.currentTime >= $video.duration - 0.05) {
      resetVideo();
    }
  });
});

