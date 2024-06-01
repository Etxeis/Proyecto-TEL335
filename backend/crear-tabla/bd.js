const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

// Función para crear la tabla horarios si no existe
const crearTablaHorarios = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS horarios (
        id SERIAL PRIMARY KEY,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL
      );
    `;
    await client.query(queryText);
    console.log("Tabla 'horarios' creada exitosamente.");
  } catch (err) {
    console.error("Error creando la tabla 'horarios':", err);
  } finally {
    client.release();
  }
};

// Función para eliminar duplicados existentes
const eliminarDuplicados = async () => {
  const client = await pool.connect();
  try {
    const deleteQuery = `
      DELETE FROM horarios
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM horarios
        GROUP BY hora_inicio, hora_fin
      );
    `;
    await client.query(deleteQuery);
    console.log("Duplicados eliminados exitosamente.");
  } catch (err) {
    console.error("Error eliminando duplicados:", err);
  } finally {
    client.release();
  }
};

// Función para insertar horarios predeterminados
const insertarHorariosPredeterminados = async () => {
  const client = await pool.connect();
  try {
    const horarios = [
      { hora_inicio: '08:00:00', hora_fin: '09:00:00' },
      { hora_inicio: '09:00:00', hora_fin: '10:00:00' },
      { hora_inicio: '10:00:00', hora_fin: '11:00:00' },
      { hora_inicio: '11:00:00', hora_fin: '12:00:00' },
      { hora_inicio: '12:00:00', hora_fin: '13:00:00' },
      { hora_inicio: '13:00:00', hora_fin: '14:00:00' },
      { hora_inicio: '14:00:00', hora_fin: '15:00:00' },
      { hora_inicio: '15:00:00', hora_fin: '16:00:00' },
      { hora_inicio: '16:00:00', hora_fin: '17:00:00' },
      { hora_inicio: '17:00:00', hora_fin: '18:00:00' },
      { hora_inicio: '18:00:00', hora_fin: '19:00:00' },
    ];

    for (const horario of horarios) {
      const result = await client.query(
        'SELECT * FROM horarios WHERE hora_inicio = $1 AND hora_fin = $2',
        [horario.hora_inicio, horario.hora_fin]
      );
      if (result.rows.length === 0) {
        await client.query(
          'INSERT INTO horarios (hora_inicio, hora_fin) VALUES ($1, $2)',
          [horario.hora_inicio, horario.hora_fin]
        );
      }
    }

    console.log("Horarios predeterminados insertados exitosamente.");
  } catch (err) {
    console.error("Error insertando horarios predeterminados:", err);
  } finally {
    client.release();
  }
};

// Ejecutar las funciones para crear la tabla, eliminar duplicados e insertar los horarios
const iniciar = async () => {
  await crearTablaHorarios();
  await eliminarDuplicados();
  await insertarHorariosPredeterminados();
};

iniciar();
