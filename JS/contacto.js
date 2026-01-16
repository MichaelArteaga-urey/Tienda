
const registro = document.getElementById("Registro");

// EXPRESIONES REGULARES
const patrones = {
    usuario: /^[a-zA-Z][a-zA-Z0-9_]{7,29}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

// MOSTRAR ERROR
const mostrarError = (id, mensaje) => {
    const error = document.getElementById(`err-${id}`);
    const input = document.getElementById(id);

    error.innerText = mensaje;
    input.classList.add("input-error");
};

// LIMPIAR ERRORES
function limpiarErrores() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("input-error"));
}

// LIMPIAR FORMULARIO
function limpiarFormulario() {
    registro.reset();
    limpiarErrores();
}

// VALIDACIÓN AL ENVIAR
registro.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    let valido = true;

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;

    // Usuario
    if (!patrones.usuario.test(username)) {
        mostrarError("username", "Usuario inválido (8-30 caracteres)");
        valido = false;
    }

    // Email
    if (!patrones.email.test(email)) {
        mostrarError("email", "Email no válido");
        valido = false;
    }

    // Password
    if (!patrones.password.test(password)) {
        mostrarError(
            "password",
            "Debe tener 7-15 caracteres, un número y un símbolo"
        );
        valido = false;
    }

    // Confirmar password
    if (password !== confirmpassword) {
        mostrarError("confirmpassword", "Las contraseñas no coinciden");
        valido = false;
    }

    // RESULTADO
    if (valido) {
        alert("Registro exitoso");
        limpiarFormulario();
    }
});
