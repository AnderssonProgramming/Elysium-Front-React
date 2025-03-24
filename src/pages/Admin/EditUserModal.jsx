import React, { useState } from "react";
import "./AddUserModal.css";

function AddUserModal({ onClose, onAdd }) {
  // Manejo de estados del formulario
  const [formData, setFormData] = useState({
    idInstitucional: "",
    nombre: "",
    apellido: "",
    correo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Llama a la función para añadir el usuario
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h2 className="modal-title">
            Id institucional - {formData.idInstitucional || "000000000"}
          </h2>
        </div>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          <h3>Editar Usuario</h3>
          <form onSubmit={handleSubmit}>
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
