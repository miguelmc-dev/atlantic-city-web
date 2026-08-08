// =======================================
// VARIABLES
// =======================================

const codigo = document.getElementById("codigo");
const promocion = document.getElementById("promocion");
const descuento = document.getElementById("descuento");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const estado = document.getElementById("estado");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");

const buscar = document.getElementById("buscar");
const tabla = document.getElementById("tablaPromociones");

let promociones = JSON.parse(localStorage.getItem("promociones")) || [];
let indiceEditar = -1;

// =======================================
// MOSTRAR PROMOCIONES
// =======================================

function mostrarPromociones(lista = promociones){

    tabla.innerHTML = "";

    lista.forEach((promo,index)=>{

        tabla.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${promo.codigo}</td>

            <td>${promo.promocion}</td>

            <td>${promo.descuento}%</td>

            <td>${promo.fechaInicio}</td>

            <td>${promo.fechaFin}</td>

            <td>${promo.estado}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarPromocion(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarPromocion(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

mostrarPromociones();

// =======================================
// VALIDAR
// =======================================

function validar(){

    if(
        codigo.value.trim()==="" ||
        promocion.value.trim()==="" ||
        descuento.value.trim()==="" ||
        fechaInicio.value==="" ||
        fechaFin.value===""

    ){

        Swal.fire({
            icon:"warning",
            title:"Campos incompletos",
            text:"Complete todos los campos."
        });

        return false;

    }

    if(Number(descuento.value)<=0 || Number(descuento.value)>100){

        Swal.fire({
            icon:"error",
            title:"Descuento inválido",
            text:"Ingrese un porcentaje entre 1 y 100."
        });

        return false;

    }

    return true;

}

// =======================================
// LIMPIAR
// =======================================

function limpiar(){

    codigo.value="";
    promocion.value="";
    descuento.value="";
    fechaInicio.value="";
    fechaFin.value="";
    estado.value="Activa";

    indiceEditar=-1;

    btnGuardar.style.display="inline-block";
    btnActualizar.style.display="none";

}

// =======================================
// GUARDAR
// =======================================

btnGuardar.addEventListener("click",()=>{

    if(!validar()) return;

    promociones.push({

        codigo:codigo.value,

        promocion:promocion.value,

        descuento:descuento.value,

        fechaInicio:fechaInicio.value,

        fechaFin:fechaFin.value,

        estado:estado.value

    });

    localStorage.setItem(
        "promociones",
        JSON.stringify(promociones)
    );

    mostrarPromociones();

    limpiar();

    Swal.fire({

        icon:"success",

        title:"Promoción registrada",

        text:"La promoción fue registrada correctamente.",

        timer:1800,

        showConfirmButton:false

    });

});

// =======================================
// ELIMINAR
// =======================================

function eliminarPromocion(index){

    Swal.fire({

        title:"¿Eliminar promoción?",

        text:"Esta acción no se puede deshacer.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonColor:"#d33",

        cancelButtonColor:"#3085d6",

        confirmButtonText:"Sí, eliminar",

        cancelButtonText:"Cancelar"

    }).then((result)=>{

        if(result.isConfirmed){

            promociones.splice(index,1);

            localStorage.setItem(
                "promociones",
                JSON.stringify(promociones)
            );

            mostrarPromociones();

            Swal.fire({

                icon:"success",

                title:"Eliminada",

                text:"La promoción fue eliminada.",

                timer:1800,

                showConfirmButton:false

            });

        }

    });

}

// =======================================
// EDITAR
// =======================================

function editarPromocion(index){

    indiceEditar=index;

    const promo=promociones[index];

    codigo.value=promo.codigo;
    promocion.value=promo.promocion;
    descuento.value=promo.descuento;
    fechaInicio.value=promo.fechaInicio;
    fechaFin.value=promo.fechaFin;
    estado.value=promo.estado;

    btnGuardar.style.display="none";
    btnActualizar.style.display="inline-block";

}

// =======================================
// ACTUALIZAR
// =======================================

btnActualizar.addEventListener("click",()=>{

    if(!validar()) return;

    promociones[indiceEditar]={

        codigo:codigo.value,

        promocion:promocion.value,

        descuento:descuento.value,

        fechaInicio:fechaInicio.value,

        fechaFin:fechaFin.value,

        estado:estado.value

    };

    localStorage.setItem(
        "promociones",
        JSON.stringify(promociones)
    );

    mostrarPromociones();

    limpiar();

    Swal.fire({

        icon:"success",

        title:"Promoción actualizada",

        text:"Los cambios fueron guardados correctamente.",

        timer:1800,

        showConfirmButton:false

    });

});

// =======================================
// BUSCAR
// =======================================

buscar.addEventListener("keyup",()=>{

    const texto=buscar.value.toLowerCase();

    const resultado=promociones.filter(promo=>

        promo.codigo.toLowerCase().includes(texto) ||

        promo.promocion.toLowerCase().includes(texto)

    );

    mostrarPromociones(resultado);

});