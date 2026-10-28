import { useState } from 'react'
import { Link } from 'react-router-dom'

// Antes este header estaba copiado en cada .html.
// Ahora es un componente: se escribe una vez y se reutiliza.
function Header() {
  // Leemos el carrito desde localStorage (la misma clave que usaba carrito.js)
  const [cantidad] = useState(() => {
    const carrito = JSON.parse(localStorage.getItem('miCarrito')) || []
    return carrito.length
  })

  return (
    <header className="site-header">
      <div className="h-container">
        <div className="brand">
          <a href="/">
            <img src="/img/logo.png" alt="Logo de ConFun" className="logo" width="200" height="75" />
          </a>
        </div>
        <nav id="main-nav" aria-label="Navegación principal">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><Link to="/ProductPage">Productos</Link></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <div className="inicio-carrito">
          <a className="inicio-sesion" href="#">Iniciar sesión</a>
          <a className="carrito" href="#">🛒 Carrito ({cantidad})</a>
        </div>
      </div>
    </header>
  )
}

export default Header
