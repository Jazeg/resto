document.addEventListener("DOMContentLoaded", () => {
    // Obtener los campos del formulario y los elementos del resumen
    const direccionInput = document.getElementById("direccion");
    const telefonoInput = document.getElementById("telefono");
    const nombreInput = document.getElementById("nombre");

    const resumenDireccion = document.querySelector(".order-summary p:nth-child(2) strong");
    const resumenContacto = document.querySelector(".order-summary p:nth-child(3) strong");
    const totalPagar = document.querySelector(".order-summary p:nth-child(4) strong");

    // Actualizar el resumen en tiempo real conforme se escriben los datos
    direccionInput.addEventListener("input", () => {
        resumenDireccion.textContent = direccionInput.value || "Colegio Técnico de Magia Metropolitana de Tokio 728";
    });

    telefonoInput.addEventListener("input", () => {
        resumenContacto.textContent = telefonoInput.value || "987 654 321";
    });

    // Cargar el total del carrito desde el localStorage
    function cargarTotalCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        totalPagar.textContent = `S/. ${total.toFixed(2)}`;
    }

    // Inicializamos el total del carrito al cargar la página
    cargarTotalCarrito();

    // Redirigir a la página de éxito cuando se confirma el pedido
    const form = document.getElementById("paymentForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar la recarga del formulario
        window.location.href = "../pages/completarpago.html"; // Redirigir a la página de éxito
    });
});
