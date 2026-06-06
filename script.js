// Spider-Noir Mode Selector - Ultra Profesional y Moderno
document.addEventListener('DOMContentLoaded', () => {
    const imageCards = document.querySelectorAll('.image-card');
    let selectedMode = null;

    // Función para seleccionar una opción
    function selectOption(card) {
        // Remover selección previa
        imageCards.forEach(c => c.classList.remove('selected'));
        
        // Agregar clase seleccionada
        card.classList.add('selected');
        
        // Obtener el modo seleccionado
        const mode = card.getAttribute('data-mode');
        selectedMode = mode;
        
        // Feedback háptico (dispositivos móviles)
        if (navigator.vibrate) {
            navigator.vibrate(40);
        }
        
        // Animación de selección y navegación
        card.style.transform = 'translateY(-12px) scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
            // Navegar a la URL configurada
            const url = mode === 'color' ? CONFIG.urlColor : CONFIG.urlBW;
            if (url) window.location.href = url;
        }, 420);
    }

    // Botón de regresar
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (CONFIG.urlVolver) window.location.href = CONFIG.urlVolver;
        });
    }

    // Event listeners para clics en tarjetas
    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            selectOption(card);
        });
        
        // Soporte para Enter/Espacio en navegación por teclado
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption(card);
            }
        });
    });

    // Navegación por teclado (flechas y números)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === '1') {
            e.preventDefault();
            selectOption(imageCards[0]);
        } else if (e.key === 'ArrowRight' || e.key === '2') {
            e.preventDefault();
            selectOption(imageCards[1]);
        } else if (e.key === 'Escape') {
            // Limpiar selección con Escape
            imageCards.forEach(c => c.classList.remove('selected'));
            selectedMode = null;
            localStorage.removeItem('spiderNoirMode');
        }
    });

    // No se selecciona ninguna opción por defecto al cargar

    // Efecto parallax suave
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
            const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
            
            imageCards.forEach((card, index) => {
                if (!card.classList.contains('selected')) {
                    const direction = index === 0 ? 1 : -1;
                    const moveX = xPercent * 8 * direction;
                    const moveY = yPercent * 4;
                    
                    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            rafId = null;
        });
    });

    // Reset parallax
    document.addEventListener('mouseleave', () => {
        imageCards.forEach(card => {
            if (!card.classList.contains('selected')) {
                card.style.transform = '';
            }
        });
    });

    // Animación del logo al scroll (si hay scroll)
    const logo = document.querySelector('.main-logo');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            logo.style.transform = 'scale(0.95)';
        } else {
            logo.style.transform = 'scale(1)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
});

