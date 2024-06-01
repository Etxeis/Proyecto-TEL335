const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const port = 5000; // Puerto del backend

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

  console.log('Datos recibidos:', { nombre, apellido, correo, contrasena });
  console.log('Contraseña encriptada:', hashedPassword);

  try {
    // Verificar si el correo ya existe
    const correoExistente = await pool.query('SELECT * FROM personas WHERE correo = $1', [correo]);
    if (correoExistente.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    const result = await pool.query(
      'INSERT INTO personas (nombre, apellido, correo, contrasena) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, correo, hashedPassword]
    );
    console.log('Resultado de la inserción:', result.rows[0]);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.status(500).json({ error: 'Error al registrar el usuario.', detalle: err.message });
  }
});

// Inicio de sesión de usuario
app.post('/iniciar-sesion', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM personas WHERE correo = $1', [correo]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: user });
  } catch (err) {
    console.error('Error al verificar el usuario:', err);
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: err.message });
  }
});

// Obtener horarios disponibles
app.get('/horarios-disponibles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM horarios WHERE correo_usuario IS NULL');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener los horarios:', err);
    res.status(500).json({ error: 'Error al obtener los horarios.', detalle: err.message });
  }
});

// Reservar horario
app.post('/reservar-hora/:id', async (req, res) => {
  const { id } = req.params;
  const { correo } = req.body;

  try {
    const result = await pool.query('UPDATE horarios SET correo_usuario = $1 WHERE id = $2 AND correo_usuario IS NULL RETURNING *', [correo, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Horario no encontrado o ya reservado' });
    }

    res.status(200).json({ message: 'Reserva exitosa', horario: result.rows[0] });
  } catch (err) {
    console.error('Error al reservar la hora:', err);
    res.status(500).json({ error: 'Error al reservar la hora.' });
  }
});

// Restablecer contraseña
app.post('/restablecer-contrasena', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('UPDATE personas SET contrasena = $1 WHERE correo = $2', [hashedPassword, email]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  } catch (err) {
    console.error('Error al restablecer la contraseña:', err);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
