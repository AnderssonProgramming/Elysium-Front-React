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
                    <div>
                        <span className="label">Salón:</span>
                        <span>{salones[reserva.idSalon]?.nombre || reserva.idSalon}</span>
                    </div>
                    <div>
                        <span className="label">Fecha:</span>
                        <span>{reserva.fechaReserva}</span>
                    </div>
                    <div>
                        <span className="label">Hora:</span>
                        <span>{hora}</span>
                    </div>
                    <div>
                        <span className="label">Materia:</span>
                        <span>{reserva.materia || "No especificada"}</span>
                    </div>
                    <div>
                        <span className="label">Proposito:</span>
                        <span>{reserva.proposito || "No especificado"}</span>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={onClose} className="closeBTN">Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default DetalleReservaModal;