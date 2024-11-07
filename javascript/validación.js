function validarFormulario(event) {
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const nombreRegex = /^[A-Za-z\s]+$/; 
    if (!nombre || !nombreRegex.test(nombre)) {
        alert("Por favor, ingresa un nombre y apellido válidos (solo caracteres alfabéticos).");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (!asunto || asunto.length < 3) {
        alert("Por favor, ingresa un asunto válido (al menos 3 caracteres).");
        return;
    }

    if (!mensaje || mensaje.length < 10) {
        alert("Por favor, ingresa un mensaje con al menos 10 caracteres.");
        return;
    }

    const maliciousPattern = /<.*?>/;
    if (maliciousPattern.test(mensaje)) {
        alert("El mensaje contiene código HTML malicioso. Por favor, ingresa solo texto.");
        return;
    }

    alert("Formulario enviado con éxito.");
}
