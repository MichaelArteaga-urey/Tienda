// PRODUCTOS
export function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

export function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// CARRITO
export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
