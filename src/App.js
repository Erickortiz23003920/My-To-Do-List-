import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from "./components/Inicio";
import AgregarTarea from "./components/AgregarTarea";
import DetallesTarea from "./components/DetallesTarea";
import ListaTareas from "./components/ListaTareas";

const App =() => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Inicio />}></Route>
        <Route exact path='/agregar-tarea' element={<AgregarTarea />}></Route>
        <Route exact path='/lista-tareas' element={<ListaTareas />}></Route>
        <Route exact path='detalles-tarea' element={<DetallesTarea/>}></Route> 
      </Routes>
</Router>
  );
}

export default App;
