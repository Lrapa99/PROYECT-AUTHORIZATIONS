const remitente = document.getElementById("title__remitente");
const radiologia = document.getElementById("flexRadioDefault1");
const maxilodent = document.getElementById("flexRadioDefault2");
const castulo = document.getElementById("flexRadioDefault3");
const imgResultados = document.getElementById("img__resultados");
const direccion = document.getElementById("direccion");
const correo = document.getElementById("correo");
const horario = document.getElementById("horario");
const whatsapp = document.getElementById("whatsapp");
const fijo = document.getElementById("tel__fijo");

console.log(whatsapp);

radiologia.addEventListener("click", () => {
  if (radiologia.checked) {
    console.log("radiologia");
    remitente.innerHTML = "RADIOLOGIA E IMAGENES";
    remitente.className = "radiologia";
    imgResultados.src = "./img/radiologia.png";
    direccion.innerHTML = " Carrera 15 # 16-96";
    correo.innerHTML = " info@radiologiaeimagenes.co";
    horario.innerHTML = "07:00AM A 06:00PM (JORNADA CONTINUA)";
    whatsapp.innerHTML = " 3205684881";
    fijo.innerHTML = " 5715071 - 5807908";
  }
});

maxilodent.addEventListener("click", () => {
  if (maxilodent.checked) {
    console.log("maxilodent");
    remitente.innerHTML = "MAXILODENT";
    remitente.className = "maxilodent";
    imgResultados.src = "./img/maxilodent.png";
    direccion.innerHTML = " CALLE 15 #14-33 OFICINA PORTAL DEL VALLE";
    correo.innerHTML = " maxilodent@gmail.com";
    horario.innerHTML = "08:00AM A 12:30PM - 02:00OM A 06:00PM";
    whatsapp.innerHTML = " 3135249123";
    fijo.innerHTML = " 5837886";
  }
});

castulo.addEventListener("click", () => {
  if (castulo.checked) {
    console.log("castulo");
    remitente.innerHTML = "CASTULO ROPAIN";
    remitente.className = "castulo";
    imgResultados.src = "./img/castulo.jpg";
    direccion.innerHTML = " CALLE 16 # 15-51 CONSULTORIO 101";
    correo.innerHTML = " castuloropainloborx@hotmail.com";
    horario.innerHTML =
      "07:00AM A 06:00PM (LUNES A VIERNES) 08:00AM A 12:00PM (SABADOS)";
    whatsapp.innerHTML = " 3174392224";
    fijo.innerHTML = " 5711869";
  }
});
