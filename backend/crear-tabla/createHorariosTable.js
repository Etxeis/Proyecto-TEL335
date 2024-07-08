const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'baseH2',
  password: 'Hsienlee',
  port: 5432,
});

const crearTablaHorario = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS horario (
        id SERIAL PRIMARY KEY,
        fecha DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        departamento VARCHAR(50) NOT NULL,
        reservado BOOLEAN DEFAULT FALSE,
        correo_usuario VARCHAR(100)
      );
    `;
    await client.query(queryText);
    console.log("Tabla 'horario' creada exitosamente.");
  } catch (err) {
    console.error("Error creando la tabla 'horario':", err);
  } finally {
    client.release();
  }
};

crearTablaHorario();


