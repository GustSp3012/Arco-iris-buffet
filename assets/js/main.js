$(document).ready(function () {
    //abrir mobile
  $("#abrirMenu").click(function () {
    $(".intocavel").css("display", "block");
    $(".sidebar").css("left", "0");
  });
  //fechar icone mobile
  $("#fecharMenu").click(function () {
    $(".intocavel").css("display", "none");
    $(".sidebar").css("left", "-300px");
  });
  //fechar pelo fundo mobile
  $(".intocavel").click(function (e) {
    if (!$(e.target).closest(".sidebar").length) {
      $(".intocavel").css("display", "none");
      $(".sidebar").css("left", "-300px");
    }
  });



});