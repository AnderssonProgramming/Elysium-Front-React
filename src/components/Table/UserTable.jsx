import React, { useState } from 'react';
import styled from 'styled-components';
import UserRow from './UserRow';
import EditUserModal from "../../pages/Admin/EditUserModal";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #52b69a;
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: white;
`;

function UserTable({ users, onUpdateUser }) {
  // Estado para manejar qué usuario está siendo editado
  const [modalUser, setModalUser] = useState(null);

  // Función para abrir el modal con el usuario seleccionado
  const handleEditUser = (user) => {
    setModalUser(user);
  };

  // Cerrar el modal
  const closeModal = () => {
    setModalUser(null);
  };

  return (
    <>
      <StyledTable>
        <TableHeader>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Apellido</TableHeaderCell>
            <TableHeaderCell>Correo</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Rol</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {users.map(user => (
            <UserRow 
              key={user.idInstitucional} 
              user={user} 
              onUpdateUser={onUpdateUser}
              onEditUser={handleEditUser}
            />
          ))}
        </tbody>
      </StyledTable>
      {modalUser && (
        <EditUserModal 
          user={modalUser} 
          onClose={closeModal} 
          onUpdate={onUpdateUser} 
        />
      )}
    </>
  );
}

export default UserTable;