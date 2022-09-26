//*asignacion de constantes

//checks radios, opciones para cambiar de remitentes
const checkRadiologia = $("#flexRadioDefault1");
const checkMaxilodent = $("#flexRadioDefault2");
const checkCastulo = $("#flexRadioDefault3");

//remitentes
const titleRemitente = $("#title__remitente");
const imgResultados = $("#img__resultados");

//datos empresa
const direccion = $("#direccion");
const correo = $("#correo");
const horario = $("#horario");
const whatsapp = $("#whatsapp");
const fijo = $("#tel__fijo");
const formato = $("#all-formato");
const ilustracion = $("#img__ilustracion");

//botones
const btnPrint = $("#btn__print");
const btnClear = $("#btn__clear");

//inputs
const inputNombres = $("#nombres")[0];
const inputDocumento = $("#documento")[0];
const inputServicios1 = $("#servicios1")[0];
const inputServicios2 = $("#servicios2")[0];
const inputCopago = $("#copago")[0];

//ocultar parte derecha, para imprimir
const right__hidden = $("#right")[0];

//asignar nombres a pdf impresos
const namePrintMaxilodent = "auth__maxilodent";
const namePrintRadiologia = "auth__radiologia";
const namePrintCastulo = "auth__castulo";

btnPrint.click(() => {
  //console.log("imprimir");

  if (window.print) {
    if (
      inputNombres.value !== "" &&
      inputDocumento.value !== "" &&
      inputServicios1.value !== ""
    ) {
      right__hidden.className = "right__print";

      if (checkRadiologia[0].checked) {
        document.title = namePrintRadiologia;
      }
      if (checkMaxilodent[0].checked) {
        document.title = namePrintMaxilodent;
      }
      if (checkCastulo[0].checked) {
        document.title = namePrintCastulo;
      }

      if (inputServicios2.value == "") {
        inputServicios2.placeholder = "";
      }

      window.print();

      document.title = "Authorizacions";
      right__hidden.className = "right";
      inputServicios2.placeholder = "Servicios";
    } else {
      alert(
        "Debe rellenar los campos: Nombres , Documento y al menos el primer campo de Servicios"
      );
    }
  }
});

//objecto con los campos a limpiar
const valuesClear = {
  1: inputNombres,
  2: inputDocumento,
  3: inputServicios1,
  4: inputServicios2,
  5: inputCopago,
};

//funcion para limpiar solo los campos servicios
const clearServicies = (obj) => {
  for (const valor in obj) {
    if (valor == 3 || valor == 4 || valor == 5) {
      obj[valor].value = "";
    }
  }
};

//funcion para limpiar todos los campos
const clearAll = (obj) => {
  for (const valor in obj) {
    //console.log(obj[valor]);
    obj[valor].value = "";
  }
};

//al hacer click en el boton limpiar
btnClear.click(() => {
  //console.log("limpiar");
  if (
    inputNombres.value !== "" ||
    inputDocumento.value !== "" ||
    inputServicios1.value !== "" ||
    inputServicios2.value !== "" ||
    inputCopago.value !== ""
  ) {
    const confirmacion = confirm("Se limpiaran todos los datos");
    confirmacion ? clearAll(valuesClear) : ""; //invocamos la funcion para limpiar
  }
});

checkRadiologia.click(() => {
  if (checkRadiologia[0].checked) {
    //console.log("radiologia");
    titleRemitente[0].innerHTML = "RADIOLOGIA E IMAGENES";
    titleRemitente[0].className = "radiologia";
    imgResultados[0].src = "./img/radiologia.png";
    direccion[0].innerHTML = " Carrera 15 # 16-96";
    correo[0].innerHTML = " info@radiologiaeimagenes.co";
    horario[0].innerHTML = "07:00AM A 06:00PM (JORNADA CONTINUA)";
    whatsapp[0].innerHTML = " 3205684881";
    fijo[0].innerHTML = " 5715071 - 5807908";
    ilustracion[0].src = "./img/undraw_job_hunt_re_q203.svg";
    clearServicies(valuesClear);
  }
});

checkMaxilodent.click(() => {
  if (checkMaxilodent[0].checked) {
    //console.log("maxilodent");
    titleRemitente[0].innerHTML = "MAXILODENT";
    titleRemitente[0].className = "maxilodent";
    imgResultados[0].src = "./img/maxilodent.png";
    direccion[0].innerHTML = " CALLE 15 #14-33 OFICINA PORTAL DEL VALLE";
    correo[0].innerHTML = " maxilodent@gmail.com";
    horario[0].innerHTML = "08:00AM A 12:30PM - 02:00PM A 06:00PM";
    whatsapp[0].innerHTML = " 3135249123";
    fijo[0].innerHTML = " 5837886";
    ilustracion[0].src = "./img/undraw_completed_tasks_vs6q.svg";
    clearServicies(valuesClear);
  }
});

checkCastulo.click(() => {
  if (checkCastulo[0].checked) {
    //console.log("castulo");
    titleRemitente[0].innerHTML = "CASTULO ROPAIN";
    titleRemitente[0].className = "castulo";
    imgResultados[0].src = "./img/castulo.jpg";
    direccion[0].innerHTML = " CALLE 16 # 15-51 CONSULTORIO 101";
    correo[0].innerHTML = " castuloropainloborx@hotmail.com";
    horario[0].innerHTML =
      "07:00AM A 06:00PM (LUNES A VIERNES) 08:00AM A 12:00PM (SABADOS)";
    whatsapp[0].innerHTML = " 3174392224";
    fijo[0].innerHTML = " 5711869";
    ilustracion[0].src = "./img/undraw_collaboration_re_vyau.svg";
    clearServicies(valuesClear);
  }
});

//funcion para obtener la fecha y hora actual
const showDate = () => {
  myDate = new Date();
  fecha = myDate.toLocaleDateString();
  hours = myDate.getHours();
  minutes = myDate.getMinutes();
  seconds = myDate.getSeconds();
  if (hours < 10) hours = 0 + hours;

  if (minutes < 10) minutes = "0" + minutes;

  if (seconds < 10) seconds = "0" + seconds;

  $("#fechaActual").text(`${fecha} ${hours}:${minutes}:${seconds}`);
  setTimeout("showDate()", 1000);
};
showDate();

$(document).on("keydown", function (e) {
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80)
  ) {
    alert(
      "Utilice el botón Imprimir para obtener una mejor representación en el documento"
    );
    e.cancelBubble = true;
    e.preventDefault();

    e.stopImmediatePropagation();
  }
});
