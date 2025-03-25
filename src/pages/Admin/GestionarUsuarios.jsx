import { useEffect, useState } from "react";
import { consultarUsuarios, agregarUsuario } from "../../api/usuario/administrador";
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

  // Función para agregar usuario usando la API

  const handleAddUser = async (newUser) => {
    try {
      // Llamamos a la API para agregar el usuario
      const addedUser = await agregarUsuario(newUser);
      // Actualizamos la lista de usuarios con el nuevo usuario agregado
      console.log("Usuario agregado:", addedUser);
      setUsers((prev) => [...prev, addedUser]);
      // Cerramos el modal
      setShowModal(false);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
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
