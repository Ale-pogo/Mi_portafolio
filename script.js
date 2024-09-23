//La validación del formulário con javascript es considerada un desafío extra, no es obligatório realizar esta validación para realizar su entrega
// Seleccionar el formulario y sus elementos
const formulario = document.getElementById('formularioContacto');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const mensajeInput = document.getElementById('mensaje');
const formFeedback = document.getElementById('formFeedback');

// Validar email con regex
function validarEmail(alejandro.casulli@gmail.com) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(alejandro.casulli@gmail.com);
}

// Escuchar el evento de envío del formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío predeterminado

    // Obtener los valores de los campos
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    // Validar que los campos no estén vacíos
    if (nombre === '' || email === '' || mensaje === '') {
        formFeedback.textContent = 'Todos los campos son obligatorios.';
        formFeedback.classList.add('error');
        return;
    }

    // Validar formato del correo electrónico
    if (!validarEmail(email)) {
        formFeedback.textContent = 'Por favor, introduce un correo electrónico válido.';
        formFeedback.classList.add('error');
        return;
    }

    // Si todo es válido, mostrar mensaje de éxito
    formFeedback.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
    formFeedback.classList.remove('error');
    formFeedback.classList.add('success');

    // Aquí podrías añadir una lógica para enviar los datos a un servidor o servicio de email.

    // Limpiar el formulario
    formulario.reset();
});
