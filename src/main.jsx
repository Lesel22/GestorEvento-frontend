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
import InicioPage from './pages/InicioPage.jsx'
import ValidarUserPage from './pages/ValidarUserPage.jsx'
import EditarEventoPage from './pages/EditarEventoPage.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import PublicOnyRoute from './components/PublicOnlyRoute.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>

      <Routes>
        <Route element={<PublicOnyRoute/>}>
          <Route element={<LayoutHome />}>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/habilitar-usuario' element={<ValidarUserPage />} />
          </Route>
        </Route>

        <Route element={<AuthValidation/>}>
          <Route element={<LayoutUser />}>
            <Route>
              <Route path='/inicio' element={<InicioPage />} />
              <Route path='/eventos' element={<EventosPage />} />
              <Route path='/eventos/:id' element={<EventoPage />} />
              {/* <Route path='/misEventos' element={<MisEventosPage />} />
              <Route path='/crearEvento' element={<CrearEventoPage />} />
              <Route path='/editarEvento/:id' element={<EditarEventoPage />} /> */}
              <Route path='/inscripciones' element={<InscripcionesPage />} />
              <Route path="*" element={<Navigate to="/eventos" replace />} />
            </Route>
          </Route>
        </Route>
        
      </Routes>

    </BrowserRouter>
  </AuthProvider>
)
