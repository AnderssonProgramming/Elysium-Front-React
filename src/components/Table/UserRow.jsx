// src/components/Table/UserRow.jsx
import React from "react";
import Toggle from "../Toggle/Toggle";
import Button from "../Button/Button";
import AddUserModal from "../../pages/EditUserModal";
import 

function UserRow({ user }) {
  const { id, idInstitucional, nombre, apellido, admin, activo } = user;

  return (
    <tr>
      <td>{idInstitucional}</td>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>
        <Toggle defaultChecked={admin} onChange={(val) => console.log("Admin:", val)} />
      </td>
      <td>
        <Toggle defaultChecked={activo} onChange={(val) => console.log("Activo:", val)} />
      </td>
      <td>
        <Button variant="edit" onClick={() => console.log("Editar usuario", id)}>Editar</Button>
        {/* <Button variant="delete" onClick={() => console.log("Borrar usuario", id)}>Borrar</Button>k */}

      </td>
    </tr>
  );
}

export default UserRow;
