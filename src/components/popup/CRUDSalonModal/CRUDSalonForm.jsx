import React from "react";

function CRUDSalonForm({ newSalon, setNewSalon, recursosDisponibles }) {
  return (
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
      />
      <textarea
        placeholder="Descripción"
        value={newSalon.descripcion}
        onChange={(e) => setNewSalon({ ...newSalon, descripcion: e.target.value })}
      ></textarea>
      <select
        value={newSalon.ubicacion}
        onChange={(e) => setNewSalon({ ...newSalon, ubicacion: e.target.value })}
      >
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
        onChange={(e) => setNewSalon({
          ...newSalon,
          recursos: Array.from(e.target.selectedOptions, (option) => option.value),
        })}
      >
        {recursosDisponibles.map((recurso) => (
          <option key={recurso.id} value={recurso.id}>
            {recurso.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CRUDSalonForm;
