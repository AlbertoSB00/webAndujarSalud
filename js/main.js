// Andújar Salud - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const header = document.querySelector('.header');
    
    // Elementos del DOM principales
    const sections = document.querySelectorAll('section[id]');

    // Inicialización
    init();

    function init() {
        setupNavigation();
        setupScrollEffects();
        setupBackToTop();
        setupAnimations();
        setupSmoothScrolling();
        setupServicesTabs();
        setupTestimonials();
    }

    // Configuración de la navegación móvil
    function setupNavigation() {
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Cerrar menú al hacer click en un enlace
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Actualizar enlace activo
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Cerrar menú al hacer click fuera
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Efectos de scroll
    function setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header con efecto de scroll
            if (header) {
                if (scrollTop > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                } else {
                    header.style.background = 'var(--background-white)';
                    header.style.backdropFilter = 'none';
                }
            }
            
            // Actualizar navegación activa basada en la sección visible
            updateActiveNavigation();
            
            lastScrollTop = scrollTop;
        });
    }

    // Botón volver arriba
    function setupBackToTop() {
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Función para mejorar la navegación suave
    function smoothScrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Configurar animaciones de entrada
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos que deben animarse
        const animatedElements = document.querySelectorAll('.especialidad-card, .doctor-card, .galeria-item, .stat-item');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Scroll suave para enlaces internos
    function setupSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Actualizar navegación activa
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Utilidades
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Lazy loading para imágenes
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Configurar lazy loading
    setupLazyLoading();

    // Manejo de errores de imágenes
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Error cargando imagen:', e.target.src);
        }
    }, true);

    // Optimización de rendimiento
    const debouncedResize = debounce(function() {
        // Recalcular dimensiones si es necesario
        updateActiveNavigation();
    }, 250);

    window.addEventListener('resize', debouncedResize);

    // Accesibilidad: navegación por teclado
    document.addEventListener('keydown', function(e) {
        // Escape para cerrar menú móvil
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Configurar tabs de servicios
    function setupServicesTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        const serviciosContent = document.querySelector('.servicios-content');

        if (tabBtns.length === 0) return;

        // Inicializar estado inicial
        function initializeTabs() {
            // Limpiar todos los estados primero
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Activar el primer tab
            const firstBtn = tabBtns[0];
            const firstContent = document.getElementById(firstBtn.getAttribute('data-tab'));

            if (firstBtn && firstContent) {
                firstBtn.classList.add('active');
                firstContent.classList.add('active', 'initial-load');
            }
        }

        // Calcular altura máxima para evitar saltos
        function calculateMaxHeight() {
            let maxHeight = 0;
            tabContents.forEach(content => {
                // Temporalmente mostrar el contenido para medir
                content.style.display = 'block';
                content.style.position = 'relative';
                content.style.opacity = '0';

                const height = content.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }

                // Ocultar de nuevo
                content.style.display = 'none';
                content.style.position = 'absolute';
                content.style.opacity = '1';
            });

            // Establecer altura mínima
            if (serviciosContent) {
                serviciosContent.style.minHeight = maxHeight + 'px';
            }
        }

        // Inicializar inmediatamente
        initializeTabs();

        // Calcular altura al cargar
        setTimeout(() => {
            calculateMaxHeight();
        }, 100);

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                const targetContent = document.getElementById(targetTab);

                if (!targetContent) return;

                // Si ya está activo, no hacer nada
                if (this.classList.contains('active')) return;

                // Remover clase active de todos los botones y contenidos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active', 'initial-load');
                    // Usar transición CSS en lugar de JavaScript
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        if (!content.classList.contains('active')) {
                            content.style.display = 'none';
                        }
                    }, 300);
                });

                // Activar nuevo contenido después de un pequeño delay
                setTimeout(() => {
                    this.classList.add('active');
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');

                    // Trigger reflow para asegurar que la transición funcione
                    targetContent.offsetHeight;

                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 150);
            });
        });

        // Recalcular altura en resize
        window.addEventListener('resize', debounce(calculateMaxHeight, 250));
    }

    // Configurar slider de testimonios
    function setupTestimonials() {
        const testimonios = document.querySelectorAll('.testimonio');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.control-btn.prev');
        const nextBtn = document.querySelector('.control-btn.next');
        let currentTestimonio = 0;

        if (testimonios.length === 0) return;

        function showTestimonio(index) {
            // Remover clase active de todos
            testimonios.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            // Añadir clase active al actual
            testimonios[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextTestimonio() {
            currentTestimonio = (currentTestimonio + 1) % testimonios.length;
            showTestimonio(currentTestimonio);
        }

        function prevTestimonio() {
            currentTestimonio = (currentTestimonio - 1 + testimonios.length) % testimonios.length;
            showTestimonio(currentTestimonio);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonio);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonio);

        // Dots navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonio = index;
                showTestimonio(currentTestimonio);
            });
        });

        // Auto-play testimonios
        setInterval(nextTestimonio, 5000);
    }

    // Preloader simple (opcional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('Andújar Salud - Sitio web cargado correctamente');
});

// Función para cerrar el banner de desarrollo
function closeBanner() {
    const banner = document.getElementById('devBanner');
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

    if (banner) {
        banner.classList.add('hidden');

        // Ajustar posición del header
        if (header) {
            header.classList.add('no-banner');
        }

        // Ajustar padding del hero
        if (hero) {
            hero.classList.add('no-banner');
        }

        // Guardar preferencia en localStorage
        localStorage.setItem('devBannerClosed', 'true');
    }
}

// Verificar si el banner debe estar oculto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const bannerClosed = localStorage.getItem('devBannerClosed');

    if (bannerClosed === 'true') {
        closeBanner();
    }
});
