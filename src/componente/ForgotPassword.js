import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../caracteristica/ForgotPassword.css'; // Asegúrate de crear este archivo CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recuperar-cuenta', { email });
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      setTimeout(() => {
        navigate('/restablecer-contrasena');
      }, 3000); // Redirigir después de 3 segundos
    } catch (error) {
      setMessage('Error al enviar el enlace de recuperación.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar cuenta</h2>
      <p>Ingresa el correo electrónico que usas en nube eleventa para recuperar tu cuenta:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tudirecciondecorreo@correo.com" required />
        </div>
        <button type="submit" className="btn-submit">Recuperar cuenta</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
