import HeroCarousel from '../components/HeroCarousel'
import NewsCards from '../components/NewsCards'
import ProductCards from '../components/ProductCards'
import '../css/index.css'

// La página de inicio solo "arma" sus piezas, como bloques de Lego.
function Productos() {
  return (
    <div className="m-container">
      <ProductCards />
    </div>
  )
}

export default Productos
