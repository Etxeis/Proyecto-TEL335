import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componente/Login';
import Register from './componente/Register';
import ForgotPassword from './componente/ForgotPassword';
import ResetPassword from './componente/ResetPassword';
import ReservarHora from './componente/ReservarHora';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/olvidar-contrasena" element={<ForgotPassword />} />
          <Route path="/restablecer-contrasena" element={<ResetPassword />} />
          <Route path="/reservar-hora" element={<ReservarHora />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
