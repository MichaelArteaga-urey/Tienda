// =======================
// CARRITO - STORAGE
// =======================

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function vaciarCarrito() {
  localStorage.removeItem("carrito");
}
