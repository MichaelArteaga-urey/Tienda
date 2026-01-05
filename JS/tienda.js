
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const onePiece = document.getElementById("tiendaOnePiece");
const dragonBall = document.getElementById("tiendaDragonBall");
const bleach = document.getElementById("tiendaBleach");

productos.forEach(producto => {

  const card = `
  <div class="product-card">
      <img src="${producto.urlImagen}">
      <div class="info">
          <h3>${producto.nombre}</h3>
          <div class="price">$${producto.valor}</div>
          <div class="meta">Stock: ${producto.existencia}</div>
          <div class="meta">${producto.descripcion}</div>
          <div class="actions">
              <button class="btn btn-cart"
                onclick="AGREGAR('${producto.nombre}', ${producto.valor}, '${producto.urlImagen}')">
                Añadir al carrito
              </button>
              <button class="btn btn-buy">Comprar ahora</button>
          </div>
      </div>
  </div>
  `;

  if (producto.categoria === "onepiece") onePiece.innerHTML += card;
  if (producto.categoria === "dragonball") dragonBall.innerHTML += card;
  if (producto.categoria === "bleach") bleach.innerHTML += card;
});

//FUNCION PARA LA BARRA DE BUSCAR

const buscador = document.getElementById('buscador')

buscador.addEventListener("input",()=>{
    const texto=buscador.value.toLowerCase();
    const tarjetas=document.querySelectorAll(".product-card");
    tarjetas.forEach(card=>{
        const nombre = card.querySelector("h3").textContent.toLowerCase()

        if(nombre.includes(texto)){
            card.style.display="block"
        }
        else {
            card.style.display="none"
        }
    })
})