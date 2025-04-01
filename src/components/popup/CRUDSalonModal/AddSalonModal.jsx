import React, { useState } from "react";
import "./CRUDSalonModal.css";
import CRUDSalonForm from "./CRUDSalonForm"; 

function AddSalonModal({ onClose, newSalon, setNewSalon, handleAddSalon }) {
  const [tempSalon, setTempSalon] = useState({
    mnemonico: newSalon?.mnemonico || "",
    nombre: newSalon?.nombre || "",
    descripcion: newSalon?.descripcion || "",
    ubicacion: newSalon?.ubicacion || "",
    capacidad: newSalon?.capacidad || 0,
    recursos: newSalon?.recursos || [{ nombre: "", cantidad: 1, especificaciones: [], activo: true }],
  });

  const isFormComplete = () => {
    return (
      tempSalon.mnemonico.trim() !== "" &&
      tempSalon.nombre.trim() !== "" &&
      tempSalon.descripcion.trim() !== "" &&
      tempSalon.ubicacion.trim() !== "" &&
      tempSalon.capacidad > 0
    );
  };

  const handleGuardar = () => {
    setNewSalon({
      ...tempSalon,
      recursos: tempSalon.recursos?.length > 0 ? tempSalon.recursos : [{ nombre: "", cantidad: 1, especificaciones: [], activo: true }],
    });
    handleAddSalon();
  };

  return (
    <div className="popup-overlay">
      <div className="salon-modal">
        <div className="modal">
          <h2>Agregar Salón</h2>
          <CRUDSalonForm 
            tempSalon={tempSalon}
            setTempSalon={setTempSalon}
            isEditing={false}
          />
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>Cancelar</button>
            <button className="save-button" onClick={handleGuardar} disabled={!isFormComplete()}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSalonModal;
