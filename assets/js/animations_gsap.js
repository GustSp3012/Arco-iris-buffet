// animação inicial (entrada)
$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);
  // animação contínua de pulsação leve (sem reduzir demais)
  gsap.to(".whatsapp-link", {
    scale: 1.3, // cresce cerca de 5% (equivale a ~2px)
    duration: 1.0, // velocidade da pulsação
    repeat: -1, // infinito
    yoyo: true, // vai e volta suavemente
    ease: "power1.inOut",
    transformOrigin: "center center",
  });

});
