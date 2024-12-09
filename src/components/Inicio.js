import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
    const [tareas, setTareas] = useState([]);
    const [pendientes, setPendientes] = useState([]);
    const [completadas, setCompletadas] = useState([]);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

    const obtenerTareas = () => {
        axios.get('http://localhost:3001/tareas')
            .then(response => {
                setTareas(response.data);
                setPendientes(response.data.filter(tarea => !tarea.completada));
                setCompletadas(response.data.filter(tarea => tarea.completada));
            })
            .catch(err => console.error('Error al obtener los datos', err));
    };

    useEffect(() => {
        obtenerTareas();
    }, []);

    const eliminarTarea = (id) => {
        axios.delete(`http://localhost:3001/tareas/${id}`)
            .then(response => {
                obtenerTareas();
            })
            .catch(error => console.error("Error al eliminar tarea", error));
    };

    const mostrarDetalles = (id) => {
        setTareaSeleccionada(tareaSeleccionada === id ? null : id);
    };

    return (
        <div className="container">
            <h1 className="my-4">My To-Do List</h1>
            <div className="header d-flex justify-content-center align-items-center">
                <h2>Tareas Pendientes</h2>
                <Link to="/agregar-tarea">
                    <button className="btn button-add">+</button>
                </Link>
            </div>
            <ul className="list-group my-4">
                {pendientes.slice(0, 3).map(tarea => (
                    <li key={tarea.id} className="list-group-item task-item" onClick={() => mostrarDetalles(tarea.id)}>
                        {tarea.nombre}
                        {tareaSeleccionada === tarea.id && (
                            <div className="completed-task-details mt-2">
                                <p>{tarea.descripcion}</p>
                                <p>{tarea.tipo}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Link to="/lista-tareas">
                <button className="btn button-view-all">Ver todas las tareas pendientes</button>
            </Link>
            <div className="header d-flex justify-content-center align-items-center mt-4">
                <h2>Tareas Completadas</h2>
            </div>
            <ul className="list-group my-4">
                {completadas.slice(0, 3).map(tarea => (
                    <li key={tarea.id} className="list-group-item completed-task" onClick={() => mostrarDetalles(tarea.id)}>
                        {tarea.nombre}
                        <button onClick={() => eliminarTarea(tarea.id)} className="btn button-delete ml-2">Eliminar</button>
                        {tareaSeleccionada === tarea.id && (
                            <div className="completed-task-details mt-2">
                                <p>{tarea.descripcion}</p>
                                <p>{tarea.tipo}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inicio;
