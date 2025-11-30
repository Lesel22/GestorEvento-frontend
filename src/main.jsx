import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LayoutHome from './layout/LayoutHome.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

// Supports weights 400-900
import '@fontsource-variable/playfair-display';
import EventosPage from './pages/EventosPage.jsx'
import AuthValidation from './components/AuthValidation.jsx'
import EventoPage from './pages/EventoPage.jsx'
import InscripcionesPage from './pages/InscripcionesPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RoleValidation from './components/RoleValidation.jsx'
import MisEventosPage from './pages/MisEventosPage.jsx'
import LayoutUser from './layout/LayoutUser.jsx'
import LayoutOrganizer from './layout/LayoutOrganizer.jsx'
import CrearEventoPage from './pages/CrearEventoPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <Routes>
      <Route element={<LayoutHome />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      <Route element={<AuthValidation/>}>

        <Route element={<RoleValidation role="3" />}>
          <Route element={<LayoutUser />}>
            <Route>
              <Route path='/inicio' element={<EventosPage />} />
              <Route path='/eventos' element={<EventosPage />} />
              <Route path='/eventos/:id' element={<EventoPage />} />
              <Route path='/inscripciones' element={<InscripcionesPage />} />
              <Route path="*" element={<Navigate to="/eventos" replace />} />
            </Route>
          </Route>
        </Route>

        <Route element={<RoleValidation role="2" />}>
          <Route element={<LayoutOrganizer />}>
            <Route>
              {/* <Route path='/inicio' element={<MisEventosPage />} /> */}
              <Route path='/misEventos' element={<MisEventosPage />} />
              <Route path='/crearEvento' element={<CrearEventoPage />} />
              {/* <Route path='/eventos/:id' element={<EventoPage />} />
              <Route path='/inscripciones' element={<InscripcionesPage />} /> */}
              {/* <Route path="*" element={<Navigate to="/eventos" replace />} /> */}
            </Route>
        </Route>
        </Route>
      </Route>
      
    </Routes>

  </BrowserRouter>
)
