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
                    <button class="btn btn-cart"
                        onclick="AGREGAR('${producto.id}')">
                        Añadir al carrito
                    </button>
                    <button class="btn btn-buy">Comprar ahora</button>
                </div>
                `
                : ""
            }
        </div>
    `;

    return card;
}
