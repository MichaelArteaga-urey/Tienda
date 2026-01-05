let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){
  const cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index)=>{
    total += item.price;
    
    cartItems.innerHTML += `
<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">

  <div class="flex items-center gap-4">
    <img src="${item.image}" class="w-24 h-24 object-cover rounded">
    <div>
      <h3 class="font-semibold text-lg">${item.name}</h3>
      <p class="text-blue-600 font-bold">$${item.price}</p>
    </div>
  </div>

  <div class="flex items-center justify-end">
    <button onclick="removeItem(${index})"
      class="text-red-500 hover:text-red-700 font-semibold">
      Eliminar
    </button>
  </div>

</div>
`;
  });

  document.getElementById("total").textContent = "$" + total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function AGREGAR(name, price, image){
  cart.push({name, price, image});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto añadido al carrito 🛒");
}

document.addEventListener("DOMContentLoaded", renderCart);