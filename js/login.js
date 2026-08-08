const usuarioSistema="admin";

const claveSistema="123456";

const formulario=document.querySelector("form");

const usuario=document.querySelector('input[type="text"]');

const password=document.getElementById("password");

const mensaje=document.getElementById("mensaje");

const btn=document.getElementById("btnLogin");

const ojo=document.getElementById("togglePassword");

ojo.addEventListener("click",()=>{

    if(password.type==="password"){

        password.type="text";

        ojo.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

    }else{

        password.type="password";

        ojo.innerHTML='<i class="fa-solid fa-eye"></i>';

    }

});

function mostrarMensaje(texto,tipo){

    mensaje.style.display="block";

    mensaje.className=tipo;

    mensaje.innerHTML=texto;

}

formulario.addEventListener("submit",function(e){

    e.preventDefault();

    mensaje.style.display="none";

    if(usuario.value.trim()===""){

        mostrarMensaje("Ingrese el usuario","error");

        return;

    }

    if(password.value.trim()===""){

        mostrarMensaje("Ingrese la contraseña","error");

        return;

    }

    if(usuario.value===usuarioSistema && password.value===claveSistema){

        mostrarMensaje("Bienvenido al sistema","correcto");
        localStorage.setItem("usuarioActivo","Administrador");

        btn.classList.add("loading");

        btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Ingresando...';

        setTimeout(()=>{
            

            window.location.href="dashboard.html";

        },1500);

    }else{

        mostrarMensaje("Usuario o contraseña incorrectos","error");

    }

});