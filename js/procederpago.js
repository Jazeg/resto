// Mostrar/ocultar instrucciones dietarias al chef
document.addEventListener("DOMContentLoaded", () => {
    const yesDietary = document.getElementById("yes-dietary");
    const noDietary = document.getElementById("no-dietary");
    const dietaryInstructions = document.getElementById("dietary-instructions");

    yesDietary.addEventListener("change", () => {
        if (yesDietary.checked) {
            dietaryInstructions.style.display = "block";
        }
    });

    noDietary.addEventListener("change", () => {
        if (noDietary.checked) {
            dietaryInstructions.style.display = "none";
        }
    });

    // Redirigir a la página de éxito después de confirmar el pedido
    const form = document.getElementById("paymentForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar la recarga del formulario
        window.location.href = "../pages/pagocompletado.html"; // Redirigir a la página de éxito
    });
});
