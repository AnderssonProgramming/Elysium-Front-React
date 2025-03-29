import React, { useState } from 'react';
import styled from 'styled-components';
import EditUserModal from '../../pages/Admin/EditUserModal';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f0f7ff;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
`;

const TableCell = styled.td`
  padding: 0.8rem 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #2196f3;
  cursor: pointer;
  padding: 0.3rem;
  margin: 0 0.2rem;
  
  &:hover {
    color: #0d47a1;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.active ? '#2e7d32' : '#c62828'};
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.isAdmin ? '#e3f2fd' : '#f5f5f5'};
  color: ${props => props.isAdmin ? '#1976d2' : '#616161'};
`;

function UserTable({ users, onUpdateUser }) {
  const [editingUser, setEditingUser] = useState(null);
  
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
            <TableRow key={user.idInstitucional}>
              <TableCell>{user.idInstitucional}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.apellido}</TableCell>
              <TableCell>{user.correoInstitucional}</TableCell>
              <TableCell>
                <StatusBadge active={user.activo}>
                  {user.activo ? 'Activo' : 'Inactivo'}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <RoleBadge isAdmin={user.isAdmin}>
                  {user.isAdmin ? 'Administrador' : 'Estándar'}
                </RoleBadge>
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => setEditingUser(user)}>
                  <i className="fas fa-edit"></i>
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      
      {/* Modal de edición */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={(updatedUser) => {
            onUpdateUser(updatedUser);
            setEditingUser(null);
          }}
        />
      )}
    </>
  );
}

export default UserTable;