$(document).ready(function() {
  var left = 0;
  var p1 = true;

  $(document).on("keyup", function(e) {
    var key = e.which;

    if (key == 39) {
      // the enter key ascii code
      left += 150;
      console.log(left);
      if (p1) {
        $("#p1").css({ left: left, position: "absolute" });
        if (left <= 750) {
          $("#titleP3").text("Esperando Processo");
        } else if (left <= 900) {
          $("#titleP3").text("Iniciando Processo");
        } else {
          $("#titleP3").text("Processo 1 Concluido");
        }
        if (left > 1000) {
          left = 0;
          p1 = false;
          $("#p1").hide();
        }
      } else {
        $("#p2").css({ left: left, position: "absolute" });
        if (left <= 1000) {
          $("#titleP3").text("Esperando Processo");
        } else if (left <= 1250) {
          $("#titleP3").text("Iniciando Processo");
        } else {
          $("#titleP3").text("Processo 2 Concluido");
        }
        if (left > 1320) {
          left = 0;
          p1 = false;
          //$("#titleP3").text("");
          $("#p2").hide();
        }
      }
    }
  });
});
