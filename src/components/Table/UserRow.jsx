import React, { useState } from "react";
import EditUserModal from "../../pages/Admin/EditUserModal";
import styled from 'styled-components';
import Button from "../Button/Button"; // Asegúrate de que este import apunte a tu componente Button

// Estilos para la fila
const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color:rgba(167, 224, 208, 0.31);
  }
  
  &:hover {
    background-color: rgba(167, 224, 208, 0.31);
  }
`;

// Estilos para las celdas
const TableCell = styled.td`
  padding: 0.8rem 1rem;
`;

// Estilos para el badge de estado
const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.active ? '#2e7d32' : '#c62828'};
`;

// Estilos para el badge de rol
const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.isAdmin ? '#e3f2fd' : '#f5f5f5'};
  color: ${props => props.isAdmin ? '#1976d2' : '#616161'};
`;
function UserRow({ user, onUpdateUser }) {
  // Extraemos las propiedades del usuario
  const {idInstitucional, nombre, apellido, correoInstitucional, isAdmin, activo } = user;

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Función para manejar la actualización del usuario desde el modal
  const handleUserUpdate = (updatedUser) => {
    // Llamamos a la función onUpdateUser pasada como prop
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
    // Cerramos el modal después de actualizar
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledTableRow>
        <TableCell>{idInstitucional}</TableCell>
        <TableCell>{nombre}</TableCell>
        <TableCell>{apellido}</TableCell>
        <TableCell>{correoInstitucional}</TableCell>
        <TableCell>
          <StatusBadge active={activo}>
            {activo ? 'Activo' : 'Inactivo'}
          </StatusBadge>
        </TableCell>
        <TableCell>
          <RoleBadge isAdmin={isAdmin}>
            {isAdmin ? 'Administrador' : 'Estándar'}
          </RoleBadge>
        </TableCell>
        <TableCell>
          <Button variant="edit" onClick={handleEditClick}>Editar</Button>
        </TableCell>
      </StyledTableRow>

      {/* Modal de edición, solo se muestra si isModalOpen es true */}
      {isModalOpen && (
        <EditUserModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUserUpdate} // Añadimos la función de actualización
        />
      )}
    </>
  );
}

export default UserRow;