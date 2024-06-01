// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../caracteristica/ResetPassword.css'; // Asegúrate de que este archivo de estilos exista

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('http://localhost:5000/restablecer-contrasena', { email, password });
      alert('Contraseña restablecida exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setError('Error al restablecer la contraseña');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Ingresa la Nueva Contraseña</h2>
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <div className="form-group">
          <label>Nueva Contraseña *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmar Contraseña *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="button" className="btn-reset" onClick={handleReset}>Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
