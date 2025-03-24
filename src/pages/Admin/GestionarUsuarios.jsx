import { useEffect, useState } from "react";
import { consultarUsuarios } from "../../api/usuario/administrador";
import UserTable from "../../components/Table/UserTable";
import "./GestionarUsuarios.css";


const GestionarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usuarios = await consultarUsuarios({    }); // Puedes personalizar los filtros aquí, sin filtros
        setUsers(usuarios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gestionar-usuarios">
      <h2>Gestionar Usuarios</h2>
      <UserTable users={users} />
    </div>
  );
};

export default GestionarUsuarios;
