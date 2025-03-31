import React, { useState, useEffect } from 'react';
import { consultarUsuarios } from '../../api/usuario';
import UserFilters from '../../components/UserFilters/UserFilters';
import UserTable from '../../components/Table/UserTable';
import AddUserModal from './AddUserModal';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ButtonAdd = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #1976d2;
  }
`;

function UserManagement() {
  // Estados para manejar los usuarios, filtros, carga y errores
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    activo: null,  // true, false, o null (sin filtro)
    isAdmin: null  // true, false, o null (sin filtro)
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Efecto para cargar usuarios con filtros aplicados
  useEffect(() => {
    const loadUsers = async () => {
      console.log("Cargando usuarios con filtros:", filters);
      setIsLoading(true);
      setError(null);
      try {
        const data = await consultarUsuarios(filters);
        console.log("Usuarios recibidos:", data);
        setUsers(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
        setError(err.message || "Error al cargar usuarios");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [filters]); // Recargar cuando cambian los filtros

  const handleAddUser = (newUser) => {
    console.log("Usuario agregado:", newUser);
    // Actualizar lista de usuarios después de agregar uno nuevo
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    console.log("Usuario actualizado:", updatedUser);
    // Actualizar un usuario existente en la lista
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.idInstitucional === updatedUser.idInstitucional ? updatedUser : user
      )
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Gestión de Usuarios</Title>
        <ButtonAdd onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i> Agregar Usuario
        </ButtonAdd>
      </Header>

      {/* Componente de filtros */}
      <UserFilters 
        filters={filters} 
        setFilters={setFilters} 
      />

      {/* Indicador de carga */}
      {isLoading && <LoadingIndicator>Cargando usuarios...</LoadingIndicator>}
      
      {/* Mensaje de error */}
      {error && <NoResultsMessage>{error}</NoResultsMessage>}
      
      {/* Tabla de usuarios */}
      {!isLoading && !error && users.length > 0 ? (
        <UserTable 
          users={users} 
          onUpdateUser={handleUpdateUser} 
        />
      ) : !isLoading && !error ? (
        <NoResultsMessage>No se encontraron usuarios con los filtros seleccionados.</NoResultsMessage>
      ) : null}
      
      {/* Modal para agregar usuario */}
      {showAddModal && (
        <AddUserModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </Container>
  );
}

export default UserManagement;