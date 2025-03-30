import React from 'react';
import styled from 'styled-components';
import UserRow from './UserRow';

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
  return (
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
          />
        ))}
      </tbody>
    </StyledTable>
  );
}

export default UserTable;