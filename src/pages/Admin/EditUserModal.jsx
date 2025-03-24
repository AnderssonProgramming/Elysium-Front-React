import React, { useState, useEffect } from "react";
import "./EditUserModal.css";

function EditUserModal({ user, onClose }) {
  // Estado para manejar el formulario con los datos del usuario
  const [formData, setFormData] = useState({
    idInstitucional: "",
    nombre: "",
    apellido: "",
    correo: "",
  });

  // Cuando el modal recibe el usuario, actualiza el estado con sus datos
  useEffect(() => {
    if (user) {
      setFormData({
        idInstitucional: user.idInstitucional,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
      });
    }
  }, [user]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Al enviar el formulario (aquí puedes llamar a una API para actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario actualizado:", formData);
    onClose(); // Cerrar modal tras guardar cambios
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
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-save">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
