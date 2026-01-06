import {
    obtenerProductos,
    guardarProductos,
    inicializarStorage
} from "/JS/storage.js";
import { renderProductos } from "/JS/dom.js";
/* ===============================
   INICIALIZACIÓN
================================ */
inicializarStorage();
const productos = obtenerProductos();

/* ===============================
   ELEMENTOS DEL DOM
================================ */
const mensaje = document.getElementById("mensaje");

// AÑADIR
const añadirProducto = document.getElementById("productoAñadir");
const añadirValor = document.getElementById("valorAñadir");
const añadirExistencia = document.getElementById("existenciaAñadir");
const añadirDescripcion = document.getElementById("descripcionAñadir");
const añadirImagen = document.getElementById("ImagenAñadir");
const añadirCategoria = document.getElementById("categoriaAñadir");

// EDITAR
const productoEd = document.getElementById("productoEditar");
const atributoEd = document.getElementById("atributoEditar");
const nuevoAtributoEd = document.getElementById("nuevoAtributo");

// ELIMINAR
const productoE = document.getElementById("productoEliminar");

/* ===============================
   AÑADIR PRODUCTO
================================ */
document.getElementById("botonAñadir").addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = añadirProducto.value.trim();
    const precio = Number(añadirValor.value);
    const stock = Number(añadirExistencia.value);
    const descripcion = añadirDescripcion.value.trim();
    const imagen = añadirImagen.value.trim();
    const categoria = añadirCategoria.value;

    if (!nombre || !precio || !stock || !descripcion || !imagen || !categoria) {
        mensaje.classList.add("llenarCampos");
        setTimeout(() => mensaje.classList.remove("llenarCampos"), 2500);
        return;
    }

    if (productos.some(p => p.nombre === nombre)) {
        mensaje.classList.add("repetidoError");
        setTimeout(() => mensaje.classList.remove("repetidoError"), 2500);
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio,
        stock,
        descripcion,
        imagen,
        categoria
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    mensaje.classList.add("realizado");
    setTimeout(() => window.location.reload(), 1500);
});

/* ===============================
   EDITAR PRODUCTO
================================ */
document.getElementById("botonEditar").addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = productoEd.value;
    const atributo = atributoEd.value;
    let nuevoValor = nuevoAtributoEd.value;

    if (!nombre || !atributo || !nuevoValor) {
        mensaje.classList.add("llenarCampos");
        setTimeout(() => mensaje.classList.remove("llenarCampos"), 2500);
        return;
    }

    const producto = productos.find(p => p.nombre === nombre);

    if (!producto) {
        mensaje.classList.add("noExisteError");
        setTimeout(() => mensaje.classList.remove("noExisteError"), 2500);
        return;
    }

    if (atributo === "precio" || atributo === "stock") {
        nuevoValor = Number(nuevoValor);
    }

    producto[atributo] = nuevoValor;
    guardarProductos(productos);

    mensaje.classList.add("realizado");
    setTimeout(() => window.location.reload(), 1500);
});

/* ===============================
   ELIMINAR PRODUCTO
================================ */
document.getElementById("botonEliminar").addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = productoE.value;
    const index = productos.findIndex(p => p.nombre === nombre);

    if (index === -1) {
        mensaje.classList.add("noExisteError");
        setTimeout(() => mensaje.classList.remove("noExisteError"), 2500);
        return;
    }

    productos.splice(index, 1);
    guardarProductos(productos);

    mensaje.classList.add("realizado");
    setTimeout(() => window.location.reload(), 1500);
});


    window.addEventListener("DOMContentLoaded", () => {
    console.log("Admin DOM cargado");
    console.log("Productos:", productos);

    renderProductos(productos, { mostrarBotones: false });
});

