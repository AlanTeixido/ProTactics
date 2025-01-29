const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ✅ Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Crear un usuario
router.post('/', async (req, res) => {
    const { nombre_usuario, correo, contrasena_hash, rol } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre_usuario, correo, contrasena_hash, rol) VALUES ($1, $2, $3, $4) RETURNING *;',
            [nombre_usuario, correo, contrasena_hash, rol]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, correo, contrasena_hash, rol } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre_usuario=$1, correo=$2, contrasena_hash=$3, rol=$4 WHERE id=$5 RETURNING *;',
            [nombre_usuario, correo, contrasena_hash, rol, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id=$1;', [id]);
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
