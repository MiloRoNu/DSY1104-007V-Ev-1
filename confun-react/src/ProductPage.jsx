import Header from './components/Header'
import Footer from './components/Footer'
import Productos from './pages/Productos'

// App es el "esqueleto" de todas las páginas: header arriba, footer abajo
// y en el medio la página que toca mostrar (por ahora solo Inicio).
function ProductPage() {
  return (
    <>
      <Header />
      <main>
        <Productos />
      </main>
      <Footer />
    </>
  )
}

export default ProductPage
