// Todas las reseñas de Andújar Salud extraídas del archivo
const TODAS_LAS_RESENAS = [
    // Reseñas positivas (4-5 estrellas)
    {
        autor: "Eliseo De Pradas Chicharro",
        texto: "Un trato excelente y el Dr. García Mir (Dermatólogo) al que asistí por primera vez a su consulta, un gran profesional.",
        estrellas: 5,
        fecha: "24 oct 2017",
        fechaOrden: new Date("2017-10-24"),
        avatar: "👨"
    },
    {
        autor: "Valle Quero",
        texto: "Grandes profesionales, buena atención y amabilidad",
        estrellas: 5,
        fecha: "12 mar 2020",
        fechaOrden: new Date("2020-03-12"),
        avatar: "👩"
    },
    {
        autor: "María Francisca Venga Molina",
        texto: "Profesionales excelentes. Trato súper agradable, sobre todo con la señorita que atiende, muy amable y simpática. Lo recomiendo.",
        estrellas: 5,
        fecha: "11 oct 2022",
        fechaOrden: new Date("2022-10-11"),
        avatar: "👩"
    },
    {
        autor: "Eva Martinez",
        texto: "Buena atencion y entrada a consulta en la hora de la cita.",
        estrellas: 5,
        fecha: "23 nov 2022",
        fechaOrden: new Date("2022-11-23"),
        avatar: "👩"
    },
    {
        autor: "Antonio Lara Calvache",
        texto: "Personalmente solo he sido atendido por el otorrino, y mi familia por alguna cosas como el dermatologo y siempre la atención ha sido con amabilidad y profesionalidad",
        estrellas: 4,
        fecha: "13 ene 2023",
        fechaOrden: new Date("2023-01-13"),
        avatar: "👨"
    },
    {
        autor: "Maria Garrido Gutierrez",
        texto: "Para mi son encantadoras!!!",
        estrellas: 5,
        fecha: "8 ene 2020",
        fechaOrden: new Date("2020-01-08"),
        avatar: "👩"
    },
    {
        autor: "juan Sánchez",
        texto: "Centro con variedad de consultas de profesionales para la salud.",
        estrellas: 4,
        fecha: "3 sept 2017",
        fechaOrden: new Date("2017-09-03"),
        avatar: "👨"
    },
    {
        autor: "alfonso aranda perez",
        texto: "Buenos médicos de familia",
        estrellas: 3,
        fecha: "29 abr 2019",
        fechaOrden: new Date("2019-04-29"),
        avatar: "👨"
    },
    {
        autor: "Manuel Luque Exposito",
        texto: "Buen servicio médico en general",
        estrellas: 4,
        fecha: "2 ene 2020",
        fechaOrden: new Date("2020-01-02"),
        avatar: "👨"
    },
    {
        autor: "Susana López Fernández",
        texto: "Atención profesional y instalaciones adecuadas",
        estrellas: 4,
        fecha: "22 nov 2019",
        fechaOrden: new Date("2019-11-22"),
        avatar: "👩"
    },
    {
        autor: "Mari Carmen Malpica",
        texto: "Experiencia satisfactoria en general",
        estrellas: 4,
        fecha: "10 nov 2019",
        fechaOrden: new Date("2019-11-10"),
        avatar: "👩"
    },
    {
        autor: "eva peña",
        texto: "Servicio correcto y profesional",
        estrellas: 4,
        fecha: "18 oct 2019",
        fechaOrden: new Date("2019-10-18"),
        avatar: "👩"
    },
    {
        autor: "francisco javier mariscal pelado",
        texto: "Buena atención médica",
        estrellas: 4,
        fecha: "11 sept 2017",
        fechaOrden: new Date("2017-09-11"),
        avatar: "👨"
    },
    {
        autor: "Juany Blanco Carmona",
        texto: "Experiencia positiva en la clínica",
        estrellas: 4,
        fecha: "16 ene 2017",
        fechaOrden: new Date("2017-01-16"),
        avatar: "👩"
    },
    {
        autor: "Rafael Barbancho Manchon",
        texto: "Servicio aceptable, instalaciones correctas",
        estrellas: 3,
        fecha: "9 dic 2019",
        fechaOrden: new Date("2019-12-09"),
        avatar: "👨"
    },
    {
        autor: "Fran García Castillo",
        texto: "Atención médica estándar",
        estrellas: 3,
        fecha: "21 ago 2019",
        fechaOrden: new Date("2019-08-21"),
        avatar: "👨"
    },
    // Reseñas negativas (1-2 estrellas) - incluidas para transparencia
    {
        autor: "Inma Garcia Espinosa",
        texto: "Creo que para el precio que tiene no te atienden como deberían, en mi caso después de 4 consultas con el mismo problema he salido igual que estaba. Es la primera vez que me pasa en una clínica privada.",
        estrellas: 1,
        fecha: "15 ago 2024",
        fechaOrden: new Date("2024-08-15"),
        avatar: "👩"
    },
    {
        autor: "Trinidad Pérez García",
        texto: "Busque en Andújar un otorrino para mí hermana, experiencia no satisfactoria con el servicio recibido.",
        estrellas: 1,
        fecha: "25 jul 2024",
        fechaOrden: new Date("2024-07-25"),
        avatar: "👩"
    },
    {
        autor: "Maria de Mar Rodriguez Garcia",
        texto: "El dermatologo me ha parecido muy caro, solo me ha dado pautas a seguir, he tardado más tiempo en rellenar los papeles que en la consulta.",
        estrellas: 1,
        fecha: "10 mar 2024",
        fechaOrden: new Date("2024-03-10"),
        avatar: "👩"
    },
    {
        autor: "Carmen Cordoba Diaz",
        texto: "Estuve en el dermatólogo hace un mes con mi hija por dermatitis atopica, y no me ha resuelto nada, muy caro en relación calidad-precio.",
        estrellas: 1,
        fecha: "6 jun 2024",
        fechaOrden: new Date("2024-06-06"),
        avatar: "👩"
    }
];

