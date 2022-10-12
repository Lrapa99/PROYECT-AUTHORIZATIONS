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
    $("#cups").val('');
    $("#servicio").val("");
    $("#valor").val("");
    $("#cantidad").val("");
    $("#valorTotal").text("$ 0");
  }

  const getValuesInputs = () => {
    let inicial = $("#selectServis").val();
    $("#selectServis").change(function () {
      if ($("#selectServis").val() !== inicial) {
        //alert("El campo ha cambiado");
        //console.log($("#cups").val());
        clearInputs();
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#selectServis").val() == objServiciosNoContratados[val][0]) {
            let servicio = objServiciosNoContratados[val][0];
            let valor = objServiciosNoContratados[val][1];

            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor
            );
            $("#cups").val(val);
            $("#servicio").val(servicio);
            $("#valor").val(`$ ${newValorServicio}`);
            $("#cantidad").val(1);

            $("#valorTotal").text(`$ ${newValorServicio}`);


            //$("#selectServis").val('')
          }
        }
      } else {
        clearInputs();
      }
    });

    let iniCant = $("#cantidad").val();
    $("#cantidad").change(function () {
      if ($("#cantidad").val() !== iniCant) {
        for (let val in objServiciosNoContratados) {
          //console.log(val);

          if ($("#cups").val() == val) {
            let valor = objServiciosNoContratados[val][1];

            let newValorServicio = new Intl.NumberFormat("es-419").format(
              valor * $("#cantidad").val()
            );
            $("#valor").val(`$ ${newValorServicio}`);

            $("#valorTotal").text(`$ ${newValorServicio}`);
          }
        }
      }
    });
  };
  getValuesInputs();

  const getValuesServis = () => {
    for (let servis in objServiciosNoContratados) {
      $("#datalistOptions__Servicios").append(
        `<option value='${objServiciosNoContratados[servis][0]}'>`
      );
    }
  };
  getValuesServis();
});
