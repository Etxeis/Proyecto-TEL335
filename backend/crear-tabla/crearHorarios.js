const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'baseH2',
  password: 'Hsienlee',
  port: 5432,
});

const getDaysArray = (start, end) => {
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    arr.push(new Date(dt));
  }
  return arr;
};

const crearHorarios = async () => {
  const client = await pool.connect();
  try {
    const departamentos = ['futbol', 'basquet', 'volley'];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const fechas = getDaysArray(startDate, endDate);

    for (let fecha of fechas) {
      const formattedDate = fecha.toISOString().split('T')[0];
      for (let departamento of departamentos) {
        for (let i = 8; i < 20; i++) {
          const horaInicio = `${i}:00:00`;
          const horaFin = `${i + 1}:00:00`;
          const queryText = `
            INSERT INTO horario (fecha, hora_inicio, hora_fin, departamento)
            VALUES ($1, $2, $3, $4)
          `;
          console.log(`Insertando horario: Fecha: ${formattedDate}, Hora Inicio: ${horaInicio}, Hora Fin: ${horaFin}, Departamento: ${departamento}`);
          await client.query(queryText, [formattedDate, horaInicio, horaFin, departamento]);
        }
      }
    }
    console.log("Horarios creados exitosamente.");
  } catch (err) {
    console.error("Error creando los horarios:", err);
  } finally {
    client.release();
  }
};

crearHorarios();


