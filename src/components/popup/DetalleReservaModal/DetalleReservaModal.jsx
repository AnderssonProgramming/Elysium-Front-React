import React from "react";
import "./DetalleReservaModal.css";

function DetalleReservaModal({ reserva, salones, hora, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-detalle-reserva">
                <div className="title">
                    <span>Detalles de la Reserva</span>
                </div>
                <div className="details">
                    <span><strong>Salón:</strong> {salones[reserva.idSalon]?.nombre || reserva.idSalon}</span>
                    <span><strong>Fecha:</strong> {reserva.fechaReserva}</span>
                    <span><strong>Hora:</strong> {hora}</span>
                    <span><strong>Materia:</strong> {reserva.materia || "No especificada"}</span>
                    <span><strong>Proposito:</strong> {reserva.proposito || "No especificado"}</span>
                </div>
                <div className="btn">
                    <button onClick={onClose} className="closeBTN">Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default DetalleReservaModal;