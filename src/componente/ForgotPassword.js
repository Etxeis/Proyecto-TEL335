import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../caracteristica/ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(2);
  };

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('http://localhost:5000/restablecer-contrasena', { email, password });
      alert('Contraseña restablecida exitosamente');
      navigate('/iniciar-sesion');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setError('Error al restablecer la contraseña');
    }
  };

  return (
    <div className="forgot-password-container">
      {step === 1 ? (
        <>
          <h2>Restablecer Contraseña</h2>
          <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="button" className="btn-next" onClick={handleNext}>Siguiente</button>
          </form>
        </>
      ) : (
        <>
          <h2>Restablecer la contraseña</h2>
          <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="form-group">
              <label>Nueva contraseña *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
            <div className="form-group">
              <label>Vuelve a escribir la contraseña *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
            <p>8 caracteres como mínimo, distingue mayúsculas de minúsculas</p>
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button type="button" className="btn-cancel" onClick={() => setStep(1)}>Cancelar</button>
              <button type="button" className="btn-reset" onClick={handleReset}>Siguiente</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;