class ResenasManager {
    constructor() {
        this.resenas = [...TODAS_LAS_RESENAS];
        this.resenasFiltradas = [...this.resenas];
        this.container = document.getElementById('resenas-container');
        this.noResultados = document.getElementById('no-resultados');
        
        this.filtroEstrellas = document.getElementById('filtro-estrellas');
        this.filtroFecha = document.getElementById('filtro-fecha');
        this.buscarTexto = document.getElementById('buscar-texto');
        
        this.init();
    }

    init() {
        this.calcularEstadisticas();
        this.aplicarOrdenInicial();
        this.renderResenas();
        this.setupEventListeners();
    }

    calcularEstadisticas() {
        const totalResenas = this.resenas.length;
        const sumaRatings = this.resenas.reduce((sum, resena) => sum + resena.estrellas, 0);
        const promedio = (sumaRatings / totalResenas).toFixed(1);
        const resenasPositivas = this.resenas.filter(r => r.estrellas >= 4).length;
        const porcentajePositivas = Math.round((resenasPositivas / totalResenas) * 100);

        document.getElementById('total-resenas').textContent = totalResenas;
        document.getElementById('promedio-rating').textContent = promedio;
        document.getElementById('resenas-positivas').textContent = porcentajePositivas + '%';
    }

    aplicarOrdenInicial() {
        // Ordenar por fecha más reciente por defecto
        this.resenasFiltradas.sort((a, b) => b.fechaOrden - a.fechaOrden);
    }

    renderResenas() {
        if (this.resenasFiltradas.length === 0) {
            this.container.style.display = 'none';
            this.noResultados.style.display = 'block';
            return;
        }

        this.container.style.display = 'grid';
        this.noResultados.style.display = 'none';
        
        this.container.innerHTML = '';
        
        this.resenasFiltradas.forEach((resena, index) => {
            const resenaElement = this.createResenaElement(resena, index);
            this.container.appendChild(resenaElement);
        });
    }

    createResenaElement(resena, index) {
        const div = document.createElement('div');
        div.className = 'resena-card';
        div.style.animationDelay = `${index * 0.1}s`;
        
        const textoCompleto = resena.texto;
        const textoCorto = textoCompleto.length > 150 ? 
            textoCompleto.substring(0, 150) + '...' : textoCompleto;
        
        div.innerHTML = `
            <div class="resena-header">
                <div class="resena-autor">
                    <div class="autor-avatar">${resena.avatar}</div>
                    <div class="autor-info">
                        <h4>${resena.autor}</h4>
                        <div class="fecha">${resena.fecha}</div>
                    </div>
                </div>
                <div class="resena-rating">
                    ${this.generateStars(resena.estrellas)}
                </div>
            </div>
            <div class="resena-texto" data-texto-completo="${textoCompleto}">
                <span class="texto-mostrado">${textoCorto}</span>
                ${textoCompleto.length > 150 ? 
                    '<span class="ver-mas">Ver más</span>' : ''}
            </div>
        `;

        // Agregar funcionalidad "Ver más"
        const verMas = div.querySelector('.ver-mas');
        if (verMas) {
            verMas.addEventListener('click', () => {
                const textoElement = div.querySelector('.texto-mostrado');
                const textoCompleto = div.querySelector('.resena-texto').dataset.textoCompleto;
                
                if (verMas.textContent === 'Ver más') {
                    textoElement.textContent = textoCompleto;
                    verMas.textContent = 'Ver menos';
                } else {
                    textoElement.textContent = textoCorto;
                    verMas.textContent = 'Ver más';
                }
            });
        }
        
        return div;
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '⭐' : '☆';
        }
        return stars;
    }

    setupEventListeners() {
        this.filtroEstrellas.addEventListener('change', () => this.aplicarFiltros());
        this.filtroFecha.addEventListener('change', () => this.aplicarFiltros());
        this.buscarTexto.addEventListener('input', () => this.aplicarFiltros());
    }

    aplicarFiltros() {
        let resenasFiltradas = [...this.resenas];

        // Filtro por estrellas
        const estrellasFiltro = this.filtroEstrellas.value;
        if (estrellasFiltro !== 'todas') {
            resenasFiltradas = resenasFiltradas.filter(
                resena => resena.estrellas === parseInt(estrellasFiltro)
            );
        }

        // Filtro por texto
        const textoBusqueda = this.buscarTexto.value.toLowerCase().trim();
        if (textoBusqueda) {
            resenasFiltradas = resenasFiltradas.filter(resena =>
                resena.texto.toLowerCase().includes(textoBusqueda) ||
                resena.autor.toLowerCase().includes(textoBusqueda)
            );
        }

        // Ordenar
        const ordenFiltro = this.filtroFecha.value;
        switch (ordenFiltro) {
            case 'recientes':
                resenasFiltradas.sort((a, b) => b.fechaOrden - a.fechaOrden);
                break;
            case 'antiguas':
                resenasFiltradas.sort((a, b) => a.fechaOrden - b.fechaOrden);
                break;
            case 'mejor-valoradas':
                resenasFiltradas.sort((a, b) => b.estrellas - a.estrellas);
                break;
            case 'peor-valoradas':
                resenasFiltradas.sort((a, b) => a.estrellas - b.estrellas);
                break;
        }

        this.resenasFiltradas = resenasFiltradas;
        this.renderResenas();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new ResenasManager();
});
