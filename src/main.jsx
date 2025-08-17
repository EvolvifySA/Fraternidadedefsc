import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Topo from './components/topo'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <Topo />
  </StrictMode>,
)
