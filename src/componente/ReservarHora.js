import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../caracteristica/ReservarHora.css';

const ReservarHora = () => {
  const [horarios, setHorarios] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mensaje, setMensaje] = useState('');
  const [departamento, setDepartamento] = useState('futbol'); // Valor inicial por defecto
  const [selectedHorario, setSelectedHorario] = useState(null);
  const correoUsuario = localStorage.getItem('userEmail'); // Obtener el correo del usuario autenticado

  useEffect(() => {
    const fetchHorarios = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      try {
        const response = await axios.get(`http://localhost:5000/horarios-disponibles?departamento=${departamento}&fecha=${formattedDate}`);
        console.log('Horarios obtenidos:', response.data); // Añadir log para verificar datos
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };
    fetchHorarios();
  }, [departamento, selectedDate]);

  const handleReserve = async () => {
    if (!selectedHorario) return;

    try {
      const response = await axios.post(`http://localhost:5000/reservar-hora/${selectedHorario.id}`, { correo: correoUsuario });
      setHorarios(horarios.filter((horario) => horario.id !== selectedHorario.id));
      setMensaje(`Reserva exitosa para el horario ${response.data.horario.hora_inicio.slice(0, 5)} - ${response.data.horario.hora_fin.slice(0, 5)}`);
      setSelectedHorario(null);
    } catch (error) {
      console.error('Error al reservar la hora:', error);
      setMensaje('Error al reservar la hora');
    }
  };

  const renderHorarios = (period) => {
    const periodStart = period === 'Mañana' ? '08:00:00' : '12:00:00';
    const periodEnd = period === 'Mañana' ? '12:00:00' : '18:00:00';

    const horariosFiltrados = horarios.filter((horario) => {
      const horaInicio = horario.hora_inicio;
      return horaInicio >= periodStart && horaInicio < periodEnd;
    });

    console.log(`Horarios filtrados (${period}):`, horariosFiltrados);

    if (horariosFiltrados.length === 0) {
      return <p>No hay horarios disponibles</p>;
    }

    return horariosFiltrados.map((horario) => (
      <div
        key={horario.id}
        className={`horario ${selectedHorario?.id === horario.id ? 'selected' : ''}`}
        onClick={() => setSelectedHorario(horario)}
      >
        {`${horario.hora_inicio.slice(0, 5)} - ${horario.hora_fin.slice(0, 5)}`}
      </div>
    ));
  };

  return (
    <div className="reserve-container">
      <h1>Reservar Hora</h1>
      <p>Selecciona Fecha, Hora y Departamento</p>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />
      <select value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
        <option value="futbol">Fútbol</option>
        <option value="basquet">Básquet</option>
        <option value="volley">Volley</option>
      </select>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <div className="horarios-container">
        <div>
          <h2>Mañana</h2>
          <div className="horarios">
            {renderHorarios('Mañana')}
          </div>
        </div>
        <div>
          <h2>Tarde</h2>
          <div className="horarios">
            {renderHorarios('Tarde')}
          </div>
        </div>
      </div>
      {selectedHorario && (
        <div>
          <p>Horario seleccionado: {`${selectedHorario.hora_inicio.slice(0, 5)} - ${selectedHorario.hora_fin.slice(0, 5)}`}</p>
          <button onClick={handleReserve}>Confirmar Reserva</button>
        </div>
      )}
    </div>
  );
};

export default ReservarHora;
