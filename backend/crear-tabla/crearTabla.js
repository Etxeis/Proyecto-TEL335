const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',        
  database: 'postgres',       
  password: '',     
  port: 5432,               
});

const crearTabla = async () => {
  const client = await pool.connect();
  try {
    // Crear tabla personas
    const queryText = `
      CREATE TABLE IF NOT EXISTS personas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        correo VARCHAR(100) UNIQUE NOT NULL,
        contrasena VARCHAR(100) NOT NULL
      );
    `;
    await client.query(queryText);
    console.log("Tabla 'personas' creada exitosamente.");
  } catch (err) {
    console.error("Error creando la tabla 'personas':", err);
  } finally {
    client.release();
  }
};

crearTabla();
