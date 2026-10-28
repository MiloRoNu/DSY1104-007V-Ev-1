import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="f-container">
        <div className="footer-content">
          <nav id="footer-nav" aria-label="Navegación del pie de página">
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="#">Nosotros</a></li>
              <li><Link to="/ProductPage">Productos</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </nav>
          <p>&copy; 2024 ConFun. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
