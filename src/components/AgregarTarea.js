import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AgregarTarea.css';

const AgregarTarea = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaTarea = { nombre, descripcion, tipo };
        axios.post('http://localhost:3001/tareas', nuevaTarea)
            .then(response => {
                console.log('Tarea agregada:', response.data);
                setNombre('');
                setDescripcion('');
                setTipo('');
                navigate('/lista-tareas'); // Redirigir a la lista de tareas
            })
            .catch(error => console.error('Error al agregar tarea', error));
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="container">
            <h1>Agregar Tarea</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="input form-control" />
                </div>
                <div className="form-group">
                    <label className="label">Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={handleDescripcionChange}
                        required
                        className="textarea form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Tipo:</label>
                    <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required className="input form-control" />
                </div>
                <div className="button-group d-flex justify-content-center">
                    <button type="submit" className="btn button mr-2">Agregar Tarea</button>
                    <button type="button" className="btn button" onClick={() => navigate('/lista-tareas')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AgregarTarea;
