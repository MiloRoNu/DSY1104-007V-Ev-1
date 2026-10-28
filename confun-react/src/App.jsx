import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'

// App es el "esqueleto" de todas las páginas: header arriba, footer abajo
// y en el medio la página que toca mostrar (por ahora solo Inicio).
function App() {
  return (
    <>
      <Header />
      <main>
        <Inicio />
      </main>
      <Footer />
    </>
  )
}

export default App
