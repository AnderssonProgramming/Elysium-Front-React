import React, { useState, useEffect } from "react";
import "./CRUDSalonModal.css";
import CRUDSalonForm from "./CRUDSalonForm"; 

function EditarSalonModal({ onClose, newSalon, setNewSalon, handleEdit }) {
  const [isInitialized, setIsInitialized] = useState(false);
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

  useEffect(() => {
    if (!isInitialized && newSalon) {
      setTempSalon(newSalon);
      setIsInitialized(true);
    }
  }, [newSalon, isInitialized]);

  const handleGuardar = () => {
    const updatedSalon = {
      ...tempSalon,
      recursos: tempSalon.recursos?.length > 0 ? tempSalon.recursos : [{ nombre: "", cantidad: 1, especificaciones: [], activo: true }],
    };
    setNewSalon(updatedSalon);
    handleEdit(updatedSalon);
  };

  return (
    <div className="popup-overlay">
      <div className="salon-modal">
        <div className="modal">
          <h2>Editar Salón</h2>
          <CRUDSalonForm 
            tempSalon={tempSalon}
            setTempSalon={setTempSalon} 
            isEditing={true}
          />
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>Cancelar</button>
            <button className="save-button" onClick={handleGuardar} disabled={!isFormComplete()}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarSalonModal;
