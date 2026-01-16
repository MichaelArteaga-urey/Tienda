import { agregarProducto } from "../JS/dom.js";

export function crearCardProducto(producto, opciones = { mostrarBotones: true }) {

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
            <h3>${producto.nombre}</h3>
            <div class="price">$${producto.precio}</div>
            <div class="meta">Stock: ${producto.stock}</div>
            <div class="meta">${producto.descripcion}</div>

            ${
                opciones.mostrarBotones
                ? `
                <div class="actions">
                    <button id="btn-cart" class="btn btn-cart">Añadir al carrito</button>
                    <button class="btn btn-buy">Comprar ahora</button>
                </div>
                `
                : ""
            }
        </div>
    `;

    // 🔹 Botón carrito (solo si existe)
    const botonCarrito = card.querySelector(".btn-cart");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", () => {
            
            agregarProducto(producto)
            console.log("carrito actual:",
        JSON.parse(localStorage.getItem("carrito")))
        alert("Producto agregado al carrito")
        });
    }

    return card;
}


// cartas carrito

// export function crearCardProductoC(producto) {

//     const card = document.createElement("div");
//     card.classList.add("product-card");

//     card.innerHTML = `
//         <img src="${producto.imagen}" alt="${producto.nombre}">
//         <div class="info">
//             <h3>${producto.nombre}</h3>
//             <div class="price">$${producto.precio}</div>
//             <div class="meta">Stock: ${producto.stock}</div>
//             <div class="meta">${producto.descripcion}</div>
//                     <div class="actions">
//                     <button class="btn btn-cart"
//                         onclick="eliminarProducto('${producto.id}')">
//                         Eliminar Producto
//                     </button>
//                     <button class="btn btn-buy">Comprar ahora</button>
//                     </div>
//         </div>`
        
//     return card;
// }
