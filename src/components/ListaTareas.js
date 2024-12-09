import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './ListaTareas.css';

const ListaTareas = () => {
    const [tareas, setTareas] = useState([]);

    const obtenerTareas = () => {
        axios.get("http://localhost:3001/tareas")
            .then(response => setTareas(response.data))
            .catch(err => console.error("Error al obtener los datos", err));
    };

    useEffect(() => {
        obtenerTareas();
    }, []);

    const marcarComoTareaCompletada = (id) => {
        axios.put(`http://localhost:3001/tareas/${id}`)
            .then(response => {
                obtenerTareas();
            })
            .catch(error => console.error("Error al marcar como completada", error));
    };

    const eliminarTarea = (id) => {
        axios.delete(`http://localhost:3001/tareas/${id}`)
            .then(response => {
                obtenerTareas();
            })
            .catch(error => console.error("Error al eliminar tarea", error));
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-start">
                <Link to="/">
                    <button className="button-home">
                        <FaHome className="button-home-icon" /> Inicio
                    </button>
                </Link>
            </div>
            <div className="header">
                <h1>Tareas pendientes</h1>
                <Link to="/agregar-tarea">
                    <button className="button-add">+</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th className="th">Nombre</th>
                            <th className="th">Descripción</th>
                            <th className="th">Tipo</th>
                            <th className="th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas.filter(tarea => !tarea.completada).map(tarea => (
                            <tr key={tarea.id}>
                                <td className="td">{tarea.nombre}</td>
                                <td className="td">{tarea.descripcion}</td>
                                <td className="td">{tarea.tipo}</td>
                                <td className="td">
                                    <div className="d-flex flex-column flex-md-row justify-content-center">
                                        <button onClick={() => marcarComoTareaCompletada(tarea.id)} className="button-delete mb-2 mb-md-0 mr-md-2">Completar</button>
                                        <button onClick={() => eliminarTarea(tarea.id)} className="button-delete">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaTareas;
