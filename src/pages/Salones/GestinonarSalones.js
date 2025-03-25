import React, { useState, useEffect } from "react";
import "./GestionarSalones.css";
import { getSalones, agregarSalon, actualizarSalon, getSalonByMnemonico } from "../../api/salon";

const GestionarSalones = () => {
  const [salones, setSalones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [newSalon, setNewSalon] = useState({
    nombre: "",
    mnemonico: "",
    descripcion: "",
    ubicacion: "",
    capacidad: 0,
    recursos: []
  });

  // Cargar los salones al montar el componente
  useEffect(() => {
    async function cargarSalones() {
      try {
        const data = await getSalones();
        setSalones(data);
      } catch (error) {
        console.error("Error al cargar los salones", error);
      }
    }
    cargarSalones();
  }, []);

  // Alternar estado activo/inactivo
  const toggleActivo = async (mnemonico) => {
    const salon = salones.find(s => s.mnemonico === mnemonico);
    if (!salon) return;

    try {
      await actualizarSalon(mnemonico, { activo: !salon.activo });
      setSalones(salones.map(s => s.mnemonico === mnemonico ? { ...s, activo: !s.activo } : s));
    } catch (error) {
      console.error("Error al actualizar el estado del salón", error);
    }
  };

  // Agregar un nuevo salón
  const handleAddSalon = async () => {
    if (newSalon.nombre.trim() && newSalon.descripcion.trim()) {
      try {
        const addedSalon = await agregarSalon({ ...newSalon, activo: true });
        setSalones([...salones, addedSalon]);
        setNewSalon({ nombre: "", mnemonico: "", descripcion: "", ubicacion: "", capacidad: 0, recursos: [] });
        setShowModal(false);
      } catch (error) {
        console.error("Error al agregar el salón", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  // edita un nuevo salón
  const handleEdit = async () => {
    if (newSalon.nombre.trim() && newSalon.descripcion.trim()) {
      try {
        const EditSalon = await actualizarSalon({ ...newSalon, activo: true });
        setSalones([...salones, EditSalon]);
        setNewSalon({ nombre: "", mnemonico: "", descripcion: "", ubicacion: "", capacidad: 0, recursos: [] });
        setshowEditModal(false);
      } catch (error) {
        console.error("Error al editar el salón", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="gestionar-salones">
      <header className="header">
      <h1>Gestión de Salones</h1>
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
                  <button className="edit-button" onClick={() => setshowEditModal(true)}>Editar</button>
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
              <input type="text" placeholder="Nombre" value={newSalon.nombre} onChange={(e) => getSalones({ ...newSalon, nombre: e.target.value })} />
              <input type="text" placeholder="Mnemónico" value={newSalon.mnemonico} onChange={(e) => setNewSalon({ ...newSalon, mnemonico: e.target.value })} />
              <textarea placeholder="Descripción" value={newSalon.descripcion} onChange={(e) => setNewSalon({ ...newSalon, descripcion: e.target.value })}></textarea>
              <select value={newSalon.ubicacion} onChange={(e) => setNewSalon({ ...newSalon, ubicacion: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option value="Ubicación 1">Ubicación 1</option>
                <option value="Ubicación 2">Ubicación 2</option>
              </select>
              <div className="capacity-container">
                <label htmlFor="capacidad">Capacidad: {newSalon.capacidad}</label>
                <input
                  id="capacidad"
                  type="range"
                  min="0"
                  max="32"
                  value={newSalon.capacidad}
                  onChange={(e) => setNewSalon({ ...newSalon, capacidad: e.target.value })}
                />
              </div>
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

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editando salon</h2>
            <h3>Editar</h3>
            <div className="modal-content">
              <input type="text" placeholder="Nombre" value={newSalon.nombre} onChange={(e) => getSalones({ ...newSalon, nombre: e.target.value })} />
              <input type="text" placeholder="Mnemónico" value={newSalon.mnemonico} onChange={(e) => setNewSalon({ ...newSalon, mnemonico: e.target.value })} />
              <textarea placeholder="Descripción" value={newSalon.descripcion} onChange={(e) => setNewSalon({ ...newSalon, descripcion: e.target.value })}></textarea>
              <select value={newSalon.ubicacion} onChange={(e) => setNewSalon({ ...newSalon, ubicacion: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option value="Ubicación 1">Ubicación 1</option>
                <option value="Ubicación 2">Ubicación 2</option>
              </select>
              <div className="capacity-container">
                <label htmlFor="capacidad">Capacidad: {newSalon.capacidad}</label>
                <input
                  id="capacidad"
                  type="range"
                  min="0"
                  max="32"
                  value={newSalon.capacidad}
                  onChange={(e) => setNewSalon({ ...newSalon, capacidad: e.target.value })}
                />
              </div>
              <select multiple value={newSalon.recursos} onChange={(e) => setNewSalon({ ...newSalon, recursos: Array.from(e.target.selectedOptions, option => option.value) })}>
                <option value="Recurso 1">Recurso 1</option>
                <option value="Recurso 2">Recurso 2</option>
                <option value="Recurso 3">Recurso 3</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setshowEditModal(false)}>Cancelar</button>
              <button className="save-button" onClick={handleEdit}>Editar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionarSalones;
