$(document).ready(function() {
  
  url = 'http://localhost:8080/escalonamento/algoritmo?id=';
  
  txtAlgoritmo = "";
  elementosProcesso = [];

  carregaAlgoritmo(1);
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

function arrayDeObjectosPessoa(pessoas){
  var array = [];
  aux = 0;
  pessoas.forEach(element => {
    obj = {
      img: element.img,
    }
    array[aux] = obj;
    aux++;
  });
  return array;
}

function carregaAlgoritmo(id){
  axios.get(url+id)
  .then(function (response) {
    
    var data = response.data;
    //set variaveis
    console.log(response.data);
    txtAlgoritmo  = data.nome;
    elementosProcesso = arrayDeObjectosPessoa(data.pessoa);
    atualizaCampos();
  });
}

function atualizaCampos(){
  $("#txtAlgoritmo").text('Algoritmo: '+txtAlgoritmo);
  montaDivInicio();
}

function montaDivInicio(){
  elementosProcesso.forEach(processo => {
    $("#divInicio").append(
      '<img src="https://img.ashampoo.com/ashampoo.com_images/img/1/products/1304/en/box_ashampoo_spectre-meltdown-cpu-checker_800x800.png" alt="" width="90" height="90" style="margin: 10px;">'
    );
  });
  
}