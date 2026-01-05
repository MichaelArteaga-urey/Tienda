//funcion para guardar infomacion 
function guardarAlmacenimientoLocal(llave, valor_a_guardar){
    localStorage.setItem(llave,JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenaminetoLocal (llave){
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let productos = obtenerAlmacenaminetoLocal('productos') || [];
let mensaje = document.getElementById('mensaje')
//añadir un producto

const añadirProducto = document.getElementById('productoAñadir')
const añadirValor = document.getElementById('valorAñadir')
const añadirExistencia = document.getElementById('existenciaAñadir')
const añadirDescripcion=document.getElementById('descripcionAñadir')
const añadirImagen = document.getElementById('ImagenAñadir')
const añadirCategoria=document.getElementById('categoriaAñadir')
// funcnion para añadir 
document.getElementById("botonAñadir").addEventListener("click",function(event){
    event.preventDefault()
    let productoAñadir = añadirProducto.value
    let valorAñadir = añadirValor.value
    let existenciaAñadir = añadirExistencia.value
    let descripcionAñadir=añadirDescripcion.value
    let ImagenAñadir = añadirImagen.value
    let categoriaAñadir= añadirCategoria.value
// reglas para no dejar en blanco los espacios
let van = true
if( productoAñadir==''||valorAñadir ==''|| existenciaAñadir == ''||descripcionAñadir==''||ImagenAñadir == ''||categoriaAñadir==''){
    mensaje.classList.add('llenarCampos')
    setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500)
    van = false
}
else{
    for(let i=0;i<productos.length; i++){
        if(productos[i].nombre ==productoAñadir){
            mensaje.classList.add('repetidoError')
            setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500)
            van=false
        }
    }
}
if(van==true){
    //añadir dentro de productos la variable
        productos.push ({
        nombre: productoAñadir,
        valor:valorAñadir,
        existencia: existenciaAñadir,
        descripcion: descripcionAñadir,
        urlImagen: ImagenAñadir,
        categoria:categoriaAñadir
    })
    mensaje.classList.add('realizado')
    setTimeout(()=>{
        mensaje.classList.remove('repetidoError')
        window.location.reload()
    },1500)
}
guardarAlmacenimientoLocal('productos',productos);
})

//EDITAR
const productoEd = document.getElementById('productoEditar')
const atributoEd = document.getElementById('atributoEditar')
const nuevoAtributoEd = document.getElementById('nuevoAtributo')

document.getElementById("botonEditar").addEventListener("click", function(event){
    event.preventDefault()
    let productoEditar= productoEd.value
    let atributoEditar=atributoEd.value
    let nuevoAtributo=nuevoAtributoEd.value
    let van=false
    if(productoEditar==''||atributoEditar==''||nuevoAtributo==''){
        mensaje.classList.add('llenarCampos')
        setTimeout(()=>{mensaje.classList.remove('llenarCampos')},2500)
    }
    else{
        for(let i=0;i<productos.length; i++){
            if(productos[i].nombre==productoEditar){
                productos[i][atributoEditar]=nuevoAtributo
            van=true
        }
    }
    if(van==true){
        mensaje.classList.add('realizado')
        setTimeout(()=>{
            mensaje.classList.remove('remove')
            window.location.reload()
        },1500)
    }
    else{
        mensaje.classList.add('noExisteError')
        setTimeout(()=>{
            mensaje.classList.remove('noExisteError')
        },2500)
    }
    guardarAlmacenimientoLocal('productos',productos)
    }
})
//ELIMINAR

const productoE = document.getElementById('productoEliminar') 
document.getElementById("botonEliminar").addEventListener("click",function(event){
    event.preventDefault()
    let productoEliminar=productoE.value
    let van = false
    
    for(let i=0;i<productos.length;i++){ //va a buscar en productos
        if(productos[i].nombre==productoEliminar){ //si el nombre coincide lo eliminara con splice
            productos.splice(i,1)
            van=true
        }
    }
    if(van== false){
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { 
            mensaje.classList.remove('noExsiteError')
        }, 2500);
    }
    else{
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload()            
        }, 1500);
    }
    guardarAlmacenimientoLocal('productos',productos)
})

//MOSTRAR LOS PRODUCTOS
window.addEventListener("load",()=>{
    const productoEd=document.getElementById('productoEditar')
    const productoEl=document.getElementById('productoEliminar')
    // se ejecutara un for por cada producto que alla y se iran mostrando mas 
    for(let i=0;i<productos.length;i++){
        productoEd.innerHTML+=`<option>${productos[i].nombre}</option>`
        productoEl.innerHTML+=`<option>${productos[i].nombre}</option>`
    }
    if(productos.length > 0){
    Object.keys(productos[0]).forEach(element=>{
    atributoEd.innerHTML+=`<option>${element}</option>`
    })
    }
//creamos las constantes de cada secccion y y que se muestre de acuerdo a lo que se añade
let mostrarProductosO = document.getElementById('mostrarProductosO')
let mostrarProductosD = document.getElementById('mostrarProductosD')
let mostrarProductosB = document.getElementById('mostrarProductosB')

mostrarProductosO.innerHTML = ''
mostrarProductosD.innerHTML = ''
mostrarProductosB.innerHTML = ''

for (let i = 0; i < productos.length; i++) {

  let producto = productos[i];

  let card = `
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

  if (producto.categoria === "onepiece") {
      mostrarProductosO.innerHTML += card;
  }
  else if (producto.categoria === "dragonball") {
      mostrarProductosD.innerHTML += card;
  }
  else if (producto.categoria === "bleach") {
      mostrarProductosB.innerHTML += card;
  }
}
})