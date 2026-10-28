import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1) Primero el CSS de Bootstrap (igual que en la guía 2.1.2, paso 25)
import 'bootstrap/dist/css/bootstrap.min.css'
// 2) Después nuestros estilos, para que puedan "pisar" a los de Bootstrap
import './css/style.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
