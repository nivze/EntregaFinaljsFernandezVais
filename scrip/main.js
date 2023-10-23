const productos = [
    {
        id: "asus-rog",
        titulo: "Asus rog zephyruz",
        imagen: "./imagenes/asus/rog 20090/woo/200901.jpg",
        imagen2: "./imagenes/asus/rog 20090/woo/200903.jpg",
        categoria: {
            nombre: "notebook",
            id: "asus"
        },
        precio: 102
    },
    {
        id: "msi-cybor",
        titulo: "Msi cybor",
        imagen: "./imagenes/msi cybor/woo/200932.jpg",
        imagen2: "./imagenes/msi cybor/woo/200931.jpg",
        categoria: {
            nombre: "notebook",
            id: "msi"
        },
        precio: 97
    },
    {
        id: "lenovo-flex-5",
        titulo: "Lenovo Flex 5",
        imagen: "./imagenes/Lenovo/20055flex 5 16/woo/200552.jpg",
        imagen2: "./imagenes/Lenovo/20055flex 5 16/woo/200551.jpg",
        categoria: {
            nombre: "notebook",
            id: "lenovo"
        },
        precio: 68
    },
    {
        id: "Lenovo-13s",
        titulo: "Lenovo ThinkBook 13s Gen 2",
        imagen: "./imagenes/Lenovo/ThinkBook 13s Gen 2 20048/woo/200481.jpg",
        imagen2: "./imagenes/Lenovo/ThinkBook 13s Gen 2 20048/woo/200482.jpg",
        categoria: {
            nombre: "notebook",
            id: "lenovo"
        },
        precio: 612
    },
    {
        id: "lenovo-11e",
        titulo: "Lenovo ThinkPad 11e Gen 5",
        imagen: "./imagenes/Lenovo/ThinkPad 11e Gen 5 20051/woo/200511.jpg",
        imagen2: "./imagenes/Lenovo/ThinkPad 11e Gen 5 20051/woo/200512.jpg",
        categoria: {
            nombre: "notebook",
            id: "lenovo"
        },
        precio: 22
    },

    {
        id: "lenovo-l14",
        titulo: "Lenovo ThinkPad L14 2 Gen",
        imagen: "./imagenes/Lenovo/Thinkpad L14 2da Gen 20053/woo/200531.jpg",
        imagen2: "./imagenes/Lenovo/Thinkpad L14 2da Gen 20053/woo/200532.jpg",
        categoria: {
            nombre: "notebook",
            id: "lenovo"
        },
        precio: 58
    },
    {
        id: "hp-chrom",
        titulo: "HP Chromebook",
        imagen: "./imagenes/HP/20040 chromebook/woo/200401.jpg",
        imagen2: "./imagenes/HP/20040 chromebook/woo/200402.jpg",
        categoria: {
            nombre: "notebook",
            id: "hp"
        },
        precio: 45
    },
    {
        id: "hp-probook",
        titulo: "HP Probook G9",
        imagen: "./imagenes/HP/20049 PROBOOK 450 G9/woo/200492.jpg",
        imagen2: "./imagenes/HP/20049 PROBOOK 450 G9/woo/200491.jpg",
        categoria: {
            nombre: "notebook",
            id: "hp"
        },
        precio: 53
    },
    {
        id: "hp-elitebook",
        titulo: "HP Elitebook 655 G9 Wolf Segurity",
        imagen: "./imagenes/HP/20058HP ELITEBOOK 655 G9 WOLF/WOO/200582.jpg",
        imagen2: "./imagenes/HP/20058HP ELITEBOOK 655 G9 WOLF/WOO/200583.jpg",
        categoria: {
            nombre: "notebook",
            id: "hp"
        },
        precio: 5850
    },
    {
        id: "hp-victus",
        titulo: "HP Victus",
        imagen: "./imagenes/HP/20091 VICTUS/woo/0.jpg",
        imagen2: "./imagenes/HP/20040 chromebook/woo/200402.jpg",
        categoria: {
            nombre: "notebook",
            id: "hp"
        },
        precio: 87
    }
]

const contenedor = document.querySelector("#contenedor");
const botonesCategoria = document.querySelectorAll(".boton-categoria")
const titulo = document.querySelector("#titulo")
let botonAgregar = document.querySelectorAll(".boton-agregar")
const numerito = document.querySelector("#numerito")


function cargarProducto(productosElegidos) {

    contenedor.innerHTML = "";

    productosElegidos.forEach(productos => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
    <div>
        <img src="${productos.imagen} " alt="${productos.titulo}">
    </div>
    <div class="capa">
        <img src="${productos.imagen2} " alt="${productos.titulo} ">
    </div>
    <div  class="nombre-producto">
        <p >
            ${productos.titulo}
        </p>
    </div>
    <div class="precio">
        <h2>$ ${productos.precio} </h2>
    </div>
    <div class="espacio-boton">
        <button class="boton boton-agregar" id="${productos.id}">
            Añadir al carrito
        </button>
    </div>
    `;

        contenedor.append(div)

    })

    ActualizarBotonesAgregar()
    console.log(botonAgregar)
}
cargarProducto(productos);


botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("activo"))
        e.currentTarget.classList.add("activo")


        if (e.currentTarget.id != "notebook") {
            const productoCategoria = productos.find(productos => productos.categoria.id === e.currentTarget.id)
            
            titulo.innerText = productoCategoria.categoria.id;
            const productosBoton = productos.filter(productos => productos.categoria.id === e.currentTarget.id)

            cargarProducto(productosBoton)
        } else {
            titulo.innerText = "Todos los productos"
            cargarProducto(productos)
        }

    })
})

function ActualizarBotonesAgregar() {
    botonAgregar = document.querySelectorAll(".boton-agregar")

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}
let productoEnCarrito;
let productoEnCarritoLS = localStorage.getItem("productos-en-carrito")

if(productoEnCarritoLS){
    productoEnCarrito = JSON.parse(productoEnCarritoLS)
    actualizarNumerito()
}else{
    productoEnCarrito = [];
    
}




function agregarAlCarrito(e){


    const idBoton = e.currentTarget.id;
    const productosAgregados = productos.find(productos => productos.id === idBoton);
    
    if(productoEnCarrito.some(productos => productos.id === idBoton)){
       const index = productoEnCarrito.findIndex(productos => productos.id === idBoton);
        productoEnCarrito[index].cantidad++;
    }else{
        productosAgregados.cantidad = 1;
         productoEnCarrito.push(productosAgregados);
    }
    
    actualizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));

}

function actualizarNumerito(){
    let Numerito = productoEnCarrito.reduce((acc, productos) => acc + productos.cantidad, 0);
    numerito.innerText = Numerito;
}
