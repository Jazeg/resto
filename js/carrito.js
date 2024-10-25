document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los botones "Agregar al carrito" y "Ordenar ahora"
    const botonesAgregar = document.querySelectorAll(".btn-warning, .btn-primary");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Identifica si el botón pertenece a un item con la estructura .media.menu-item o .item
            const item = e.target.closest(".media.menu-item, .item");
            if (item) {
                let nombre, precio, imagen;
                if (item.classList.contains("menu-item")) {
                    // Caso de la estructura .media.menu-item
                    nombre = item.querySelector("h5").textContent.trim();
                    precio = item.querySelector(".menu-price").textContent.trim().replace(/S\/\.?\s*/, "");
                    imagen = item.querySelector("img").src;
                } else {
                    // Caso de la estructura .item
                    nombre = item.querySelector("h5.mt-0.h4").textContent.trim();
                    precio = item.querySelector(".text-primary").textContent.trim().replace(/S\/\s*/, "");
                    imagen = item.querySelector("img").src;
                }

                agregarAlCarrito(nombre, precio, imagen);
                actualizarContadorCarrito(); // Actualiza el contador cada vez que se agrega un producto
            }
        });
    });

    // Actualiza el contador al cargar la página
    actualizarContadorCarrito();
});

function agregarAlCarrito(nombre, precio, imagen) {
    // Estructura del producto
    const producto = {
        nombre,
        precio: parseFloat(precio),
        imagen,
        cantidad: 1
    };

    // Verifica si ya hay productos en el LocalStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verifica si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.nombre === producto.nombre);

    if (index !== -1) {
        carrito[index].cantidad += 1; // Incrementa la cantidad si ya existe
    } else {
        carrito.push(producto); // Agrega el nuevo producto si no existe
    }

    // Guarda el carrito actualizado en el LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    
    // Envía el evento 'add_to_cart' a Google Analytics
    gtag('event', 'add_to_cart', {
        "currency": "PEN", // Moneda en soles
        "value": producto.precio,
        "items": [{
            "id": producto.nombre,  // Puedes usar otro identificador si tienes
            "name": producto.nombre,
            "price": producto.precio,
            "quantity": producto.cantidad
        }]
    });

    gtag("config", "G-VGHCBZG439");

    // alert(`${nombre} ha sido agregado al carrito.`);
    mostrarCarrito();
}

function actualizarContadorCarrito() {
    // Obtiene el carrito del LocalStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Suma las cantidades de todos los productos en el carrito
    const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    // Actualiza el contador en el HTML usando jQuery
    $("a.cart > span").addClass("counter");
    $("a.cart > span.counter").text(cantidad);
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const carritoBoton = document.querySelector(".cart");
    const cartDetails = document.querySelector(".cart-details");
    const closeButton = document.querySelector(".close-btn");

    carritoBoton.addEventListener("click", (e) => {
        e.preventDefault();
        cartDetails.classList.toggle("open");
        mostrarCarrito();
    });

    closeButton.addEventListener("click", () => {
        cartDetails.classList.remove("open");
    });

    actualizarContadorCarrito();
});

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItems = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");

    cartItems.innerHTML = ""; // Limpia la lista de productos
    let subtotal = 0;

    carrito.forEach((producto, index) => {
        subtotal += producto.precio * producto.cantidad;

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="aaa">
                <img src="${producto.imagen}" alt="IMG" width="90" height="70" align="left">
            </div>
            <div class="nom_prod">
                ${producto.nombre}
            </div>
            <div class="conttten">
                <div>
                S/. ${producto.precio} 
                </div>
                
                <div class="quantity-controls ">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(li);
    });

    subtotalEl.textContent = subtotal.toFixed(2);
    actualizarContadorCarrito();

    // Añade event listeners para los botones de aumentar/disminuir cantidad
    document.querySelectorAll(".quantity-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(e.target.dataset.index);
            if (e.target.classList.contains("increase")) {
                modificarCantidad(index, 1);
            } else {
                modificarCantidad(index, -1);
            }
        });
    });
}

function modificarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Modifica la cantidad del producto en el índice dado
    if (carrito[index].cantidad + cambio > 0) {
        carrito[index].cantidad += cambio;
    } else {
        // Si la cantidad es 0 o menor, elimina el producto
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza el carrito visualmente
}

// Función para simular la compra y enviar el evento 'purchase'
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Genera un ID de transacción único (puedes personalizarlo según tu sistema)
    const transactionId = `T${Date.now()}`;

    let totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    // Envía el evento 'purchase' a Google Analytics
    gtag('event', 'purchase', {
        "transaction_id": transactionId,
        "affiliation": "Tienda de Comidas",
        "value": totalCompra,
        "currency": "PEN", // Moneda en soles
        "items": carrito.map(producto => ({
            "id": producto.nombre,  // ID de producto (puedes cambiarlo)
            "name": producto.nombre,
            "price": producto.precio,
            "quantity": producto.cantidad
        }))
    });

    // Aquí iría la lógica que finaliza la compra (vaciar carrito, etc.)
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function agregarAlCarrito(nombre, precio, imagen) {
    const producto = {
        nombre,
        precio: parseFloat(precio),
        imagen,
        cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => item.nombre === producto.nombre);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Envía el evento 'add_to_cart' a Google Analytics
    gtag('event', 'add_to_cart', {
        "currency": "PEN", // Moneda en soles
        "value": producto.precio,
        "items": [{
            "id": producto.nombre,
            "name": producto.nombre,
            "price": producto.precio,
            "quantity": producto.cantidad
        }]
    });

    // alert(`${nombre} ha sido agregado al carrito.`);
    mostrarCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    $("a.cart > span").addClass("counter").text(cantidad);
}

// Llama a mostrarCarrito() cada vez que se actualiza el carrito
document.querySelectorAll(".btn-warning, .btn-primary").forEach(boton => {
    boton.addEventListener("click", () => {
        mostrarCarrito();
    });
});






document.getElementById("detalles_compra").addEventListener("click", function() {
    gtag('event', 'click', {
        'event_category': 'Botones',
        'event_label': 'ir a detalles pedido',
        'value': 1
    });
});


document.getElementById("reservaciones").addEventListener("click", function() {
    gtag('event', 'click', {
        'event_category': 'Botones',
        'event_label': 'reservaciones',
        'value': 1
    });
});