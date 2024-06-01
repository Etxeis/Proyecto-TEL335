import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../caracteristica/Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/iniciar-sesion', { correo, contrasena });
      console.log(response.data);
      if (response.data.message === 'Inicio de sesión exitoso') {
        setError(''); // Limpiar cualquier error previo
        navigate('/reservar-hora'); // Redirigir a la página de reserva de horario después del inicio de sesión exitoso
      } else {
        setError(response.data.error); // Mostrar el mensaje de error desde el servidor
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión: ' + (error.response ? error.response.data.error : 'Network Error'));
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <p>¿Es tu primera vez? <Link to="/registrar">Regístrate</Link></p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label>Email *</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña *</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </div>
        <p><Link to="/olvidar-contrasena">¿Olvidaste la contraseña?</Link></p>
        <button type="submit" className="btn-submit">Iniciar sesión</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
