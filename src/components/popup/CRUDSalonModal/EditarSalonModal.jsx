import React, { useState, useEffect } from "react";
import "./CRUDSalonModal.css";
import CRUDSalonForm from "./CRUDSalonForm"; 

function EditarSalonModal({ onClose, newSalon, setNewSalon, handleEdit }) {
  const defaultSalon = {
    nombre: "",
    descripcion: "",
    mnemonico: "",
    ubicacion: "",
    capacidad: 0,
    recursos: [],
  };
  const [tempSalon, setTempSalon] = useState(newSalon || defaultSalon);

  useEffect(() => {
    if (newSalon) {
      setTempSalon(newSalon);
    }
  }, [newSalon]);

  const handleGuardar = () => {
    setNewSalon(tempSalon);
    handleEdit();
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
            <button className="save-button" onClick={handleGuardar}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarSalonModal;
