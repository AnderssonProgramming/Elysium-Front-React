import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { consultarUsuarios } from '../../api/usuario/administrador';
import UserFilters from '../../components/UserFilters';
import UserTable from '../../components/Table/UserTable';
import AddUserModal from './AddUserModal';

const PageContainer = styled.div`
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const AddButton = styled.button`
  background-color: #52b69a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #1976d2;
  }
`;

// Nuevo componente para la barra de búsqueda
const SearchContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  outline: none;
  
  &:focus {
    border-color: #52b69a;
    box-shadow: 0 0 0 1px rgba(82, 182, 154, 0.3);
  }
`;

const SearchButton = styled.button`
  background-color: #52b69a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const FilterLabel = styled.p`
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
`;

function GestionarUsuarios() {
  // Estados para manejar los datos
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Estado para búsqueda de texto
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  // Estado para los filtros
  const [filters, setFilters] = useState({
    activo: null, // null = sin filtro, true = activos, false = inactivos
    isAdmin: null  // null = sin filtro, true = admins, false = no admins
  });

  // Efecto para cargar usuarios con los filtros aplicados
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Obtener usuarios con filtros
        const data = await consultarUsuarios(filters);
        
        // Filtrar por término de búsqueda si existe
        let filteredUsers = data || [];
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredUsers = filteredUsers.filter(user => 
            user.nombre?.toLowerCase().includes(searchLower) || 
            user.apellido?.toLowerCase().includes(searchLower) || 
            user.correoInstitucional?.toLowerCase().includes(searchLower)
          );
        }
        
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError(err.message || "No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, [filters, searchTerm]); // Re-fetch cuando cambian los filtros o el término de búsqueda

  // Manejador para la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  // Manejador para añadir un nuevo usuario
  const handleAddUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };
  
  // Manejador para actualizar un usuario existente
  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.idInstitucional === updatedUser.idInstitucional 
        ? updatedUser 
        : user
      )
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Gestión de Usuarios</Title>
        <AddButton onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i> Añadir Usuario
        </AddButton>
      </PageHeader>

      {/* Barra de búsqueda */}
      <SearchContainer>
        <FilterLabel>Buscar usuarios por nombre, apellido o correo:</FilterLabel>
        <form onSubmit={handleSearch}>
          <SearchBar>
            <SearchInput 
              type="text" 
              placeholder="Buscar usuarios..." 
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
          </SearchBar>
        </form>
      </SearchContainer>

      {/* Componente de filtros */}
      <UserFilters filters={filters} setFilters={setFilters} />
      
      {/* Manejo de estados de carga y error */}
      {loading && <LoadingIndicator>Cargando usuarios...</LoadingIndicator>}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {/* Tabla de usuarios */}
      {!loading && !error && users.length > 0 && (
        <UserTable 
          users={users}
          onUpdateUser={handleUpdateUser}
        />
      )}
      
      {/* Mensaje cuando no hay resultados */}
      {!loading && !error && users.length === 0 && (
        <EmptyState>
          {searchTerm ? 
            `No se encontraron usuarios que coincidan con "${searchTerm}"` : 
            "No se encontraron usuarios con los filtros seleccionados"}
        </EmptyState>
      )}
      
      {/* Modal para añadir usuarios */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </PageContainer>
  );
}

export default GestionarUsuarios;