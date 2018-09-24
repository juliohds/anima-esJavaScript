$(document).ready(function() {
  
  url = 'http://localhost:8080/escalonamento/algoritmo?id=';
  txtAlgoritmo = "";
  elementosProcesso = [];
  qtdProcesso = 0;
  velocidade = 0;
  status = "";
  status_i = "";
  status_p = "";
  status_f = "";
  
  $('#exampleModal').modal('show')

  $("#btnStart").click(function(){
    startAnimation();
  });

  $("#btnChose").click(function(){
    zeraTudo();
    carregaAlgoritmo($("input[name=optradio]:checked").val());
    $("#exampleModal").modal('hide');
  });

  $("#btnReset").click(function(){
    location.reload(true);
  });
 
  
});

function zeraTudo(){
  txtAlgoritmo = "";
  elementosProcesso = [];
  qtdProcesso = 0;
  velocidade = 0;

  voltas1 = 0;
  voltas2 = 0;
  voltas3 = 0;
  voltas4 = 0;
  voltas5 = 0;

  status = "";
  status_i = "";
  status_p = "";
  status_f = "";

  $("#divInicio").html('');
  $("#divMeio").html('');
  
  $("#divInicio").css('background-image', "url('')");
  $("#divFim").css('background-image', "url('')");
}

function arrayDeObjectosPessoa(pessoas){
  var array = [];
  aux = 0;
  pessoas.forEach(element => {
    obj = {
      img: element.img,
      ui_index: element.ui_index,
      nome: element.nome,
    }
    array[aux] = obj;
    aux++;
  });

  qtdProcesso = aux;
  return array;
}

function carregaAlgoritmo(id){
  axios.get(url+id)
  .then(function (response) {
    
    var data = response.data;
    //set variaveis
    console.log(response.data);
    $("#divInicio").css('background-image', "url('"+data.img_l+"')");
    $("#divFim").css('background-image', "url('"+data.img_r+"')");
    $("body").css('background-image', "url('"+data.img_background+"')");
    
    status = data.cpu.status;
    status_i = data.cpu.status_i;
    status_p = data.cpu.status_p;
    status_f = data.cpu.status_f;
    velocidade = data.velocidade;

    txtAlgoritmo  = data.nome;
    elementosProcesso = arrayDeObjectosPessoa(data.pessoa);
    processadorAlgoritmo = {img: data.cpu.img, status: data.cpu.status, id: data.cpu.id};
    atualizaCampos();
  });
}

function startAnimation(){

  if($("input[name=optradio]:checked").val()==4){
    
    voltas1 = $("#processoIdTitle1").html();
    voltas2 = $("#processoIdTitle2").html();
    voltas3 = $("#processoIdTitle3").html();
    voltas4 = $("#processoIdTitle4").html();
    voltas5 = $("#processoIdTitle5").html();
    
    process1();
  }else{
    process1R();
  }
}

function atualizaCampos(){
  $("#txtAlgoritmo").text(txtAlgoritmo);
  montaDivInicio();
  montaDivMeio();
}

function montaDivInicio(){
  elementosProcesso.forEach(processo => {
    $("#divInicio").append(
      '<div id="divP'+processo.ui_index+'" style="position: absolute; z-index:1; '+(processo.ui_index==1?'left: 100px;':processo.ui_index==2?'left: 200px;':processo.ui_index==3?'left: 300px;':processo.ui_index==4?'left: 400px;':'')+'"><label class="img-processo"  style="position: absolute; z-index:2" id="processoIdTitle'+processo.ui_index+'">'+processo.nome+'</label><img src="'+processo.img+'" id="processoId'+processo.ui_index+'" alt="" width="90" height="90" style="margin: 10px; position: absolute;"></div>'
    );
  });
}

function montaDivMeio(){

  $("#divMeio").append(
    '<label class="img-cpu" id="cpuIdTitle'+processadorAlgoritmo.id+'">'+processadorAlgoritmo.status+'</label><img src="'+processadorAlgoritmo.img+'" id="cpuId'+processadorAlgoritmo.id+'" alt="" width="290" height="190" style="margin: 10px;">'
  );

}

//======================================== animações ====================================== //


