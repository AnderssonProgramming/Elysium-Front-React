import React, { useState } from "react";
import Toggle from "../Toggle/Toggle";
import Button from "../Button/Button";
import EditUserModal from "../../pages/Admin/EditUserModal";

function UserRow({ user }) {
  const {idInstitucional, nombre, apellido, correoInstitucional, admin, activo } = user;

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal y pasar los datos del usuario actual
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <tr>
        {console.log("Usuario recibido:", user)}
        <td>{idInstitucional}</td>
        <td>{nombre}</td>
        <td>{apellido}</td>
        <td>{correoInstitucional}</td>
        <td>
          <Toggle defaultChecked={admin} onChange={(val) => console.log("Admin:", val)} />
        </td>
        <td>
          <Toggle defaultChecked={activo} onChange={(val) => console.log("Activo:", val)} />
        </td>
        <td>
          <Button variant="edit" onClick={handleEditClick}>Editar</Button>
        </td>
      </tr>

      {/* Modal de edición, solo se muestra si isModalOpen es true */}
      {isModalOpen && (
        <EditUserModal
          user={user} // Pasamos el usuario actual al modal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default UserRow;
