$(document).ready(() => {
  //api coosalud
  let m = [];
  const baseUrl =
    "https://apiautogestion.coosalud.com/vAfiliado/GetByTipoDocAndDoc/";
  const tipDocumentos = {
    1: "CC",
    2: "TI",
    3: "RC",
    4: "CE",
    5: "PE",
    6: "PT",
    7: "SC",
  }; //Add Otros TipDoc

  const getDataResponse = (response, nameID, estadoId) => {
    function respuesta(response) {
      //console.log(response);

      const segundoApellido =
        response.segundo_apellido == null ? "" : response.segundo_apellido;
      const segundoNombre =
        response.segundo_nombre == null ? "" : response.segundo_nombre;

      const primerNombre = response.primer_nombre;
      const primerApellido = response.primer_apellido;
      const nameComplet = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;
      const estadoUs = response.estado == "AC" ? "ACTIVO" : "INACTIVO";

      $(`#${nameID}`).val(nameComplet);

      //console.log(estadoUs);

      const iconActivo =
        '<img src="./img/activo.png" alt="Estado Activo" title="Estado Activo"">';
      const iconInactivo =
        '<img src="./img/inactivo.png" alt="Estado Inactivo" title="Estado Inactivo">';
      const showIconEstado = estadoUs == "ACTIVO" ? iconActivo : iconInactivo;

      $(`#${estadoId}`).html(showIconEstado);

      //console.log(nameComplet);5
    }
    respuesta(response);
  };

  const getDataConsulta = (doc, codtip, nameID, estadoId) => {
    function consulta(doc, codtip, nameID, estadoId) {
      const stt = new Object();
      stt.url = `${baseUrl}${tipDocumentos[codtip]}/${doc}`;
      stt.async = true;
      stt.crossDomain = true;
      stt.method = "GET";

      $.ajax(stt).done((r) => {
        //console.log(r.codigo);
        //r.codigo = 300
        if (r.codigo == 100) {
          if (codtip < 7) consulta(doc, codtip + 1, nameID, estadoId);
          if (codtip == 7) {
            const showIconNoFound =
              '<img src="./img/noFound.png" alt="No encontrado" title="No encontrado"">';

            $(`#${estadoId}`).html(showIconNoFound);
            //return alert("No se encontraron datos");

            const alertNoFound = `<div class="alert alert-warning" role="alert">
          No se encontraron datos!</div>`;

            getAlerts(alertNoFound);
          }
        }

        if (r.codigo == 300) {
          const codigo300 = `<div class="alert alert-danger" role="alert">
        No se pudo realizar la consulta, por favor intente mas tarde!</div>`;

          getAlerts(codigo300);
          // return alert(
          //   "No se pudo realizar la consulta, por favor intenta mas tarde"
          // );
        }

        if (r.codigo == 200) {
          const dt = JSON.parse(r.jsonObject);
          //console.log(dt);
          getDataResponse(dt, nameID, estadoId);
          //console.log(dt);
        }
      });
    }

    consulta(doc, codtip, nameID, estadoId);
  };

  //consultar documento al presionar enter dentro del input de texto
  $("#documento").on("keyup", (e) => {
    $("#estado").html(""); //quitamos icono de estado
    //let keyCode = e.keyCode || e.which;
    const spinner = `<div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

    let largo = $("#documento").val().length;

    if (largo > 6) {
      $("#nombres").val("");
      $("#estado").html(spinner);
      m = $("#documento").val().split(" ");

      for (let doc of m) {
        getDataConsulta(doc, 1, "nombres", "estado");
      }
    }
  });

  //consultar documento al presionar enter dentro del input de texto
  $("#documentoNoContratados").on("keyup", (e) => {
    $("#estadoNoContratados").html(""); //quitamos icono de estado
    const spinner = `<div class="spinner-border text-warning" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

    let largo = $("#documentoNoContratados").val().length;

    if (largo > 6) {
      $("#nombresNoContratados").val("");
      $("#estadoNoContratados").html(spinner);
      m = $("#documentoNoContratados").val().split(" ");

      for (let doc of m) {
        getDataConsulta(doc, 1, "nombresNoContratados", "estadoNoContratados");
      }
    }
  });
});

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
const ilustracion = $("#img__ilustracion_autorizaciones");

