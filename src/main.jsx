import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Topo from './components/topo'
import Home from './pages/Home'
import Rodape from './components/Rodape/Index'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Home />
        <Rodape />
      </div>
    </BrowserRouter>


  </StrictMode>,
)

