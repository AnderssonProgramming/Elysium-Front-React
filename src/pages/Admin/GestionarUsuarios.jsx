import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { consultarUsuarios } from "../../api/usuario/administrador";
import UserTable from "../../components/Table/UserTable";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ButtonAddUser from "../../components/Button/ButtonAddUser";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const LoadingMessage = styled.p`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin: 40px 0;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin: 20px 0;
`;

const GestionarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Función para cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usuarios = await consultarUsuarios({});
      setUsers(usuarios);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar usuario usando la API
  const handleAddUser = async (newUser) => {
    try {
      await fetchUsers(); // Recargar la lista de usuarios después de agregar
      setShowAddModal(false);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };
  
  // Función para abrir modal de edición
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  // Función para actualizar usuario en la lista después de edición
  const handleUpdateUser = async () => {
    await fetchUsers(); // Recargar la lista completa para asegurar datos actualizados
  };
 
  if (loading) return <LoadingMessage>Cargando usuarios...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <Container>
      <Title>Gestionar Usuarios</Title>

      <Actions>
        <ButtonAddUser onClick={() => setShowAddModal(true)} />
      </Actions>
      
      <UserTable 
        users={users} 
        onEditUser={handleEditUser} 
      />

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
        />
      )}
      
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </Container>
  );
};

export default GestionarUsuarios;