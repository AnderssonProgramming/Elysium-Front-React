import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
  
  &:hover {
    background-color: #f0f7ff;
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-top: 1px solid #eee;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  
  ${props => props.active ? `
    background-color: #e8f5e9;
    color: #2e7d32;
  ` : `
    background-color: #ffebee;
    color: #c62828;
  `}
`;

const UserTable = ({ users, onEditUser }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Apellido</TableHeader>
            <TableHeader>Correo</TableHeader>
            <TableHeader>Rol</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {users.map(user => (
            <TableRow key={user.idInstitucional}>
              <TableCell>{user.idInstitucional}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.apellido}</TableCell>
              <TableCell>{user.correoInstitucional}</TableCell>
              <TableCell>{user.isAdmin ? 'Administrador' : 'Estándar'}</TableCell>
              <TableCell>
                <StatusBadge active={user.activo}>
                  {user.activo ? 'Activo' : 'Inactivo'}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <EditButton onClick={() => onEditUser(user)}>
                  Editar
                </EditButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;