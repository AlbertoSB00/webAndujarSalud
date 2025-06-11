// Testimonios de Google Maps para Andújar Salud
// Sistema simple sin APIs - Solo reemplaza las reseñas abajo

const TESTIMONIOS_GOOGLE = [
    {
        texto: "Un trato excelente y el Dr. García Mir (Dermatólogo) al que asistí por primera vez a su consulta, un gran profesional.",
        autor: "Eliseo De Pradas",
        estrellas: 5,
        fecha: "oct 2017",
        avatar: "👨"
    },
    {
        texto: "Grandes profesionales, buena atención y amabilidad",
        autor: "Valle Quero",
        estrellas: 5,
        fecha: "mar 2020",
        avatar: "👩"
    },
    {
        texto: "Profesionales excelentes. Trato súper agradable, sobre todo con la señorita que atiende, muy amable y simpática. Lo recomiendo.",
        autor: "María Francisca Venga",
        estrellas: 5,
        fecha: "oct 2022",
        avatar: "👩"
    },
    {
        texto: "Personalmente solo he sido atendido por el otorrino, y mi familia por alguna cosas como el dermatologo y siempre la atención ha sido con amabilidad y profesionalidad",
        autor: "Antonio Lara",
        estrellas: 4,
        fecha: "ene 2023",
        avatar: "👨"
    }
];

class TestimoniosGoogle {
    constructor() {
        this.testimonios = TESTIMONIOS_GOOGLE;
        this.container = document.querySelector('.testimonios-slider');
        this.currentIndex = 0;
    }

    init() {
        if (!this.container) {
            console.error('Container de testimonios no encontrado');
            return;
        }

        this.renderTestimonios();
        this.updateDots();
        this.initSlider();
    }

    renderTestimonios() {
        // Limpiar contenido existente
        this.container.innerHTML = '';

        this.testimonios.forEach((testimonio, index) => {
            const testimonioElement = this.createTestimonioElement(testimonio, index);
            this.container.appendChild(testimonioElement);
        });
    }

    createTestimonioElement(testimonio, index) {
        const div = document.createElement('div');
        div.className = `testimonio ${index === 0 ? 'active' : ''}`;
        
        div.innerHTML = `
            <div class="testimonio-content">
                <div class="testimonio-rating">
                    ${this.generateStars(testimonio.estrellas)}
                </div>
                <div class="testimonio-text">
                    "${testimonio.texto}"
                </div>
                <div class="testimonio-author">
                    <div class="author-avatar">${testimonio.avatar}</div>
                    <div class="author-info">
                        <div class="author-name">${testimonio.autor}</div>
                        <div class="author-service">Google Reviews</div>
                        <div class="review-time">${testimonio.fecha}</div>
                    </div>
                </div>
            </div>
        `;
        
        return div;
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '⭐' : '☆';
        }
        return stars;
    }

    updateDots() {
        const dotsContainer = document.querySelector('.control-dots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.testimonios.length; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dotsContainer.appendChild(dot);
        }
    }

    initSlider() {
        const testimonios = this.container.querySelectorAll('.testimonio');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.control-btn.prev');
        const nextBtn = document.querySelector('.control-btn.next');

        const showTestimonio = (index) => {
            testimonios.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            testimonios[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            this.currentIndex = index;
        };

        const nextTestimonio = () => {
            const nextIndex = (this.currentIndex + 1) % testimonios.length;
            showTestimonio(nextIndex);
        };

        const prevTestimonio = () => {
            const prevIndex = (this.currentIndex - 1 + testimonios.length) % testimonios.length;
            showTestimonio(prevIndex);
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonio);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonio);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonio(index));
        });

        // Auto-play cada 6 segundos
        setInterval(nextTestimonio, 6000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const testimoniosGoogle = new TestimoniosGoogle();
    testimoniosGoogle.init();
});

// Para facilitar la actualización de testimonios
window.actualizarTestimonios = function(nuevosTestimonios) {
    TESTIMONIOS_GOOGLE.length = 0; // Limpiar array
    TESTIMONIOS_GOOGLE.push(...nuevosTestimonios); // Añadir nuevos
    
    const testimoniosGoogle = new TestimoniosGoogle();
    testimoniosGoogle.init();
    
    console.log('Testimonios actualizados:', nuevosTestimonios.length);
};
