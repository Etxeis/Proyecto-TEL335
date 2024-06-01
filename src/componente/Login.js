import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../caracteristica/Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/iniciar-sesion', { correo, contrasena });
      setMessage('Inicio de sesión exitoso.');
      // Guarda el token en localStorage o maneja la autenticación según necesites
    } catch (error) {
      setMessage('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" required />
        </div>
        <button type="submit" className="btn-submit">Iniciar sesión</button>
      </form>
      <p className="register-link">¿No tienes cuenta? <Link to="/registrar">Regístrate</Link></p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;

