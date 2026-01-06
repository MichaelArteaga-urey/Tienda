import {
    obtenerCarrito,
    guardarCarrito,
    obtenerProductos
} from "./storage.js";

const contenedor = document.getElementById("contenedorCarrito");
const totalSpan = document.getElementById("totalCarrito");

let carrito = obtenerCarrito();
let productos = obtenerProductos();

function renderCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        totalSpan.textContent = "$0";
        return;
    }

    carrito.forEach(item => {

        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.className = "item-carrito";

        div.innerHTML = `
            <img src="${producto.imagen}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Subtotal: $${subtotal}</p>
                <button data-id="${item.id}">Eliminar</button>
            </div>
        `;

        div.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        });

        contenedor.appendChild(div);
    });

    totalSpan.textContent = `$${total}`;
}

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito(carrito);
    renderCarrito();
}

renderCarrito();
