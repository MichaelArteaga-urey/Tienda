import { actualizarContadorCarrito } from "./contador.js";
export function obtenerAlmacenamiento(llave) {
    return JSON.parse(localStorage.getItem(llave));
}

export function guardarAlmacenamiento(llave, valor) {
    localStorage.setItem(llave, JSON.stringify(valor));
}

export function obtenerProductos() {
    return obtenerAlmacenamiento("productos") || [];
}

export function guardarProductos(productos) {
    guardarAlmacenamiento("productos", productos);
}
const KEY_CARRITO = "carrito";

export function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
}



export function inicializarStorage() {
    if (!localStorage.getItem("productos")) {
        guardarProductos([]);
    }
    if (!localStorage.getItem("carrito")) {
        guardarCarrito([]);
    }
}

