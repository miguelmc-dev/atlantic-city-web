// =======================================
// VARIABLES
// =======================================

const cliente = document.getElementById("cliente");
const dni = document.getElementById("dni");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const tipoCliente = document.getElementById("tipoCliente");
const estado = document.getElementById("estado");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");

const buscar = document.getElementById("buscar");
const tabla = document.getElementById("tablaVisitas");

let visitas = JSON.parse(localStorage.getItem("visitas")) || [];

let indiceEditar = -1;


// =======================================
// MOSTRAR VISITAS
// =======================================

function mostrarVisitas(lista = visitas){

    tabla.innerHTML = "";

    lista.forEach((visita,index)=>{

        tabla.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${visita.cliente}</td>

            <td>${visita.dni}</td>

            <td>${visita.fecha}</td>

            <td>${visita.hora}</td>

            <td>${visita.tipoCliente}</td>

            <td>${visita.estado}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarVisita(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarVisita(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

mostrarVisitas();


// =======================================
// VALIDACIONES
// =======================================

function validar(){

    if(
        cliente.value.trim() === "" ||
        dni.value.trim() === "" ||
        fecha.value === "" ||
        hora.value === ""
    ){

        Swal.fire({
            icon:"warning",
            title:"Campos incompletos",
            text:"Complete todos los campos obligatorios."
        });

        return false;
    }

    if(dni.value.length !== 8 || isNaN(dni.value)){

        Swal.fire({
            icon:"error",
            title:"DNI inválido",
            text:"El DNI debe contener exactamente 8 números."
        });

        return false;
    }

    return true;

}


// =======================================
// LIMPIAR FORMULARIO
// =======================================

function limpiar(){

    cliente.value = "";
    dni.value = "";
    fecha.value = "";
    hora.value = "";

    tipoCliente.value = "Regular";
    estado.value = "Registrada";

    indiceEditar = -1;

    btnGuardar.style.display = "inline-block";
    btnActualizar.style.display = "none";

}


// =======================================
// GUARDAR VISITA
// =======================================

btnGuardar.addEventListener("click",()=>{

    if(!validar()) return;

    visitas.push({

        cliente: cliente.value.trim(),

        dni: dni.value.trim(),

        fecha: fecha.value,

        hora: hora.value,

        tipoCliente: tipoCliente.value,

        estado: estado.value

    });

    localStorage.setItem(
        "visitas",
        JSON.stringify(visitas)
    );

    mostrarVisitas();

    limpiar();

    Swal.fire({

        icon:"success",

        title:"Visita registrada",

        text:"La visita fue registrada correctamente.",

        timer:1800,

        showConfirmButton:false

    });

});


// =======================================
// EDITAR VISITA
// =======================================

function editarVisita(index){

    indiceEditar = index;

    const visita = visitas[index];

    cliente.value = visita.cliente;

    dni.value = visita.dni;

    fecha.value = visita.fecha;

    hora.value = visita.hora;

    tipoCliente.value = visita.tipoCliente;

    estado.value = visita.estado;

    btnGuardar.style.display = "none";

    btnActualizar.style.display = "inline-block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


// =======================================
// ACTUALIZAR VISITA
// =======================================

btnActualizar.addEventListener("click",()=>{

    if(!validar()) return;

    visitas[indiceEditar] = {

        cliente: cliente.value.trim(),

        dni: dni.value.trim(),

        fecha: fecha.value,

        hora: hora.value,

        tipoCliente: tipoCliente.value,

        estado: estado.value

    };

    localStorage.setItem(
        "visitas",
        JSON.stringify(visitas)
    );

    mostrarVisitas();

    limpiar();

    Swal.fire({

        icon:"success",

        title:"Visita actualizada",

        text:"Los datos fueron actualizados correctamente.",

        timer:1800,

        showConfirmButton:false

    });

});


// =======================================
// ELIMINAR VISITA
// =======================================

function eliminarVisita(index){

    Swal.fire({

        title:"¿Eliminar visita?",

        text:"Esta acción no se puede deshacer.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonColor:"#d33",

        cancelButtonColor:"#3085d6",

        confirmButtonText:"Sí, eliminar",

        cancelButtonText:"Cancelar"

    }).then((result)=>{

        if(result.isConfirmed){

            visitas.splice(index,1);

            localStorage.setItem(
                "visitas",
                JSON.stringify(visitas)
            );

            mostrarVisitas();

            Swal.fire({

                icon:"success",

                title:"Visita eliminada",

                text:"El registro fue eliminado correctamente.",

                timer:1800,

                showConfirmButton:false

            });

        }

    });

}


// =======================================
// BUSCAR VISITAS
// =======================================

buscar.addEventListener("keyup",()=>{

    const texto = buscar.value.toLowerCase().trim();

    const resultado = visitas.filter(visita =>

        visita.cliente.toLowerCase().includes(texto) ||

        visita.dni.includes(texto)

    );

    mostrarVisitas(resultado);

});