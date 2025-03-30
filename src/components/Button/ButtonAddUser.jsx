// ButtonAddUser.jsx
import React from "react";
import "./ButtonAddUser.css";
import { ReactComponent as UserIcon } from '../../assets/icons/User.svg';

function ButtonAddUser({ onClick }) {
  return (
    <button className="btn-add-user" onClick={onClick}>
      {/* <UserIcon className="user-icon" /> */}
      
      {/* Podrías incluir aquí un ícono de usuario */}
      Agregar usuario
    </button>
  );
}

export default ButtonAddUser;
