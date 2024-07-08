import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../caracteristica/PerfilUsuario.css'; // Asegúrate de que este archivo de estilos exista

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const correoUsuario = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/usuario?correo=${correoUsuario}`);
        setUsuario(userResponse.data);
        const reservasResponse = await axios.get(`http://localhost:5000/reservas?correo=${correoUsuario}`);
        setReservas(reservasResponse.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchUserProfile();
  }, [correoUsuario]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reservar-hora/${id}`);
      setReservas(reservas.filter((reserva) => reserva.id !== id));
      setMensaje('Reserva eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      setMensaje('Error al eliminar la reserva');
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Correo: {usuario.correo}</p>
      <h2>Mis Reservas</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {`${formatFecha(reserva.fecha)} - ${reserva.hora_inicio.slice(0, 5)} a ${reserva.hora_fin.slice(0, 5)} - ${reserva.departamento}`}
            <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerfilUsuario;
