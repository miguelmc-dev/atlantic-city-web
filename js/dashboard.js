// =======================================
// DATOS DE LOCALSTORAGE
// =======================================

const clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

const promociones =
    JSON.parse(localStorage.getItem("promociones")) || [];

const visitas =
    JSON.parse(localStorage.getItem("visitas")) || [];


// =======================================
// MOSTRAR DATOS EN DASHBOARD
// =======================================

document.getElementById("dashClientes").textContent =
    clientes.length;

document.getElementById("dashPromociones").textContent =
    promociones.length;

document.getElementById("dashVisitas").textContent =
    visitas.length;


// Usaremos 4 indicadores disponibles
document.getElementById("dashReportes").textContent = 4;


// =======================================
// FECHA ACTUAL
// =======================================

const fecha = new Date();

const fechaElemento =
    document.getElementById("fechaActual");

if(fechaElemento){

    fechaElemento.textContent =
        fecha.toLocaleDateString("es-PE",{
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        });

}


// =======================================
// USUARIO ACTIVO
// =======================================

const usuario =
    localStorage.getItem("usuarioActivo") ||
    "Administrador";

const usuarioNombre =
    document.getElementById("usuarioNombre");

if(usuarioNombre){

    usuarioNombre.textContent = usuario;

}


// =======================================
// SALUDO
// =======================================

const saludoElemento =
    document.getElementById("saludo");

if(saludoElemento){

    const hora = fecha.getHours();

    let saludo;

    if(hora < 12){

        saludo = "🌞 Buenos días";

    }else if(hora < 18){

        saludo = "☀️ Buenas tardes";

    }else{

        saludo = "🌙 Buenas noches";

    }

    saludoElemento.textContent = saludo;

}


// =======================================
// CERRAR SESIÓN
// =======================================

const btnSalir =
    document.getElementById("btnSalir");

if(btnSalir){

    btnSalir.addEventListener("click",()=>{

        localStorage.removeItem("usuarioActivo");

        window.location.href="login.html";

    });

}
// =======================================
// GRÁFICO DEL DASHBOARD
// =======================================

const canvasGrafico =
    document.getElementById("resumenChart");

if(canvasGrafico){

    const clientesGrafico =
        JSON.parse(localStorage.getItem("clientes")) || [];

    const promocionesGrafico =
        JSON.parse(localStorage.getItem("promociones")) || [];

    const visitasGrafico =
        JSON.parse(localStorage.getItem("visitas")) || [];

    const totalActual =
        clientesGrafico.length +
        promocionesGrafico.length +
        visitasGrafico.length;

    /*
        Datos demostrativos de evolución.
        El último valor toma como referencia
        los registros actuales del sistema.
    */

    const valores = [
        Math.max(1, totalActual - 5),
        Math.max(2, totalActual - 4),
        Math.max(3, totalActual - 2),
        Math.max(4, totalActual - 1),
        Math.max(5, totalActual + 2),
        Math.max(1, totalActual)
    ];

    new Chart(canvasGrafico,{

        type:"line",

        data:{

            labels:[
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago"
            ],

            datasets:[{

                label:"Actividad del sistema",

                data:valores,

                borderColor:"#1260da",

                backgroundColor:"rgba(18,96,218,.10)",

                borderWidth:3,

                pointBackgroundColor:"#1260da",

                pointBorderColor:"#ffffff",

                pointBorderWidth:2,

                pointRadius:5,

                tension:.4,

                fill:true

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{

                    beginAtZero:true,

                    grid:{
                        color:"rgba(0,0,0,.06)"
                    }

                },

                x:{

                    grid:{
                        display:false
                    }

                }

            }

        }

    });

}