//botones
const btnPrint = $("#btn__print");
const btnClear = $("#btn__clear");

//inputs
const inputNombres = $("#nombres")[0];
const inputDocumento = $("#documento")[0];
const inputServicios1 = $("#servicios1")[0];
const inputServicios2 = $("#servicios2")[0];
const inputServicios3 = $("#servicios3")[0];
const inputCopago = $("#copago")[0];
const inputNombresNoContratados = $("#nombresNoContratados")[0];
const inputDocumentoNoContratados = $("#documentoNoContratados")[0];
const inputCupsNoContratados = $("#cups");
const inputServiciosNoContratados = $("#servicio");
const inputCantidadNoContratados = $("#cantidad");
const inputValorNoContratados = $("#valor");
const inputValorTotalNoContratados = $("#valorTotal");

//ocultar parte derecha, para imprimir
const right__hidden = $("#right")[0];

//*funcion para asignar nombres a pdf
const getNameDocument = () => {
  //asignar nombres a pdf impresos
  const namePrintMaxilodent = `AUTORIZACION_MAXILODENT_`;
  const namePrintRadiologia = `AUTORIZACION_RADIOLOGIA_`;
  const namePrintCastulo = `AUTORIZACION_CASTULO_`;

  const fechaDoc = new Date(); //instancia del objeto date

  const objFechaDocument = {
    //guardamos los valores en un objeto
    day: fechaDoc.getDate(),
    month: fechaDoc
      .toLocaleDateString("es-ES", { month: "long" })
      .toUpperCase(),
    year: fechaDoc.getFullYear(),
  };

  const { day, month, year } = objFechaDocument; //extraemos los datos del objeto
  $("#fechaNoContratados").text(` ${day} ${month}${year}`);

  const result = []; //creamos un array vacio, para almacenar el valor final

  if (checkMaxilodent[0].checked) {
    result.push(
      `${namePrintMaxilodent}${inputDocumento.value}_${month}_${day}_${year}`
    );
  }
  if (checkRadiologia[0].checked) {
    result.push(
      `${namePrintRadiologia}${inputDocumento.value}_${month}_${day}_${year}`
    );
  }
  if (checkCastulo[0].checked) {
    result.push(
      `${namePrintCastulo}${inputDocumento.value}_${month}_${day}_${year}`
    );
  }

  return result[0];
};

//console.log(getNameDocument());

//funcion para mostrar y ocultar alertas
function getAlerts(cod, timeFadeOut = 1000) {
  $("#alerts").fadeIn(100, function () {
    $(this).html(cod);
  });
  $("#documento").on("keyup", (e) => {
    $("#alerts").fadeOut(timeFadeOut, function () {
      $(this).html("");
    });
  });
  $("#documentoNoContratados").on("keyup", (e) => {
    $("#alerts").fadeOut(timeFadeOut, function () {
      $(this).html("");
    });
  });
}

function removeAlertsBtnGenerate() {
  if ($("#servicios1").val() !== "") {
    $("#alerts").fadeOut(1000, function () {
      $(this).html("");
    });
  }
}
function removeAlertsBtnClear() {
  $("#alerts").fadeOut(1000, function () {
    $(this).html("");
  });
}

//funcion para mostrar modal de confirmacion
function showModal(
  showText = "ingrese el texto a mostrar",
  srcImg = "ingrese src de img",
  hiddenButton,
  showButton
) {
  $(`#${hiddenButton}`).hide();
  $(`#${showButton}`).show();
  $("#exampleModal").addClass("fade");
  $("#showModal").trigger("click");
  $("#text-modal").text(showText);
  $("#img-modal").attr("src", `${srcImg}`);
}

