// src/pages/Admin/GestionarUsuarios.jsx
import React, { useState, useEffect } from "react";
import UserTable from "../../components/Table/UserTable";
import "./GestionarUsuarios.css";

function GestionarUsuarios() {
  const [users, setUsers] = useState([]);

  // Ejemplo con datos mock (podrías reemplazar con fetch a tu API)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        idInstitucional: "100000000",
        nombre: "Lorem",
        apellido: "Ipsum",
        admin: true,
        activo: true,
      },
      {
        id: 2,
        idInstitucional: "100000001",
        nombre: "Dolor",
        apellido: "Sit",
        admin: false,
        activo: true,
      },
      // ... más datos
    ];
    setUsers(mockData);
  }, []);

  return (
    <div className="gestionar-usuarios">
      <h2>Gestionar Usuarios</h2>
      <UserTable users={users} />
    </div>
  );
}

export default GestionarUsuarios;
