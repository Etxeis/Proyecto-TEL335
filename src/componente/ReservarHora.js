// ReservarHora.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../caracteristica/ReservarHora.css';

const ReservarHora = () => {
  const [horarios, setHorarios] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mensaje, setMensaje] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('user@example.com'); // Reemplaza con el correo del usuario autenticado

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/horarios-disponibles');
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };
    fetchHorarios();
  }, []);

  const handleReserve = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/reservar-hora/${id}`, { correo: correoUsuario });
      setHorarios(horarios.filter((horario) => horario.id !== id));
      setMensaje(`Reserva exitosa para el horario ${response.data.horario.hora_inicio.slice(0, 5)} - ${response.data.horario.hora_fin.slice(0, 5)}`);
    } catch (error) {
      console.error('Error al reservar la hora:', error);
      setMensaje('Error al reservar la hora');
    }
  };

  const renderHorarios = (period) => {
    const periodStart = period === 'Mañana' ? '08:00:00' : '12:00:00';
    const periodEnd = period === 'Mañana' ? '12:00:00' : '18:00:00';

    return horarios
      .filter((horario) => {
        const horaInicio = horario.hora_inicio;
        return horaInicio >= periodStart && horaInicio < periodEnd;
      })
      .map((horario) => (
        <div key={horario.id} className="horario">
          <p>{`${horario.hora_inicio.slice(0, 5)} - ${horario.hora_fin.slice(0, 5)}`}</p>
          <button onClick={() => handleReserve(horario.id)}>Reservar</button>
        </div>
      ));
  };

  return (
    <div className="reserve-container">
      <h1>Atención General</h1>
      <p>Selecciona Fecha y Hora</p>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <h2>Mañana</h2>
      <div className="horarios">
        {renderHorarios('Mañana')}
      </div>
      <h2>Tarde</h2>
      <div className="horarios">
        {renderHorarios('Tarde')}
      </div>
    </div>
  );
};

export default ReservarHora;
