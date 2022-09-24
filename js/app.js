const remitente = $("#title__remitente");
const radiologia = $("#flexRadioDefault1");
const maxilodent = $("#flexRadioDefault2");
const castulo = $("#flexRadioDefault3");
const imgResultados = $("#img__resultados");
const direccion = $("#direccion");
const correo = $("#correo");
const horario = $("#horario");
const whatsapp = $("#whatsapp");
const fijo = $("#tel__fijo");
const btnPrint = $("#btn__print");
const formato = $("#all-formato");
const ilustracion = $("#img__ilustracion");


console.log(radiologia[0]);

//console.log(btnPrint[0]);

//console.log(formato[0].innerHTML);


btnPrint[0].addEventListener("click",()=>{
    console.log('imprimir');

})



radiologia[0].addEventListener("click", () => {
  if (radiologia[0].checked) {
    //console.log("radiologia");
    remitente[0].innerHTML = "RADIOLOGIA E IMAGENES";
    remitente[0].className = "radiologia";
    imgResultados[0].src = "./img/radiologia.png";
    direccion[0].innerHTML = " Carrera 15 # 16-96";
    correo[0].innerHTML = " info@radiologiaeimagenes.co";
    horario[0].innerHTML = "07:00AM A 06:00PM (JORNADA CONTINUA)";
    whatsapp[0].innerHTML = " 3205684881";
    fijo[0].innerHTML = " 5715071 - 5807908";
    ilustracion[0].src = './img/undraw_job_hunt_re_q203.svg'

  }
});

maxilodent[0].addEventListener("click", () => {
  if (maxilodent[0].checked) {
    //console.log("maxilodent");
    remitente[0].innerHTML = "MAXILODENT";
    remitente[0].className = "maxilodent";
    imgResultados[0].src = "./img/maxilodent.png";
    direccion[0].innerHTML = " CALLE 15 #14-33 OFICINA PORTAL DEL VALLE";
    correo[0].innerHTML = " maxilodent@gmail.com";
    horario[0].innerHTML = "08:00AM A 12:30PM - 02:00PM A 06:00PM";
    whatsapp[0].innerHTML = " 3135249123";
    fijo[0].innerHTML = " 5837886";
    ilustracion[0].src = './img/undraw_completed_tasks_vs6q.svg'
  }
});

castulo[0].addEventListener("click", () => {
  if (castulo[0].checked) {
    //console.log("castulo");
    remitente[0].innerHTML = "CASTULO ROPAIN";
    remitente[0].className = "castulo";
    imgResultados[0].src = "./img/castulo.jpg";
    direccion[0].innerHTML = " CALLE 16 # 15-51 CONSULTORIO 101";
    correo[0].innerHTML = " castuloropainloborx@hotmail.com";
    horario[0].innerHTML =
      "07:00AM A 06:00PM (LUNES A VIERNES) 08:00AM A 12:00PM (SABADOS)";
    whatsapp[0].innerHTML = " 3174392224";
    fijo[0].innerHTML = " 5711869";
    ilustracion[0].src = './img/undraw_collaboration_re_vyau.svg'

  }
});

// hora automatica
showTime();
function showTime() {
  myDate = new Date();
  hours = myDate.getHours();
  minutes = myDate.getMinutes();
  seconds = myDate.getSeconds();
  if (hours < 10) hours = 0 + hours;

  if (minutes < 10) minutes = "0" + minutes;

  if (seconds < 10) seconds = "0" + seconds;

  $("#HoraActual").text(hours + ":" + minutes + ":" + seconds);
  setTimeout("showTime()", 1000);
}
