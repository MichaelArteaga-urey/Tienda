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

function renderProductos(productos, opciones = {}) {

    const contenedores = {
        onepiece: document.getElementById("tiendaOnepiece"),
        dragonball: document.getElementById("tiendaDragonball"),
        bleach: document.getElementById("tiendaBleach"),
        marvel:document.getElementById("tiendaMarvel")
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
// AGREGAR PRODUCTOS

//=====================================0
// AGREGAR AL CARRITO
//=====================================

export function agregarProducto(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}
