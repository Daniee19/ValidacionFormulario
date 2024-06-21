const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{8,16}$/, // 8 a 16 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{9}$/ // 9 numeros.
}
//Objeto "campos" con sus respectivas propiedades...
//Los valores asignados son false
const campos = {
    usuario: false,
    nombre: false,
    contrasena: false,
    contrasena2: false,
    correo: false,
    telefono: false
}

const validar_formulario = (e) => {
    //El target.name trae el name del input, cada vez que se escriben caracteres en el input
    switch (e.target.name) {
        case "usuario":
            validar_campo(expresiones.usuario, e.target, 'usuario');
            break;
        case "nombre":
            validar_campo(expresiones.nombre, e.target, 'nombre');
            break;
        case "contrasena":
            validadPassword2();
            validar_campo(expresiones.password, e.target, 'contrasena');

            break;
        case "contrasena2":
            validadPassword2();
            break;
        case "correo":
            validar_campo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validar_campo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}
const validar_campo = (expresion, input, campo) => {
    //1.Se obtiene el valor del input usuario
    //2.Se valida con la verificacion de expresiones de usuario
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input_error`).classList.remove('formulario__input_error_activo');
        campos[campo] = true;
    } else {
        //Se encarga de darle una opacidad a los iconos, y el color rojo más que nada
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_correcto');
        //Cambia los iconos
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        //Se encarga de agregar el texto de error
        document.querySelector(`#grupo__${campo} .formulario__input_error`).classList.add('formulario__input_error_activo');
        campos[campo] = false;
    }
}
const validadPassword2 = () => {
    const inputPassword = document.getElementById('contrasena');
    const inputPassword2 = document.getElementById('contrasena2');
    //No se aplica una expresion regular como tal, pero si se identifica si es igual a la contraseña
    if (inputPassword.value !== inputPassword2.value) {
        //Se encarga de darle una opacidad a los iconos, y el color rojo más que nada
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo_incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo_correcto');
        //Cambia los iconos
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        //Se encarga de agregar el texto de error
        document.querySelector(`#grupo__contrasena2 .formulario__input_error`).classList.add('formulario__input_error_activo');
        campos['contrasena2'] = false;
    } else {
        //Se encarga de darle una opacidad a los iconos, y el color rojo más que nada
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo_incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo_correcto');
        //Cambia los iconos
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-check-circle');
        //Se encarga de agregar el texto de error
        document.querySelector(`#grupo__contrasena2 .formulario__input_error`).classList.remove('formulario__input_error_activo');
        campos['contrasena2'] = true;
    }
}

//Se hace un forEach porque se llamó a multiples
//interfaces graficas que son los input
inputs.forEach((input) => {
    //Se ejecutará validar_formulario cuando se salga del input
    input.addEventListener('keyup', validar_formulario);
    //Se ejecutará validar_formulario cuando ingrese caracteres al input
    input.addEventListener('blur', validar_formulario);
});
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');

    //No es necesario poner contrasena2, ya que el campos.password se convertirá a true solo si existe una igualdad entre contrasena y contrasena2
    if (campos.usuario && campos.nombre && campos.contrasena && campos.contrasena2 && campos.correo && campos.telefono && terminos.checked) {
        //Borrar los valores de los inputs
        formulario.reset();
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje_activo');
        document.getElementById('formulario__mensaje_exito').classList.add('formulario__mensaje_exito_activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje_exito').classList.remove('formulario__mensaje_exito_activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo_correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo_correcto');
        });

        for (const t in campos) {
            campos[t] = false;
        }
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje_activo');
    }

});
