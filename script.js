document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío por defecto

    const submitButton = document.querySelector('button[type="submit"]');
    const responseMessage = document.getElementById('responseMessage');

    // Desactivar el botón de envío y cambiar el texto
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Enviar los datos a Formspree utilizando fetch
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // Manejar la respuesta de Formspree
        if (response.ok) {
            responseMessage.textContent = 'Mensaje enviado exitosamente.';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.textContent = 'Error al enviar el mensaje. Por favor, inténtalo nuevamente.';
            responseMessage.style.color = 'red';
        }

    } catch (error) {
        // Mostrar error si algo falla
        responseMessage.textContent = 'Hubo un problema al enviar el formulario. Error: ' + error.message;
        responseMessage.style.color = 'red';
        console.error('Error al enviar el formulario:', error);
    } finally {
        // Asegurarse de que el botón siempre se rehabilita y el texto se restablece
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
        this.reset(); // Limpiar el formulario
    }
});
