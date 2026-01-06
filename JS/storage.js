// storage.js

export function obtenerAlmacenamiento(llave) {
    return JSON.parse(localStorage.getItem(llave));
}

export function guardarAlmacenamiento(llave, valor) {
    localStorage.setItem(llave, JSON.stringify(valor));
}

// Helpers específicos (NO obligatorios todavía)
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

function renderProductos(productos, opciones = {}) {

    const contenedores = {
        onepiece: document.getElementById("tiendaOnepiece"),
        dragonball: document.getElementById("tiendaDragonball"),
        bleach: document.getElementById("tiendaBleach")
    };

    // Limpiar contenedores
    Object.values(contenedores).forEach(c => {
        if (c) c.innerHTML = "";
    });

    productos.forEach(producto => {
        const contenedor = contenedores[producto.categoria];
        if (!contenedor) return;

        const card = crearCardProducto(producto, opciones);
        contenedor.appendChild(card);
    });
}