//generico 1 volt
function process1R(id){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP1").animate({left: "590", top: "+=360"}, velocidade, process1BR);
}
function process1BR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle1").css("background-color", "green")
  $("#divP1").animate({left: "+=250"}, velocidade, process1CR);
}
function process1CR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle1").css("background-color", "green")
  $("#divP1").animate({left: "+=120", top: "-=275"}, velocidade, process2R);
}

function process2R(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP2").animate({left: "590", top: "+=360"}, velocidade, process2BR);
}
function process2BR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle2").css("background-color", "green")
  $("#divP2").animate({left: "+=250"}, velocidade, process2CR);
}
function process2CR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle2").css("background-color", "green")
  $("#divP2").animate({left: "+=270", top: "-=260"}, velocidade, process3R);
}

function process3R(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP3").animate({left: "590", top: "+=360"}, velocidade, process3BR);
}

function process3BR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle3").css("background-color", "green")
  $("#divP3").animate({left: "+=250"}, velocidade, process3CR);
}
function process3CR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle3").css("background-color", "green")
  $("#divP3").animate({left: "+=420", top: "-=290"}, velocidade, process4R);
}

function process4R(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP4").animate({left: "590", top: "+=360"}, velocidade, process4BR);
}

function process4BR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle4").css("background-color", "green")
  $("#divP4").animate({left: "+=250"}, velocidade, process4CR);
}
function process4CR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle4").css("background-color", "green")
  $("#divP4").animate({left: "+=560", top: "-=290"}, velocidade, process5R);
}

function process5R(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP5").animate({left: "590", top: "+=360"}, velocidade, process5BR);
}
function process5BR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle5").css("background-color", "green")
  $("#divP5").animate({left: "+=250"}, velocidade, process5CR);
}
function process5CR(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle5").css("background-color", "green")
  $("#divP5").animate({left: "-=55", top: "-=290"}, velocidade);
}


//round-robin
function process1(id){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP1").animate({left: "590", top: "+=360"}, velocidade, process1B);
}
function process1B(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle1").css("background-color", "green")
  $("#divP1").animate({left: "+=250"}, velocidade, process1C);
}
function process1C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle1").html("0")
  $("#divP1").animate({left: "+=120", top: "-=275"}, velocidade, process2);
}

function process2(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP2").animate({left: "590", top: "+=360"}, velocidade, process2B);
}
function process2B(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle2").css("background-color", "green")
  $("#divP2").animate({left: "+=250"}, velocidade, process2C);
}
function process2C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html("CONTINUA")
  voltas2 -= 1;
  $("#processoIdTitle2").html(voltas2)
  $("#divP2").animate({left: "+=270", top: "-=260"}, velocidade, process2D);
}

function process2D(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html("CONTINUA")
  $("#processoIdTitle2").html("1")
  $("#divP2").animate({left: "0", top: "0"}, velocidade, process3);
}

function process3(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP3").animate({left: "590", top: "+=360"}, velocidade, process3B);
}

function process3B(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle3").css("background-color", "green")
  $("#divP3").animate({left: "+=250"}, velocidade, process3C);
}
function process3C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle2").html('2')
  $("#divP3").animate({left: "+=420", top: "-=290"}, velocidade, process3D);
}

function process3D(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html("CONTINUA")
  $("#processoIdTitle3").html("1")
  $("#divP3").animate({left: "0", top: "0"}, velocidade, process4);
}

function process4(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP4").animate({left: "590", top: "+=360"}, velocidade, process4B);
}

function process4B(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle4").css("background-color", "green")
  $("#divP4").animate({left: "+=250"}, velocidade, process4C);
}
function process4C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle2").html("2")
  $("#divP4").animate({left: "+=560", top: "-=290"}, velocidade, process4D);
}

function process4D(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html("CONTINUA")
  $("#divP4").animate({left: "0", top: "0"}, velocidade, process5);
}

function process5(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_i)
  $("#divP5").animate({left: "590", top: "+=360"}, velocidade, process5B);
}
function process5B(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_p)
  $("#processoIdTitle5").css("background-color", "green")
  $("#divP5").animate({left: "+=250"}, velocidade, process5C);
}
function process5C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle5").css("background-color", "green")
  $("#divP5").animate({left: "-=100", top: "-=290"}, velocidade);
}

function process5C(){
  $("#cpuIdTitle"+processadorAlgoritmo.id).html(status_f)
  $("#processoIdTitle5").css("background-color", "green")
  $("#divP5").animate({left: "-=100", top: "-=290"}, velocidade);
}