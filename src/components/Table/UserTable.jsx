// src/components/Table/UserTable.jsx
import React from "react";
import UserRow from "./UserRow";
import "./Table.css";

function UserTable({ users }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Id Institucional</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Admin</th>
          <th>Activo</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.idInstitucional} user={user} />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
