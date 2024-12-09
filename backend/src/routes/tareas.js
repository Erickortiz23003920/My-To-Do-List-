const express = require('express');
const router = express.Router();
const connection = require("./db");

router.get('/', (req, res) => {
    connection.query('SELECT * FROM tareas', (err, results) => {
        if (err) {
            console.error('Error obteniendo tareas:', err);
            res.status(500).send('Error obteniendo tareas');
            return;
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre, descripcion, tipo } = req.body;
    const nuevaTarea = { nombre, descripcion, tipo };
    connection.query('INSERT INTO tareas SET ?', nuevaTarea, (err, results) => {
        if (err) {
            console.error('Error agregando tarea:', err);
            res.status(500).send('Error agregando tarea');
            return;
        }
        res.status(201).json({ id: results.insertId, ...nuevaTarea });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error eliminando tarea:', err);
            res.status(500).send('Error eliminando tarea');
            return;
        }
        res.status(204).send();
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('UPDATE tareas SET completada = TRUE WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error marcando tarea como completada:', err);
            res.status(500).send('Error marcando tarea como completada');
            return;
        }
        res.status(200).send();
    });
});

module.exports = router;
