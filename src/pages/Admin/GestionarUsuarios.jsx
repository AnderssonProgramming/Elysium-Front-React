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

  // Función para agregar usuario
  const handleAddUser = async () => {
    // Refrescar la lista completa después de agregar
    await fetchUsers();
    setShowAddModal(false);
  };
  
  // Función para editar usuario
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  // Función para actualizar la lista después de editar
  const handleUpdateUser = async () => {
    await fetchUsers();
  };
 
  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gestionar-usuarios">
      <h2>Gestionar Usuarios</h2>

      <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonAddUser onClick={() => setShowAddModal(true)} />
      </div>
      
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
    </div>
  );
};

export default GestionarUsuarios;