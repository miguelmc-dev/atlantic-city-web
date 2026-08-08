// =======================================
// OBTENER INFORMACIÓN DE LOCALSTORAGE
// =======================================

const clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

const promociones =
    JSON.parse(localStorage.getItem("promociones")) || [];

const visitas =
    JSON.parse(localStorage.getItem("visitas")) || [];


// =======================================
// CALCULAR INDICADORES
// =======================================

const totalClientes = clientes.length;

const totalPromociones = promociones.length;

const totalVisitas = visitas.length;

const totalActivas = promociones.filter(
    promocion => promocion.estado === "Activa"
).length;

const totalVip = visitas.filter(
    visita => visita.tipoCliente === "VIP"
).length;


// =======================================
// MOSTRAR TARJETAS
// =======================================

document.getElementById("totalClientes").textContent =
    totalClientes;

document.getElementById("totalPromociones").textContent =
    totalPromociones;

document.getElementById("totalVisitas").textContent =
    totalVisitas;

document.getElementById("promocionesActivas").textContent =
    totalActivas;


// =======================================
// MOSTRAR TABLA
// =======================================

document.getElementById("tablaClientes").textContent =
    totalClientes;

document.getElementById("tablaPromociones").textContent =
    totalPromociones;

document.getElementById("tablaActivas").textContent =
    totalActivas;

document.getElementById("tablaVisitas").textContent =
    totalVisitas;

document.getElementById("clientesVip").textContent =
    totalVip;


// =======================================
// FECHA DEL REPORTE
// =======================================

const fecha = new Date();

document.getElementById("fechaReporte").textContent =
    fecha.toLocaleDateString("es-PE",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    });


// =======================================
// IMPRIMIR REPORTE
// =======================================

document.getElementById("btnImprimir")
.addEventListener("click",()=>{

    window.print();

});
// =======================================
// GRÁFICO TIPO DONA
// =======================================

const graficoReportes =
    document.getElementById("graficoReportes");

if(graficoReportes){

    new Chart(graficoReportes,{

        type:"doughnut",

        data:{

            labels:[
                "Clientes",
                "Promociones",
                "Visitas",
                "Promociones Activas"
            ],

            datasets:[{

                data:[
                    totalClientes,
                    totalPromociones,
                    totalVisitas,
                    totalActivas
                ],

                backgroundColor:[
                    "#2563eb",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444"
                ],

                borderColor:"#ffffff",

                borderWidth:4,

                hoverOffset:12

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            cutout:"68%",

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{

                        padding:20,

                        font:{
                            family:"Poppins",
                            size:13
                        }

                    }

                },

                tooltip:{

                    callbacks:{

                        label:function(context){

                            return ` ${context.label}: ${context.raw}`;

                        }

                    }

                }

            }

        }

    });

}
// =====================================================
// ANÁLISIS DE INFORMACIÓN
// =====================================================

// Recuperar información almacenada
const visitasAnalisis =
    JSON.parse(localStorage.getItem("visitas")) || [];

const promocionesAnalisis =
    JSON.parse(localStorage.getItem("promociones")) || [];

const clientesAnalisis =
    JSON.parse(localStorage.getItem("clientes")) || [];


// =====================================================
// 1. CLIENTE MÁS ACTIVO
// =====================================================

const contadorVisitas = {};

visitasAnalisis.forEach(visita => {

    const nombreCliente = visita.cliente;

    if(nombreCliente){

        contadorVisitas[nombreCliente] =
            (contadorVisitas[nombreCliente] || 0) + 1;

    }

});


let clienteActivo = "Sin registros";
let mayorNumeroVisitas = 0;


Object.entries(contadorVisitas).forEach(([nombre, cantidad]) => {

    if(cantidad > mayorNumeroVisitas){

        clienteActivo = nombre;
        mayorNumeroVisitas = cantidad;

    }

});


const elementoCliente =
    document.getElementById("clienteMasActivo");

const elementoVisitas =
    document.getElementById("visitasClienteActivo");


if(elementoCliente){

    elementoCliente.textContent =
        clienteActivo;

}


if(elementoVisitas){

    elementoVisitas.textContent =
        `${mayorNumeroVisitas} visita${mayorNumeroVisitas !== 1 ? "s" : ""} registrada${mayorNumeroVisitas !== 1 ? "s" : ""}`;

}


// =====================================================
// 2. PROMOCIÓN DESTACADA
//    Promoción activa con mayor descuento
// =====================================================

const promocionesActivasAnalisis =
    promocionesAnalisis.filter(promo =>
        (promo.estado || "").toLowerCase() === "activa"
    );


let promocionMayorDescuento = null;


promocionesActivasAnalisis.forEach(promo => {

    if(
        promocionMayorDescuento === null ||
        Number(promo.descuento) >
        Number(promocionMayorDescuento.descuento)
    ){

        promocionMayorDescuento = promo;

    }

});


const elementoPromocion =
    document.getElementById("promocionDestacada");


if(elementoPromocion){

    if(promocionMayorDescuento){

        elementoPromocion.textContent =
            `${promocionMayorDescuento.promocion} - ${promocionMayorDescuento.descuento}%`;

    }else{

        elementoPromocion.textContent =
            "Sin promociones activas";

    }

}


// =====================================================
// 3. TOTAL DE CLIENTES VIP
// =====================================================

const clientesVIP =
    clientesAnalisis.filter(cliente =>
        (cliente.categoria || "").toLowerCase() === "vip"
    );


const elementoVIP =
    document.getElementById("totalVip");


if(elementoVIP){

    elementoVIP.textContent =
        clientesVIP.length;

}