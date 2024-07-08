import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componente/Login';
import Register from './componente/Register';
import ForgotPassword from './componente/ForgotPassword';
import ResetPassword from './componente/ResetPassword';
import ReservarHora from './componente/ReservarHora';
import PerfilUsuario from './componente/PerfilUsuario';
import logo from './caracteristica/logousm.png';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userEmail');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="navbar-right">
            {isAuthenticated ? (
              <>
                <a href="/reservar-hora">Reserva</a>
                <a href="/perfil">Perfil</a>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </>
            ) : (
              <>
                <a href="/iniciar-sesion">Iniciar Sesión</a>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
          <Route path="/iniciar-sesion" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/olvidar-contrasena" element={<ForgotPassword />} />
          <Route path="/restablecer-contrasena" element={<ResetPassword />} />
          {isAuthenticated && (
            <>
              <Route path="/reservar-hora" element={<ReservarHora />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
