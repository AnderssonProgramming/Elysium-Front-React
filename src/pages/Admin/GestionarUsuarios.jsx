import { useEffect, useState } from "react";
import { consultarUsuarios } from "../../api/usuario/administrador";
import UserTable from "../../components/Table/UserTable";
import "./GestionarUsuarios.css";
import AddUserModal from "./AddUserModal";
import ButtonAddUser from "../../components/Button/ButtonAddUser"; // Ajusta la ruta según tu estructura

const GestionarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usuarios = await consultarUsuarios({}); // Puedes personalizar los filtros aquí, sin filtros por ahora
        setUsers(usuarios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Función para manejar la adición de un nuevo usuario.
  // Aquí puedes integrar la llamada a la API (por ejemplo, usando agregarUsuario) y actualizar el estado.
  const handleAddUser = async (newUser) => {
    // Ejemplo: actualizar la lista localmente y cerrar el modal.
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: Date.now() }]);
    setShowModal(false);
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gestionar-usuarios">
      <h2>Gestionar Usuarios</h2>

      <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonAddUser onClick={() => setShowModal(true)} />
      </div>
      <UserTable users={users} />

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
};

export default GestionarUsuarios;
