import React, { useState } from "react";
import "./GestionarSalones.css";

const GestionarSalones = () => {
  const [salones, setSalones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSalon, setNewSalon] = useState({
    nombre: "",
    mnemonico: "",
    descripcion: "",
    ubicacion: "",
    capacidad: 0,
    recursos: []
  });

  const toggleActivo = (id) => {
    setSalones(salones.map(salon => salon.id === id ? { ...salon, activo: !salon.activo } : salon));
  };

  const handleEdit = (id) => {
    alert(`Editar salón con ID: ${id}`);
  };

  const handleDelete = (id) => {
    setSalones(salones.filter(salon => salon.id !== id));
  };

  const handleAddSalon = () => {
    if (newSalon.nombre.trim() && newSalon.descripcion.trim()) {
      setSalones([...salones, { id: Date.now(), ...newSalon, activo: true }]);
      setNewSalon({ nombre: "", mnemonico: "", descripcion: "", ubicacion: "", capacidad: 0, recursos: [] });
      setShowModal(false);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="gestionar-salones">
      <header className="header">
        <h2>Panel de control</h2>
        <p>Buen día, <strong>Admin</strong></p>
        <p>Gestiona las reservas que has agendado últimamente</p>
      </header>

      <div className="top-bar">
        <input type="text" placeholder="🔍 Buscar" className="search-bar" />
        <button className="add-button" onClick={() => setShowModal(true)}>Agregar salón</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Activo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {salones.map((salon) => (
              <tr key={salon.id}>
                <td>{salon.nombre}</td>
                <td>{salon.descripcion}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={salon.activo} onChange={() => toggleActivo(salon.id)} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(salon.id)}>✏️ Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(salon.id)}>🗑️ Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Crear nuevo salón</h2>
            <h3>Agregar salón</h3>
            <div className="modal-content">
              <input type="text" placeholder="Nombre" value={newSalon.nombre} onChange={(e) => setNewSalon({ ...newSalon, nombre: e.target.value })} />
              <input type="text" placeholder="Mnemónico" value={newSalon.mnemonico} onChange={(e) => setNewSalon({ ...newSalon, mnemonico: e.target.value })} />
              <textarea placeholder="Descripción" value={newSalon.descripcion} onChange={(e) => setNewSalon({ ...newSalon, descripcion: e.target.value })}></textarea>
              <select value={newSalon.ubicacion} onChange={(e) => setNewSalon({ ...newSalon, ubicacion: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option value="Ubicación 1">Ubicación 1</option>
                <option value="Ubicación 2">Ubicación 2</option>
              </select>
              <input type="range" min="0" max="32" value={newSalon.capacidad} onChange={(e) => setNewSalon({ ...newSalon, capacidad: e.target.value })} />
              <select multiple value={newSalon.recursos} onChange={(e) => setNewSalon({ ...newSalon, recursos: Array.from(e.target.selectedOptions, option => option.value) })}>
                <option value="Recurso 1">Recurso 1</option>
                <option value="Recurso 2">Recurso 2</option>
                <option value="Recurso 3">Recurso 3</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="save-button" onClick={handleAddSalon}>Crear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarSalones;
