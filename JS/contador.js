import { obtenerCarrito } from "../JS/storage.js";

export function actualizarContadorCarrito() {
  const contador = document.getElementById("carritoContador");
  if (!contador) return;

  const carrito = obtenerCarrito();
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (total > 0) {
    contador.textContent = total;
    contador.classList.remove("hidden");
  } else {
    contador.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
