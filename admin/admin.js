/*EXPORTAR DESDE OTROS ARCHIVOS JS LAS FUNCIONES  */

import {
    obtenerProductos,
    guardarProductos,
    inicializarStorage
} from "../JS/storage.js";

import { renderProductos } from "../JS/dom.js";

/*INICIALIZACIÓN DE LA BASE LOCAL DE DATOS*/

inicializarStorage();
let productos = obtenerProductos();

//CONSTANTES QUE SE UTILIZARAN EN LAS FUNCIONES QUE VAMOS A UTILIZAR EN ADMIN 
//YA SEA PARA AÑADIR, EDITAR, ELIMINAR NUESTROS PRODUCTOS

/*AÑADIMOS UN MENSAJE PARA LOS CONDICIONALES */


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

//FUNCIONES


function mostrarMensaje(clase) {
    mensaje.className = "";
    mensaje.classList.add(clase);
    setTimeout(() => mensaje.className = "", 2500);
}

function recargar() {
    guardarProductos(productos);
    setTimeout(() => location.reload(), 1200);
}

// AÑADIR PRODUCTO

document.getElementById("botonAñadir")?.addEventListener("click", (e) => {
    e.preventDefault();

// CREAMOS LA CONTANTE DE NUEVO PRODUCTO DENTRO DEL MISMO ABRA LOS CAMPOS ID , NOMBRE PRECIO, STOCK, DESCRIPCION, IMAGEN, CATEGORIA
// LA CATEGORIA DE MOMENTO SE DIVIDE EN TRES  
    const nuevoProducto = {
        id: Date.now(),
        nombre: añadirProducto.value.trim(),
        precio: Number(añadirValor.value),
        stock: Number(añadirExistencia.value),
        descripcion: añadirDescripcion.value.trim(),
        imagen: añadirImagen.value.trim(),
        categoria: añadirCategoria.value
    };
// CONDICIONALES PARA NO LOS CAMPOS 
// SI ESTAN VACIOS ALGUNOS CAMPOS 

    if (Object.values(nuevoProducto).some(v => !v)) {
        mostrarMensaje("llenarCampos");
        return;
    }
// SI YA TENEMOS EL PRODUCTO
    if (productos.some(p => p.nombre === nuevoProducto.nombre)) {
        mostrarMensaje("repetidoError");
        return;
    }
//UNA VES LLENADOS LOS CAMPOS SE REALIZA NOS DARA UN MENSAJE DE REALIZADO 
    productos.push(nuevoProducto);
    mostrarMensaje("realizado");
    recargar();
});

//EDITAR PRODUCTO

document.getElementById("botonEditar")?.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = productoEd.value;
    const atributo = atributoEd.value;
    let nuevoValor = nuevoAtributoEd.value;

    const producto = productos.find(p => p.nombre === nombre);

    if (!producto || !atributo || !nuevoValor) {
        mostrarMensaje("llenarCampos");
        return;
    }

    if (atributo === "precio" || atributo === "stock") {
        nuevoValor = Number(nuevoValor);
    }

    producto[atributo] = nuevoValor;
    mostrarMensaje("realizado");
    recargar();
});

//   ELIMINAR PRODUCTO

document.getElementById("botonEliminar")?.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = productoE.value;
    const index = productos.findIndex(p => p.nombre === nombre);

    if (index === -1) {
        mostrarMensaje("noExisteError");
        return;
    }

    productos.splice(index, 1);
    mostrarMensaje("realizado");
    recargar();
});

/* ===============================
   DOMContentLoaded es un evento del navegador que se dispara cuando Todo el HTML ya fue cargado y convertido en DOM
   el Dom es la representacion del html en carpetas
================================ */

window.addEventListener("DOMContentLoaded", () => {

    productoEd.innerHTML = `<option value="">Seleccione el Producto</option>`;
    productoE.innerHTML = `<option value="">Seleccione el Producto</option>`;
    atributoEd.innerHTML = `<option value="">Seleccione Atributo</option>`;


    productos.forEach(p => {
        productoEd.innerHTML += `<option value="${p.nombre}">${p.nombre}</option>`;
        productoE.innerHTML += `<option value="${p.nombre}">${p.nombre}</option>`;
    });

    if (productos.length > 0) {
        Object.keys(productos[0]).forEach(key => {
            if (key !== "id") {
                atributoEd.innerHTML += `<option value="${key}">${key}</option>`;
            }
        });
    }

    renderProductos(productos, { mostrarBotones: false });
});
