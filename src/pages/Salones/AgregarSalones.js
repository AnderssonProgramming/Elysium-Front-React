import React, { useState } from 'react';
import './AgregarSalones.css';

const AgregarSalones = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    mnemonico: '',
    descripcion: '',
    ubicacion: '',
    capacidad: 0,
    recursos: []
  });

  const [showRecursosDropdown, setShowRecursosDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCapacidadChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      capacidad: value
    });
  };

  const handleRecursoSelect = (recurso) => {
    if (!formData.recursos.includes(recurso)) {
      setFormData({
        ...formData,
        recursos: [...formData.recursos, recurso]
      });
    }
    setShowRecursosDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Crear nuevo salon</h2>
        </div>

        <div className="modal-content">
          <h3>Agregar salon</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mnemonico">Mnemonico</label>
                <input
                  type="text"
                  id="mnemonico"
                  name="mnemonico"
                  value={formData.mnemonico}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="recursos">Recursos</label>
                <div className="dropdown-container">
                  <div
                    className="dropdown-header"
                    onClick={() => setShowRecursosDropdown(!showRecursosDropdown)}
                  >
                    <span>Seleccionar...</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>

                  {showRecursosDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={() => handleRecursoSelect("Agregar recurso")}>
                        Agregar recurso
                      </div>
                      <div className="dropdown-item" onClick={() => handleRecursoSelect("Recurso 1")}>
                        Recurso 1
                      </div>
                      <div className="dropdown-item" onClick={() => handleRecursoSelect("Recurso 2")}>
                        Recurso 2
                      </div>
                      <div className="dropdown-item" onClick={() => handleRecursoSelect("Recurso 3")}>
                        Recurso 3
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group description-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group location-capacity-group">
                <div className="ubicacion-group">
                  <label htmlFor="ubicacion">Ubicación</label>
                  <div className="dropdown-container">
                    <div className="dropdown-header">
                      <span>Seleccionar...</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                  </div>
                </div>

                <div className="capacidad-group">
                  <label htmlFor="capacidad">Capacidad</label>
                  <div className="capacidad-slider-container">
                    <input
                      type="range"
                      id="capacidad"
                      name="capacidad"
                      min="0"
                      max="32"
                      value={formData.capacidad}
                      onChange={handleCapacidadChange}
                      className="capacidad-slider"
                    />
                    <div className="capacidad-value">
                      0-{formData.capacidad}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancelar
              </button>
              <button type="submit" className="btn-create">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarSalones;