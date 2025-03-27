import React from "react";
import FormGenerarReserva from "./GenerarReservaForm";
import "./AddReservaModal.css";

function AddReservaModal({ usuario, onClose, onReservaExitosa }) {

    return (
        <div className="popup-overlay">
            <div className="popup-add-reserva">
                <div className="title">
                    <span>Crear nueva reserva</span>
                    <div className="right-side-panel">
                        <div className="usuario-data">
                            <span>Nombre: {usuario.nombre}</span>
                            <span>Id usuario: {usuario.idInstitucional}</span>
                        </div>
                        <button onClick={onClose} className="close-btn">✖</button>
                    </div>
                </div>
                <FormGenerarReserva usuario={usuario} onClose={onClose} onReservaExitosa={onReservaExitosa} />
            </div>
        </div>
    );
}

export default AddReservaModal;