// AddUserModal.jsx
import React, { useState } from "react";
import "./AddUserModal.css"; // Estilos de tu modal

function AddUserModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    idInstitucional: "",
    nombre: "",
    apellido: "",
    admin: false,
    activo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);  // Llama a la función que creará el usuario
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ID Institucional:
            <input
              name="idInstitucional"
              value={formData.idInstitucional}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nombre:
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Apellido:
            <input
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Admin:
            <input
              type="checkbox"
              name="admin"
              checked={formData.admin}
              onChange={handleChange}
            />
          </label>

          <label>
            Activo:
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