btnPrint.click(() => {
  //console.log("imprimir");
  if (window.print) {
    try {
      const iconEstado = $("#estado")[0].lastChild.title;

      if (iconEstado == "Estado Inactivo") {
        const alertInactivo = `<div class="alert alert-warning" role="alert">
        No es posible continuar, el usuario se encuentra en estado "Inactivo" en Coosalud!</div>`;

        return getAlerts(alertInactivo);

        // return alert(
        //   'No es posible continuar, el usuario se encuentra en estado "Inactivo" en Coosalud'
        // );
      }
      if (iconEstado == "No encontrado") {
        const alertNoEncontrado = `<div class="alert alert-danger" role="alert">
        No es posible continuar, los datos del usuario no fueron encontrados!</div>`;

        return getAlerts(alertNoEncontrado);
        // return alert(
        //   "No es posible continuar, los datos del usuario no fueron encontrados"
        // );
      }

      if (
        inputNombres.value !== "" &&
        inputDocumento.value !== "" &&
        inputServicios1.value !== ""
      ) {
        removeAlertsBtnGenerate();

        showModal(
          "Desea guardar los datos e imprimir?",
          "./img/save.svg",
          "modalAceptClear",
          "modalAceptPrint"
        );

        //console.log($(".modalConfirm").prop("id"));

        //console.log($("#exampleModal")[0]);
      } else {
        const alertNoPrint = `<div class="alert alert-warning" role="alert">
        Para continuar , debe rellenar los campos: Nombres , Documento y al menos el primer campo de Servicios!</div>`;

        getAlerts(alertNoPrint);

        // alert(
        //   "Debe rellenar los campos: Nombres , Documento y al menos el primer campo de Servicios"
        // );
      }
    } catch (error) {
      //console.log(error);
    }
  }
});

//console.log($("#PrintBody")[0]);

$("#modalAceptPrint").click(() => {
  $("#exampleModal").removeClass("fade");
  //console.log("aceptado!!!");

  //console.log($("#exampleModal")[0]);
  //ocultar parte derecha
  right__hidden.className = "right__print";

  //Valor copago, formato de comas por cada 1000
  if (inputCopago.value !== "") {
    let copagoValue = inputCopago.value;
    let newValorCopago = new Intl.NumberFormat("es-419").format(copagoValue);

    $("#copago").val(newValorCopago);

    //console.log(newValorCopago);
  }

  if (checkRadiologia[0].checked) {
    document.title = getNameDocument();
  }
  if (checkMaxilodent[0].checked) {
    document.title = getNameDocument();
  }
  if (checkCastulo[0].checked) {
    document.title = getNameDocument();
  }

  if (inputServicios2.value == "" || inputServicios3.value == "") {
    inputServicios2.placeholder = "";
    inputServicios3.placeholder = "";
  }

  $("#PrintBody").removeClass("hiddenPrintBody");

  //console.log($("#PrintBody")[0]);

  function showImpr() {
    setTimeout(function () {
      window.print();
    }, 200);
  }

  function appConfigPrint() {
    setTimeout(function () {
      document.title = "Authorizacions";
      right__hidden.className = "right";
      inputServicios2.placeholder = "Servicios";
      inputServicios3.placeholder = "Servicios";
      $("#PrintBody").addClass("hiddenPrintBody");
    }, 200);
  }

  showImpr();

  appConfigPrint();
});

//al hacer click en el boton limpiar
btnClear.click(() => {
  //console.log("limpiar");
  if (
    inputNombres.value !== "" ||
    inputDocumento.value !== "" ||
    inputServicios1.value !== "" ||
    inputServicios2.value !== "" ||
    inputServicios3.value ||
    inputCopago.value !== "" ||
    inputNombresNoContratados.value !== "" ||
    inputDocumentoNoContratados.value !== "" ||
    inputCupsNoContratados.text !== "" ||
    inputServiciosNoContratados.text !== "" ||
    inputCantidadNoContratados.text !== "" ||
    inputValorNoContratados.text !== ""
  ) {
    removeAlertsBtnClear();
    showModal(
      "Se limpiaran todos los datos, desea continuar?",
      "./img/clear.svg",
      "modalAceptPrint",
      "modalAceptClear"
    );

    //console.log($(".modalConfirm").prop("id"));

    // const confirmacion = confirm("Se limpiaran todos los datos");
    //confirmacion ? clearAll(valuesClear) : ""; //invocamos la funcion para limpiar
  }
});

$("#modalAceptClear").click(() => {
  //console.log("clear");
  clearAll(valuesClear);
});

//objecto con los campos a limpiar
const valuesClear = {
  1: inputNombres,
  2: inputDocumento,
  3: inputServicios1,
  4: inputServicios2,
  5: inputServicios3,
  6: inputCopago,
  7: inputNombresNoContratados,
  8: inputDocumentoNoContratados,
};

