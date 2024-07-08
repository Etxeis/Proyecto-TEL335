const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'baseH2',
  password: 'Hsienlee',
  port: 5432,
});

const eliminarTablaHorario = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS horario');
    console.log("Tabla 'horario' eliminada exitosamente.");
  } catch (err) {
    console.error("Error eliminando la tabla 'horario':", err);
  } finally {
    client.release();
  }
};

eliminarTablaHorario();
