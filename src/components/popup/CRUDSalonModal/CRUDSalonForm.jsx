import React from "react";
import RecursoItem from "./RecursoItem";

function CRUDSalonForm({ tempSalon, setTempSalon, isEditing }) {
  // Función para agregar un nuevo recurso
  const agregarRecurso = () => {
    setTempSalon({ ...tempSalon, recursos: [...tempSalon.recursos, { nombre: "", cantidad: 1, especificaciones: [], activo: true }] });
  };

  // Función para eliminar un recurso por índice
  const eliminarRecurso = (index) => {
    setTempSalon({ 
      ...tempSalon, 
      recursos: tempSalon.recursos.filter((_, i) => i !== index) 
    });
  };

  // Función para actualizar un recurso específico
  const actualizarRecurso = (index, value) => {
    const nuevosRecursos = [...tempSalon.recursos];
    nuevosRecursos[index] = value;
    setTempSalon({ ...tempSalon, recursos: nuevosRecursos });
  };

  return (
    <div className="modal-content">
      <div className="campo">
        <label>Mnemónico:</label>
        <input
          type="text"
          placeholder="Mnemónico"
          value={tempSalon.mnemonico}
          onChange={(e) => setTempSalon({ ...tempSalon, mnemonico: e.target.value })}
          disabled={isEditing}
        />
      </div>

      <div className="campo">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          value={tempSalon.nombre}
          onChange={(e) => setTempSalon({ ...tempSalon, nombre: e.target.value })}
        />
      </div>

      <div className="campo">
        <label>Descripción:</label>
        <textarea
          placeholder="Descripción"
          value={tempSalon.descripcion}
          onChange={(e) => setTempSalon({ ...tempSalon, descripcion: e.target.value })}
        ></textarea>
      </div>

      <div className="campo">
        <label>Ubicación:</label>
        <select
          value={tempSalon.ubicacion}
          onChange={(e) => setTempSalon({ ...tempSalon, ubicacion: e.target.value })}
        >
          <option value="">Ubicación...</option>
          <option value="Edificio B">Edificio B LAB-ISIS</option>
          <option value="Edificio H">Edificio H H-LABISIS</option>
        </select>
      </div>

      <div className="recursos-container">
        <label>Recursos:</label>
        {tempSalon.recursos.map((recurso, index) => (
          <RecursoItem 
            key={index}
            recurso={recurso}
            index={index}
            actualizarRecurso={(i, nuevoValor) => {
              const nuevosRecursos = [...tempSalon.recursos];
              nuevosRecursos[i] = nuevoValor;
              setTempSalon({ ...tempSalon, recursos: nuevosRecursos });
            }}
            eliminarRecurso={(i) => {
              const nuevosRecursos = tempSalon.recursos.filter((_, idx) => idx !== i);
              setTempSalon({ ...tempSalon, recursos: nuevosRecursos });
            }}
          />
        ))}
        <button className="add-button" onClick={agregarRecurso}>
          Agregar recurso
        </button>
      </div>

      <div className="capacity-container">
        <label htmlFor="capacidad">Capacidad: {tempSalon.capacidad}</label>
        <input
          id="capacidad"
          type="range"
          min="0"
          max="32"
          value={tempSalon.capacidad}
          onChange={(e) => setTempSalon({ ...tempSalon, capacidad: e.target.value })}
        />
      </div>
    </div>
  );
}

export default CRUDSalonForm;