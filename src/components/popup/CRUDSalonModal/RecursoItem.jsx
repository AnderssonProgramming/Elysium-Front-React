import React, { useState } from "react";

function RecursoItem({ recurso, index, actualizarRecurso, eliminarRecurso }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="recurso-item">
      <div className="recurso-header" onClick={() => setExpandido(!expandido)}>
        <div className="recurso-nombre">
          <strong>{recurso.nombre || "Recurso sin nombre"}</strong>
        </div>
        <button className="btn-eliminar" onClick={() => eliminarRecurso(index)}>✖</button>
      </div>

      {expandido && (
        <div className="recurso-detalles">
          <div className="campo">
            <label>Nombre:</label>
            <input 
              type="text" 
              value={recurso.nombre || "Recurso sin nombre"} 
              onChange={(e) => actualizarRecurso(index, { ...recurso, nombre: e.target.value })} 
            />
          </div>

          <div className="campo">
            <label>Cantidad:</label>
            <input 
              type="number" 
              min="1"
              value={recurso.cantidad || 1} 
              onChange={(e) => actualizarRecurso(index, { ...recurso, cantidad: Number(e.target.value) })} 
            />
          </div>

          <div className="especificaciones-container">
            <label>Especificaciones:</label>
            {(recurso.especificaciones || []).map((spec, specIndex) => (
              <div key={specIndex} className="spec-item">
                <input 
                  type="text" 
                  value={spec || "Especificación por defecto"} 
                  onChange={(e) => {
                    const nuevasEspecificaciones = [...(recurso.especificaciones || [])];
                    nuevasEspecificaciones[specIndex] = e.target.value || "Especificación por defecto";
                    actualizarRecurso(index, { ...recurso, especificaciones: nuevasEspecificaciones });
                  }} 
                />
                <button onClick={() => {
                  const nuevasEspecificaciones = (recurso.especificaciones || []).filter((_, i) => i !== specIndex);
                  actualizarRecurso(index, { ...recurso, especificaciones: nuevasEspecificaciones.length ? nuevasEspecificaciones : ["Especificación por defecto"] });
                }}>✖</button>
              </div>
            ))}
            <button className="add-spec-btn" onClick={() => actualizarRecurso(index, { ...recurso, especificaciones: [...(recurso.especificaciones || []), "Nueva especificación"] })}>
              Agregar especificación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecursoItem;