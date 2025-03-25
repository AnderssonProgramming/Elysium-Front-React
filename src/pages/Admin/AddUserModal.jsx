import React, { useState } from "react";
import "./AddUserModal.css";

function AddUserModal({ onClose, onAdd }) {
  // Manejo de estados del formulario
  const [formData, setFormData] = useState({
    idInstitucional: "",
    nombre: "",
    apellido: "",
    correo: "",
    isAdmin: false,
    activo: false,
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Llama a la función para añadir el usuario
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h2 className="modal-title">Crear nuevo usuario</h2>
        </div>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              Id institucional
              <input
                type="text"
                name="idInstitucional"
                value={formData.idInstitucional}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Nombre
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Apellido
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Correo
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </label>

            {/* Toggles de Admin y Activo */}
            <div className="toggle-group">
              <div className="toggle-item">
                <label>Admin</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-save"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