//funcion para limpiar solo los campos servicios
const clearServicies = (obj) => {
  for (const valor in obj) {
    if (valor == 3 || valor == 4 || valor == 5 || valor == 6) {
      obj[valor].value = "";
    }
  }
};

function clearCampos() {
  for (let i = 2; i < 5; i++) {
    $(`#cups${i}`).text("");
    $(`#servicio${i}`).text("");
    $(`#valor${i}`).text("");
    $(`#cantidad${i}`).val("");
    $(`.inputCampos${i}`).attr("id", `inputCampos${i}`);
  }
  $("#valorTotal").text("$ 0");
  $("#selectServis").val("Seleccionar Servicio");
}

//funcion para limpiar todos los campos
const clearAll = (obj) => {
  $("#estado").html("");
  $("#estadoNoContratados").html("");
  for (const valor in obj) {
    //console.log(obj[valor]);
    obj[valor].value = "";
  }
  inputCupsNoContratados.text("");
  inputServiciosNoContratados.text("");
  inputCantidadNoContratados.val("");
  inputValorNoContratados.text("");
  clearCampos();
};

checkRadiologia.click(() => {
  if (checkRadiologia[0].checked) {
    //console.log("radiologia");
    titleRemitente.html("RADIOLOGIA E IMAGENES");
    titleRemitente[0].className = "radiologia";
    imgResultados[0].src = "./img/radiologia.png";
    direccion.html(" Carrera 15 # 16-96");
    correo.html(" info@radiologiaeimagenes.co");
    horario.html("07:00AM A 06:00PM (JORNADA CONTINUA)");
    whatsapp.html(" 3205684881");
    fijo.html(" 5715071 - 5807908");
    ilustracion[0].src = "./img/ilustracionRadiologia.svg";
    clearServicies(valuesClear);
  }
});

checkMaxilodent.click(() => {
  if (checkMaxilodent[0].checked) {
    //console.log("maxilodent");
    titleRemitente.html("MAXILODENT");
    titleRemitente[0].className = "maxilodent";
    imgResultados[0].src = "./img/maxilodent.png";
    direccion.html(" CALLE 15 #14-33 OFICINA PORTAL DEL VALLE");
    correo.html(" maxilodent@gmail.com");
    horario.html("08:00AM A 12:30PM - 02:00PM A 06:00PM");
    whatsapp.html(" 3135249123");
    fijo.html(" 5837886");
    ilustracion[0].src = "./img/ilustracionMaxilodent.svg";
    clearServicies(valuesClear);
  }
});

