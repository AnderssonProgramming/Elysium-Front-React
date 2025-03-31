import React, {useEffect, useState} from "react";
import "./CRUDSalonModal.css";
import CRUDSalonForm from "./CRUDSalonForm"; 

function EditarSalonModal({ onClose, newSalon, setNewSalon, recursosDisponibles, handleEdit }) {
  return (
    <div className="popup-overlay">
      <div className="salon-modal">
        <div className="modal">
          <h2>Editar Salón</h2>
          <CRUDSalonForm 
            newSalon={newSalon} 
            setNewSalon={setNewSalon} 
            recursosDisponibles={recursosDisponibles} 
          />
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>Cancelar</button>
            <button className="save-button" onClick={handleEdit}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarSalonModal;
