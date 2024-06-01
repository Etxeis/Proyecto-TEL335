import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../caracteristica/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registrar', {
        nombre,
        apellido,
        correo,
        contrasena
      });
      setMessage('Usuario registrado exitosamente.');
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar el usuario.');
    }
  };

  return (
    <div className="register-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" required />
        </div>
        <button type="submit" className="btn-submit">Regístrate</button>
      </form>
      <p className="login-link">¿Ya eres miembro? <Link to="/iniciar-sesion">Inicia tu sesión</Link></p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
