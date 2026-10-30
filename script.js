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

const nav = document.querySelector("#navegacion");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("visible"));
});

const carousel = document.querySelector(".proyectos__carrusel");

if (carousel) {
    const track = carousel.querySelector(".proyectos__track");
    const slides = [...carousel.querySelectorAll(".proyectos__contenedor")];
    const previousButton = carousel.querySelector(".carrusel__control--prev");
    const nextButton = carousel.querySelector(".carrusel__control--next");
    const dotsContainer = carousel.querySelector(".carrusel__dots");
    let currentIndex = 0;
    let autoplayId;

    slides.forEach((slide, index) => {
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);
        slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `carrusel__dot${index === 0 ? " carrusel__dot--active" : ""}`;
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Mostrar proyecto ${index + 1}`);
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, slideIndex) => {
            slide.setAttribute("aria-hidden", slideIndex === currentIndex ? "false" : "true");
        });
        dotsContainer.querySelectorAll(".carrusel__dot").forEach((dot, dotIndex) => {
            dot.classList.toggle("carrusel__dot--active", dotIndex === currentIndex);
            dot.setAttribute("aria-selected", dotIndex === currentIndex ? "true" : "false");
        });
    }

    function stopAutoplay() {
        window.clearInterval(autoplayId);
    }

    function startAutoplay() {
        stopAutoplay();
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            autoplayId = window.setInterval(() => showSlide(currentIndex + 1), 6500);
        }
    }

    previousButton.addEventListener("click", () => { showSlide(currentIndex - 1); startAutoplay(); });
    nextButton.addEventListener("click", () => { showSlide(currentIndex + 1); startAutoplay(); });
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    let touchStartX = 0;
    carousel.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener("touchend", (event) => {
        const distance = touchStartX - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 45) showSlide(currentIndex + (distance > 0 ? 1 : -1));
    }, { passive: true });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
        if (event.key === "ArrowRight") showSlide(currentIndex + 1);
    });

    showSlide(0);
    startAutoplay();
}

const progressBar = document.querySelector(".scroll-progress span");

function updateScrollProgress() {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const sections = document.querySelectorAll("body > section");

if (sections.length && "IntersectionObserver" in window) {
    document.body.classList.add("reveal-ready");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
            }
        });
    }, {
        rootMargin: "-12% 0px -12% 0px",
        threshold: 0.12
    });

    sections.forEach((section) => sectionObserver.observe(section));
}