checkCastulo.click(() => {
  if (checkCastulo[0].checked) {
    //console.log("castulo");
    titleRemitente.html("CASTULO ROPAIN");
    titleRemitente[0].className = "castulo";
    imgResultados[0].src = "./img/castulo.jpg";
    direccion.html(" CALLE 16 # 15-51 CONSULTORIO 101");
    correo.html(" castuloropainloborx@hotmail.com");
    horario.html(
      "07:00AM A 06:00PM (LUNES A VIERNES) 08:00AM A 12:00PM (SABADOS)"
    );
    whatsapp.html(" 3174392224");
    fijo.html(" 5711869");
    ilustracion[0].src = "./img/ilustracionCastulo.svg";
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

const getFechaNoContratados = () => {
  const fechaDoc = new Date(); //instancia del objeto date

  const objFechaDocument = {
    //guardamos los valores en un objeto
    day: fechaDoc.getDate(),
    month: fechaDoc
      .toLocaleDateString("es-ES", { month: "long" })
      .toUpperCase(),
    year: fechaDoc.getFullYear(),
  };

  const { day, month, year } = objFechaDocument; //extraemos los datos del objeto
  $("#fechaNoContratados").text(
    ` ${day} de ${month.toLocaleLowerCase()} ${year}`
  );
};
getFechaNoContratados();

$(document).on("keydown", function (e) {
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80)
  ) {
    const alertNoPrint = `<div class="alert alert-info" role="alert">
    Utilice el botón Imprimir para obtener una mejor representación en el documento!</div>`;

    getAlerts(alertNoPrint, 9000);

    // alert(
    //   "Utilice el botón Imprimir para obtener una mejor representación en el documento"
    // );
    e.cancelBubble = true;
    e.preventDefault();

    e.stopImmediatePropagation();
  }
});

const btnAutorizaciones = $("#btn_autorizaciones");
const btnCotizaciones = $("#btn_cotizaciones");
const spanTitle1 = $("#spanTitle_format_autorizaciones");
const spanTitle2 = $("#spanTitle_format_cotizaciones");
const formatCotizaciones = $("#format_cotizaciones");
const formatAutorizaciones = $("#format_autorizaciones");
const checkList = $(".right__options");
const ilustracionCotizaciones = $("#img__ilustracion_cotizaciones");

btnAutorizaciones.click(() => {
  //console.log("autorizaciones");
  removeAlertsBtnClear();
  clearAll(valuesClear);
  btnPrint.attr("id", "btn__print");
  $("#mediaPrint").attr("href", "./sass/styles__print.css");
  btnAutorizaciones.hide();
  btnCotizaciones.show();
  spanTitle2.hide("slow");
  spanTitle1.show("slow");
  ilustracionCotizaciones.hide();
  ilustracion.show("slow");
  formatCotizaciones.hide();
  checkList.show("slow");
  formatAutorizaciones.show();
  // formatCotizaciones.css("display", "none");
  // formatAutorizaciones.css("display", "block");
});

btnCotizaciones.click(() => {
  //console.log("cotizaciones");
  removeAlertsBtnClear();
  clearAll(valuesClear);
  btnPrint.attr("id", "btnPrintNoContratados");
  $("#mediaPrint").attr("href", "./sass/styles__print__noContratados.css");
  btnCotizaciones.hide();
  btnAutorizaciones.show();
  spanTitle1.hide("slow");
  spanTitle2.show("slow");
  ilustracion.hide();
  ilustracionCotizaciones.show("slow");
  formatAutorizaciones.hide();
  checkList.hide("slow");
  formatCotizaciones.show();
  // formatAutorizaciones.css("display", "none");
  // formatCotizaciones.css("display", "block");
  const btnPrintNoContratados = $("#btnPrintNoContratados");

  btnPrintNoContratados.click(() => {
    //console.log("imprimir");
    if (window.print) {
      try {
        const iconEstado = $("#estadoNoContratados")[0].lastChild.title;

        if (iconEstado == "Estado Inactivo") {
          const alertInactivo = `<div class="alert alert-warning" role="alert">
          No es posible continuar, el usuario se encuentra en estado "Inactivo" en Coosalud!</div>`;

          return getAlerts(alertInactivo);

          // return alert(
          //   'No es posible continuar, el usuario se encuentra en estado "Inactivo" en Coosalud'
          // );
        }
        if (iconEstado == "No encontrado") {
          const alertNoEncontrado = `<div class="alert alert-danger" role="alert">
          No es posible continuar, los datos del usuario no fueron encontrados!</div>`;

          return getAlerts(alertNoEncontrado);
          // return alert(
          //   "No es posible continuar, los datos del usuario no fueron encontrados"
          // );
        }

        if (
          inputNombresNoContratados.value !== "" &&
          inputDocumentoNoContratados.value !== "" &&
          inputCupsNoContratados.value !== "" &&
          inputServiciosNoContratados.value !== "" &&
          inputCantidadNoContratados.value !== "" &&
          inputValorNoContratados.value !== ""
        ) {
          $("#alerts").fadeOut(1000, function () {
            $(this).html("");
          });

          showModal(
            "Desea guardar los datos e imprimir?",
            "./img/save.svg",
            "modalAceptClear",
            "modalAceptPrint"
          );

          //console.log($(".modalConfirm").prop("id"));

          //console.log($("#exampleModal")[0]);
        } else {
          const alertNoPrint = `<div class="alert alert-warning" role="alert">
          Para continuar, debe rellenar todos los campos!</div>`;

          getAlerts(alertNoPrint);

          // alert(
          //   "Debe rellenar los campos: Nombres , Documento y al menos el primer campo de Servicios"
          // );
        }
      } catch (error) {
        //console.log(error);
      }
    }
  });
});
