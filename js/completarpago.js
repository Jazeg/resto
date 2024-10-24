document.addEventListener("DOMContentLoaded", () => {
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    // Función para calcular el total del carrito
    function calcularTotal() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let subtotal = 0;

        // Calcular el subtotal sumando los precios de los productos en el carrito
        carrito.forEach(item => {
            subtotal += item.precio * item.cantidad;
        });

        // Envío es gratis en este caso
        const envio = 0;

        // El total es simplemente el subtotal (en este caso sin impuestos ni otros cargos)
        const total = subtotal + envio;

        // Actualizar el DOM con los valores calculados
        subtotalEl.textContent = subtotal.toFixed(2);
        totalEl.textContent = total.toFixed(2);
    }

    // Inicializamos el total del carrito al cargar la página
    calcularTotal();

    // Agregar evento al botón de pagar para redirigir a la página de éxito
    document.querySelector('button').addEventListener('click', () => {
        window.location.href = "../pages/pagocompletado.html"; // Redirige a la página de éxito
    });
});
