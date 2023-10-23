let productoEnCarrito = localStorage.getItem("productos-en-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito);
const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorDeProductos = document.querySelector("#contenedor-de-productos");
const carritoAcciones = document.querySelector("#totales");
const compraTotal = document.querySelector("#compra");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenedorSubTotal = document.querySelector("#subtotal")
const contenedorTotal = document.querySelector("#total")
const carritoComprado= document.querySelector("#carritoComprado")
const botonComprar= document.querySelector("#comprar")



function cargarProductoCarrito() {
    if (productoEnCarrito && productoEnCarrito.length > 0) {

        carritoVacio.classList.add("apagado");
        contenedorDeProductos.classList.remove("apagado")
        carritoAcciones.classList.remove("apagado")
        vaciarCarrito.classList.remove("apagado")
        carritoComprado.classList.add("apagago")
        contenedorDeProductos.innerHTML = "";

        productoEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = ` 
        
        <img class="imagen-carrito" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-nombre">
            <small>Nombre</small>
            <h3>${producto.titulo}</h3>
         </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <h3>${producto.cantidad}</h3>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <h3>$${producto.precio}</h3>
         </div>
         <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <h3>$${producto.cantidad * producto.precio}</h3>
        </div>
        <button id="${producto.id}" class="boton-carrito carrito-producto-eliminar">
            <i class="bi bi-trash3-fill"></i>
        </button>
       
            `;

            contenedorDeProductos.append(div);
        });


    } else {
        carritoVacio.classList.remove("apagado");
        contenedorDeProductos.classList.add("apagado")
        carritoAcciones.classList.add("apagado")
        vaciarCarrito.classList.add("apagado")
        carritoComprado.classList.add("apagago")
    }
    ActualizarBotonesEliminar()
    actualizarSubTotal()
    actualizarTotal()
}

cargarProductoCarrito()


function ActualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;

    const index = productoEnCarrito.findIndex(productos => productos.id === idBoton)

    productoEnCarrito.splice(index, 1);
    cargarProductoCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito))
}
vaciarCarrito.addEventListener("click", botonCarrito)
function botonCarrito() {
    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
    cargarProductoCarrito();
}
function actualizarSubTotal() {
    const totalCalculado = productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    contenedorSubTotal.innerText = `$${totalCalculado}`

}

function actualizarTotal() {
    const totalCalculado = productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 3000)
    contenedorTotal.innerText = `$${totalCalculado}`
    

}

botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito(){
    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito))

    carritoVacio.classList.add("apagado");
    contenedorDeProductos.classList.add("apagado")
    carritoAcciones.classList.add("apagado")
    vaciarCarrito.classList.add("apagado")
    carritoComprado.classList.remove("apagado")

}