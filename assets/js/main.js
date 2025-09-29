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
});

