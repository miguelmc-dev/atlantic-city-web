// ==========================================
// VARIABLES
// ==========================================

const nombre = document.getElementById("nombre");
const dni = document.getElementById("dni");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");

const categoria = document.getElementById("categoria");
const preferencia = document.getElementById("preferencia");

const estado = document.getElementById("estado");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");

const buscar = document.getElementById("buscar");
const tabla = document.getElementById("tablaClientes");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let indiceEditar = -1;


// ==========================================
// MOSTRAR CLIENTES
// ==========================================

function mostrarClientes(lista = clientes){

    tabla.innerHTML = "";

    lista.forEach((cliente, index) => {

        tabla.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${cliente.nombre}</td>

                <td>${cliente.dni}</td>

                <td>${cliente.correo}</td>

                <td>${cliente.telefono}</td>

                <td>
                    ${cliente.categoria || "Sin categoría"}
                </td>

                <td>
                    ${cliente.preferencia || "Sin preferencia"}
                </td>

                <td>${cliente.estado}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editarCliente(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarCliente(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

mostrarClientes();


// ==========================================
// VALIDACIONES
// ==========================================

function validar(){

    // ===============================
    // EXPRESIONES REGULARES
    // ===============================

    const regexDNI = /^\d{8}$/;
    const regexTelefono = /^9\d{8}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // CAMPOS OBLIGATORIOS

    if(
        nombre.value.trim() === "" ||
        dni.value.trim() === "" ||
        correo.value.trim() === "" ||
        telefono.value.trim() === "" ||
        categoria.value === ""
    ){

        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Complete todos los campos obligatorios."
        });

        return false;
    }


    // VALIDAR DNI

    if(!regexDNI.test(dni.value)){

        Swal.fire({
            icon: "error",
            title: "DNI inválido",
            text: "El DNI debe contener exactamente 8 números."
        });

        return false;
    }


    // VALIDAR TELÉFONO

    if(!regexTelefono.test(telefono.value)){

        Swal.fire({
            icon: "error",
            title: "Teléfono inválido",
            text: "Ingrese un celular válido de 9 dígitos."
        });

        return false;
    }


    // VALIDAR CORREO

    if(!regexCorreo.test(correo.value)){

        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingrese un correo electrónico válido."
        });

        return false;
    }


    return true;
}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiar(){

    nombre.value = "";
    dni.value = "";
    correo.value = "";
    telefono.value = "";

    categoria.value = "";
    preferencia.value = "";

    estado.value = "Activo";

    indiceEditar = -1;

    btnGuardar.style.display = "inline-block";
    btnActualizar.style.display = "none";

}


// ==========================================
// GUARDAR CLIENTE
// ==========================================

btnGuardar.addEventListener("click", () => {

    if(!validar()) return;


    const nuevoCliente = {

        nombre: nombre.value,
        dni: dni.value,
        correo: correo.value,
        telefono: telefono.value,

        // Segmentación
        categoria: categoria.value,

        // Preferencia del cliente
        preferencia: preferencia.value,

        estado: estado.value

    };


    clientes.push(nuevoCliente);


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );


    mostrarClientes();

    limpiar();


    Swal.fire({

        icon: "success",

        title: "¡Registro exitoso!",

        text: "El cliente fue registrado correctamente.",

        timer: 1800,

        showConfirmButton: false

    });

});


// ==========================================
// ELIMINAR CLIENTE
// ==========================================

function eliminarCliente(index){

    Swal.fire({

        title: "¿Eliminar cliente?",

        text: "Esta acción no se puede deshacer.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#3085d6",

        confirmButtonText: "Sí, eliminar",

        cancelButtonText: "Cancelar"

    }).then((result) => {


        if(result.isConfirmed){

            clientes.splice(index, 1);


            localStorage.setItem(
                "clientes",
                JSON.stringify(clientes)
            );


            mostrarClientes();


            Swal.fire({

                icon: "success",

                title: "Eliminado",

                text: "El cliente fue eliminado correctamente.",

                timer: 1800,

                showConfirmButton: false

            });

        }

    });

}


// ==========================================
// EDITAR CLIENTE
// ==========================================

function editarCliente(index){

    indiceEditar = index;

    const cliente = clientes[index];


    nombre.value = cliente.nombre;

    dni.value = cliente.dni;

    correo.value = cliente.correo;

    telefono.value = cliente.telefono;


    // Recuperar segmentación
    categoria.value =
        cliente.categoria || "";


    // Recuperar preferencia
    preferencia.value =
        cliente.preferencia || "";


    estado.value =
        cliente.estado;


    btnGuardar.style.display = "none";

    btnActualizar.style.display = "inline-block";

}


// ==========================================
// ACTUALIZAR CLIENTE
// ==========================================

btnActualizar.addEventListener("click", () => {

    if(!validar()) return;


    clientes[indiceEditar] = {

        nombre: nombre.value,

        dni: dni.value,

        correo: correo.value,

        telefono: telefono.value,

        categoria: categoria.value,

        preferencia: preferencia.value,

        estado: estado.value

    };


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );


    mostrarClientes();

    limpiar();


    Swal.fire({

        icon: "success",

        title: "¡Actualizado!",

        text: "Los datos del cliente fueron actualizados.",

        timer: 1800,

        showConfirmButton: false

    });

});


// ==========================================
// BUSCAR CLIENTES
// ==========================================

buscar.addEventListener("keyup", () => {

    const texto =
        buscar.value.toLowerCase();


    const resultado =
        clientes.filter(cliente =>

            cliente.nombre
                .toLowerCase()
                .includes(texto)

            ||

            cliente.dni
                .includes(texto)

            ||

            (cliente.categoria || "")
                .toLowerCase()
                .includes(texto)

            ||

            (cliente.preferencia || "")
                .toLowerCase()
                .includes(texto)

        );


    mostrarClientes(resultado);

});