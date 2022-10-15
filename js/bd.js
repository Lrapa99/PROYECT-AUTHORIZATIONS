$(document).ready(() => {
  const objServiciosNoContratados = {
    883522: [
      "RESONANCIA MAGNÉTICA DE ARTICULACIONES DE MIEMBRO INFERIOR (ESPECÍFICO)",
      "350775",
    ],
    883210: ["RESONANCIA MAGNÉTICA DE COLUMNA CERVICAL SIMPLE", "457543"],
    883220: ["RESONANCIA MAGNÉTICA DE COLUMNA TORÁCICA SIMPLE", "457543"],
    883440: ["RESONANCIA MAGNÉTICA DE PELVIS SIMPLE", "457543"],
    883230: ["RESONANCIA MAGNÉTICA DE COLUMNA LUMBOSACRA SIMPLE", "457543"],
    883109: ["RESONANCIA MAGNÉTICA DE OIDOS SIMPLE", "457543"],
    883401: ["RESONANCIA MAGNÉTICA DE ABDOMEN", "457543"],
    "20030187-10": ["MEDIO DE CONTRASTE PARA RESONANCIA", "180000"],
    998702: [
      "SOPORTE DE SEDACIÓN PARA CONSULTA O APOYO DIAGNÓSTICO RESONANCIA",
      "300000",
    ],
    879205: [
      "TOMOGRAFÍA COMPUTADA DE COLUMNA SEGMENTOS CERVICAL, TORÁCICO, LUMBAR O SACRO, COMPLEMENTO A MIELOGRAFÍA (CADA SEGMENTO)",
      "112837",
    ],
    879122: [
      "TOMOGRAFÍA COMPUTADA DE OIDO, PEÑASCO Y CONDUCTO AUDITIVO INTERNO",
      "133156",
    ],
    883103: ["RESONANCIA MAGNÉTICA DE ÓRBITAS", "457543"],
    879520: [
      "TOMOGRAFIA AXIAL COMPUTADA DE MIEMBROS INFERIORES Y ARTICULACIONES",
      "103500",
    ],
    879201: [
      "TOMOGRAFÍA COMPUTADA DE COLUMNA SEGMENTOS CERVICAL, TORÁCICO, LUMBAR O SACRO, POR CADA NIVEL (TRES ESPACIOS)",
      "81168",
    ],
    "998702-1": [
      "SOPORTE DE SEDACIÓN PARA CONSULTA O APOYO DIAGNÓSTICO TOMOGRAFIA",
      "180000",
    ],
    601101: [
      "BIOPSIA CERRADA DE PROSTATA POR ABORDAJE TRANSRECTAL (ECODIRIGIDA)",
      "1062500",
    ],
    61100: ["BIOPSIA DE TIROIDES GUIADA POR ECOGRAFIA DE TIROIDES", "937500"],
    881112: [
      "ECOGRAFÍA CEREBRAL TRANSFONTANELAR CON TRANSDUCTOR DE 7.MHZ O MÁS",
      "43962",
    ],
  };

  function clearInputs() {
    $("#cups").text("");
    $("#servicio").text("");
    $("#valor").text("");
    $("#cantidad").val("");
    $("#valorTotal").text("$ 0");
  }

  const getValuesInputs = () => {
    let inicial = $("#selectServis").val();
    $("#selectServis").change(function () {
      if ($("#selectServis").val() !== inicial) {
        //alert("El campo ha cambiado");
        //console.log($("#cups").val());
        //clearInputs();

        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#selectServis").val() == objServiciosNoContratados[val][0]) {
            let servicio = objServiciosNoContratados[val][0];
            var valor = objServiciosNoContratados[val][1];

            if ($("#cups").text() === "") {
              var newValorServicio1 = new Intl.NumberFormat("es-419").format(
                valor
              );
              $("#cups").text(val);
              $("#servicio").text(servicio);
              $("#valor").text(`$ ${newValorServicio1}`);
              $("#cantidad").val(1);

              //$("#valorTotal").text(`$ ${newValorServicio1}`);
            }
            if ($(".inputCampos2").attr("id") !== "inputCampos2") {
              var newValorServicio2 = new Intl.NumberFormat("es-419").format(
                valor
              );
              if ($("#cups2").text() === "") {
                $("#cups2").text(val);
                $("#servicio2").text(servicio);
                $("#valor2").text(`$ ${newValorServicio2}`);
                $("#cantidad2").val(1);

                //$("#valorTotal").text(`$ ${newValorServicio3}`);
              }
            }
            if ($(".inputCampos3").attr("id") !== "inputCampos3") {
              var newValorServicio3 = new Intl.NumberFormat("es-419").format(
                valor
              );
              if ($("#cups3").text() === "") {
                $("#cups3").text(val);
                $("#servicio3").text(servicio);
                $("#valor3").text(`$ ${newValorServicio3}`);
                $("#cantidad3").val(1);

                //$("#valorTotal").text(`$ ${newValorServicio3}`);
              }
            }
            if ($(".inputCampos4").attr("id") !== "inputCampos4") {
              var newValorServicio4 = new Intl.NumberFormat("es-419").format(
                valor
              );
              if ($("#cups4").text() === "") {
                $("#cups4").text(val);
                $("#servicio4").text(servicio);
                $("#valor4").text(`$ ${newValorServicio4}`);
                $("#cantidad4").val(1);

                //$("#valorTotal").text(`$ ${newValorServicio4}`);
              }
            }

            //$("#selectServis").val('')
          }
        }
      } else {
        clearInputs();
      }

      hiddenNotaContrate();
    });

    function hiddenNotaContrate() {
      let cadena1 = $("#servicio").text(),
        cadena2 = $("#servicio2").text(),
        cadena3 = $("#servicio3").text(),
        cadena4 = $("#servicio4").text();

      //console.log(cadena1, cadena2, cadena3, cadena4);
      let espression = /CONTRASTE/;

      let index1 = cadena1.search(espression),
        index2 = cadena2.search(espression),
        index3 = cadena3.search(espression),
        index4 = cadena4.search(espression);

      if (index1 >= 0 || index2 >= 0 || index3 >= 0 || index4 >= 0) {
        //console.log("contraste encontrado");
        $(".content__parte5_notaMedioDeContraste").css("display", "block");
      } else {
        //console.log("contraste no encontrado");
        $(".content__parte5_notaMedioDeContraste").css("display", "none");
      }
    }

    let iniCant = $("#cantidad").val();
    $("#cantidad").change(function () {
      if ($("#cantidad").val() !== iniCant) {
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#cups").text() == val) {
            let valor = objServiciosNoContratados[val][1];
            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor * $("#cantidad").val()
            );
            $("#valor").text(`$ ${newValorServicio}`);

            //$("#valorTotal").text(`$ ${newValorServicio}`);
          }
        }
      }
    });

    let iniCant2 = $("#cantidad2").val();
    $("#cantidad2").change(function () {
      if ($("#cantidad2").val() !== iniCant2) {
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#cups2").text() == val) {
            let valor = objServiciosNoContratados[val][1];
            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor * $("#cantidad2").val()
            );
            $("#valor2").text(`$ ${newValorServicio}`);

            //$("#valorTotal").text(`$ ${newValorServicio}`);
          }
        }
      }
    });

    let iniCant3 = $("#cantidad3").val();
    $("#cantidad3").change(function () {
      if ($("#cantidad3").val() !== iniCant3) {
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#cups3").text() == val) {
            let valor = objServiciosNoContratados[val][1];
            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor * $("#cantidad3").val()
            );
            $("#valor3").text(`$ ${newValorServicio}`);

            //$("#valorTotal").text(`$ ${newValorServicio}`);
          }
        }
      }
    });

    let iniCant4 = $("#cantidad4").val();
    $("#cantidad4").change(function () {
      if ($("#cantidad4").val() !== iniCant4) {
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#cups4").text() == val) {
            let valor = objServiciosNoContratados[val][1];
            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor * $("#cantidad4").val()
            );
            $("#valor4").text(`$ ${newValorServicio}`);

            //$("#valorTotal").text(`$ ${newValorServicio}`);
          }
        }
      }
    });
  };
  getValuesInputs();

  const getValuesServis = () => {
    for (let servis in objServiciosNoContratados) {
      $("#selectServis").append(
        `<option>${objServiciosNoContratados[servis][0]}</option>`
      );
    }
  };
  getValuesServis();

  $("#addServis").click(() => {
    function hiddenNotaContrate() {
      let cadena1 = $("#servicio").text(),
        cadena2 = $("#servicio2").text(),
        cadena3 = $("#servicio3").text(),
        cadena4 = $("#servicio4").text();

      //console.log(cadena1, cadena2, cadena3, cadena4);
      let espression = /CONTRASTE/;

      let index1 = cadena1.search(espression),
        index2 = cadena2.search(espression),
        index3 = cadena3.search(espression),
        index4 = cadena4.search(espression);

      if (index1 >= 0 || index2 >= 0 || index3 >= 0 || index4 >= 0) {
       // console.log("contraste encontrado");
        $(".content__parte5_notaMedioDeContraste").css("display", "block");
      } else {
        //console.log("contraste no encontrado");
        $(".content__parte5_notaMedioDeContraste").css("display", "none");
      }
    }
    console.log("add");
    $("#selectServis").val("Seleccionar Servicio");
    if ($("#cups").text() !== "") {
      $(".inputCampos2").attr("id", "");
      $(".deleteServis2").click(() => {
        $("#cups2").text("");
        $("#servicio2").text("");
        $("#valor2").text("");
        $("#cantidad2").val("");
        $(".inputCampos2").attr("id", "inputCampos2");
        hiddenNotaContrate();
      });
    }
    if ($("#cups2").text() !== "") {
      $(".inputCampos3").attr("id", "");
      $(".deleteServis2").attr("id", "");
      $(".deleteServis3").click(() => {
        $(".deleteServis2").attr("id", "deleteServis2");
        $("#cups3").text("");
        $("#servicio3").text("");
        $("#valor3").text("");
        $("#cantidad3").val("");
        $(".inputCampos3").attr("id", "inputCampos3");
        hiddenNotaContrate();
      });
    }
    if ($("#cups3").text() !== "") {
      $(".inputCampos4").attr("id", "");
      $(".deleteServis3").attr("id", "");
      $(".deleteServis4").click(() => {
        $(".deleteServis3").attr("id", "deleteServis3");
        $("#cups4").text("");
        $("#servicio4").text("");
        $("#valor4").text("");
        $("#cantidad4").val("");
        $(".inputCampos4").attr("id", "inputCampos4");
        hiddenNotaContrate();
      });
    }
  });
});
