// ButtonAddUser.jsx
import React from "react";
import "./ButtonAddUser.css";

function ButtonAddUser({ onClick }) {
  return (
    <button className="btn-add-user" onClick={onClick}>
      {/* Podrías incluir aquí un ícono de usuario */}
      Agregar usuario
    </button>
  );
}

export default ButtonAddUser;
