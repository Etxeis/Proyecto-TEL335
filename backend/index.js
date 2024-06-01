const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',        
  database: 'baseH2',       
  password: 'Hsienlee',     
  port: 5432,               
});

// Registro de usuario
app.post('/registrar', async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  try {
    const result = await pool.query(
      'INSERT INTO personas (nombre, apellido, correo, contrasena) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, correo, hashedPassword]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Inicio de sesión
app.post('/iniciar-sesion', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM personas WHERE correo = $1', [correo]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (validPassword) {
        const token = jwt.sign({ userId: user.id }, 'tu-clave-secreta', { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
      } else {
        res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
      }
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

