import { crearCardProducto } from "./cartas.js";

export function renderProductos(productos, opciones = {}) {

    const contenedores = document.querySelectorAll("[data-categoria]");

    // limpiar
    contenedores.forEach(c => c.innerHTML = "");

    productos.forEach(producto => {
        const contenedor = document.querySelector(
            `[data-categoria="${producto.categoria}"]`
        );

        if (!contenedor) return;

        const card = crearCardProducto(producto, opciones);
        contenedor.appendChild(card);
    });
}




// ===============================
// BUSCADOR DE PRODUCTOS
// ===============================
const buscador = document.getElementById("buscador");

if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const tarjetas = document.querySelectorAll(".product-card");

        tarjetas.forEach(card => {
            const nombre = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (nombre.includes(texto)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}
