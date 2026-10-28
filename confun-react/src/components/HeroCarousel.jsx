import { Carousel } from 'react-bootstrap'

// Las imágenes ahora son una lista de datos. Para agregar otra,
// basta con sumar una línea aquí; no hay que tocar el HTML.
const slides = [
  { src: '/img/slider1.png', alt: 'Imagen del slider 1' },
  { src: '/img/slider2.png', alt: 'Imagen del slider 2' },
  { src: '/img/slider3.png', alt: 'Imagen del slider 3' },
]

// Reemplaza a js/carousel.js: React Bootstrap ya trae las flechas,
// el cambio automático (interval) y el efecto de desvanecido (fade).
function HeroCarousel() {
  return (
    <section className="hero-carousel">
      <div className="texto">
        <h1>Bienvenido a ConFun</h1>
        <p>Encuentra las mejores consolas a un precio asequible.</p>
      </div>
      <Carousel fade interval={7000} indicators={false}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.src}>
            <img className="d-block w-100 carousel-image" src={slide.src} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}

export default HeroCarousel
