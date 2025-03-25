import React, { useState, useEffect } from "react";
import "./GestionarSalones.css";
import { getSalones, agregarSalon, actualizarSalon, getSalonByMnemonico, getDisponible } from "../../api/salon";
import { getRecursos, consultarRecurso, agregarRecurso, actualizarRecurso} from "../../api/recursos";

const GestionarSalones = () => {
  const [salones, setSalones] = useState([]);
  const [recursosDisponibles, setRecursosDisponibles] = useState([]);
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
    async function cargarDatos() {
      try {
        const dataSalones = await getSalones();
        setSalones(dataSalones);

        const dataRecursos = await getRecursos();
        setRecursosDisponibles(dataRecursos);
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    }
    cargarDatos();
  }, []);

  // Alternar estado activo/inactivo
  const toggleActivo = async (salonId) => {
    try {
      setSalones((prevSalones) =>
        prevSalones.map(salon =>
          salon.id === salonId ? { ...salon, activo: !salon.activo } : salon
        )
      );

      const salonActualizado = salones.find(s => s.id === salonId);
      const nuevoEstado = !salonActualizado?.activo; // Asegura el nuevo estado

      await fetch(`URL_DEL_BACKEND/salones/${salonId}/toggleActivo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: nuevoEstado }),
      });
    } catch (error) {
      console.error("Error al cambiar estado de salón:", error);
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
        await actualizarSalon(newSalon.mnemonico, newSalon); // Pasar el mnemonico y los datos actualizados
        setSalones(salones.map(s => s.mnemonico === newSalon.mnemonico ? newSalon : s)); // Actualizar la lista
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
                    <input
                      type="checkbox"
                      checked={salon.activo}
                      onChange={() => toggleActivo(salon.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={async () => {
                      try {
                        const salonData = await getSalonByMnemonico(salon.mnemonico);
                        setNewSalon(salonData);  // Cargar los datos en el formulario
                        setshowEditModal(true);  // Mostrar el modal de edición
                      } catch (error) {
                        console.error("Error al obtener el salón", error);
                      }
                    }}
                  >
                    Editar
                  </button>
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
                <option value="">Ubicación...</option>
                <option value="Edificio B">Edificio B LAB-ISIS</option>
                <option value="Edificio H">Edificio H H-LABISIS</option>
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
              <select
                multiple
                value={newSalon.recursos}
                onChange={(e) => setNewSalon({ ...newSalon, recursos: Array.from(e.target.selectedOptions, option => option.value) })}
              >
                {recursosDisponibles.map((recurso) => (
                  <option key={recurso.id} value={recurso.id}>
                    {recurso.nombre}
                  </option>
                ))}
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
              <input
                type="text"
                placeholder="Nombre"
                value={newSalon.nombre}
                onChange={(e) => setNewSalon({ ...newSalon, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Mnemónico"
                value={newSalon.mnemonico}
                onChange={(e) => setNewSalon({ ...newSalon, mnemonico: e.target.value })}
                disabled // No permitir modificar el mnemónico
              />
              <textarea
                placeholder="Descripción"
                value={newSalon.descripcion}
                onChange={(e) => setNewSalon({ ...newSalon, descripcion: e.target.value })}
              />
              <select value={newSalon.ubicacion} onChange={(e) => setNewSalon({ ...newSalon, ubicacion: e.target.value })}>
                <option value="">Ubicación...</option>
                <option value="Edificio B">Edificio B LAB-ISIS</option>
                <option value="Edificio H">Edificio H H-LABISIS</option>
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
              <select
                multiple
                value={newSalon.recursos}
                onChange={(e) => setNewSalon({ ...newSalon, recursos: Array.from(e.target.selectedOptions, option => option.value) })}
              >
                {recursosDisponibles.map((recurso) => (
                  <option key={recurso.id} value={recurso.id}>
                    {recurso.nombre}
                  </option>
                ))}
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