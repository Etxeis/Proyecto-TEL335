import React, { useState } from 'react';
import axios from 'axios';
import '../caracteristica/ResetPassword.css'; // Asegúrate de crear este archivo CSS

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/restablecer-contrasena', { password });
      setMessage('Tu contraseña ha sido restablecida exitosamente.');
    } catch (error) {
      setMessage('Error al restablecer la contraseña.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nueva contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nueva contraseña" required />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" required />
        </div>
        <button type="submit" className="btn-submit">Restablecer contraseña</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
