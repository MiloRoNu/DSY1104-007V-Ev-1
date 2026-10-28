import HeroCarousel from '../components/HeroCarousel'
import NewsCards from '../components/NewsCards'
import '../css/index.css'

// La página de inicio solo "arma" sus piezas, como bloques de Lego.
function Inicio() {
  return (
    <div className="m-container">
      <HeroCarousel />
      <hr />
      <NewsCards />
    </div>
  )
}

export default Inicio
