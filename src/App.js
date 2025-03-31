// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ReactComponent as House } from "./assets/icons/house-user_11269953 1.svg";
import { ReactComponent as Room } from "./assets/icons/workshop_14672030 1.svg";
import { ReactComponent as UserIcon } from "./assets/icons/User.svg";
import { ReactComponent as Door } from "./assets/icons/logOut 1.svg";
import { consultarUsuarioPorCorreo } from "./api/usuario";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/Home/Home";
import AdministratorHome from "./pages/Administrator/AdministratorHome";
import GestionarSalones from './pages/Salones/GestionarSalones';
import GestionarUsuarios from './pages/Admin/GestionarUsuarios';
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import "./App.css";

const routesConfig = {
  admin: [
    { path: "/administrador", name: "Panel de Control", icon: <House className="svg" /> },
    { path: "/administrador/salones", name: "Gestión de Salones", icon: <Room className="svg" /> },
    { path: "/administrador/usuarios", name: "Gestión de Usuarios", icon: <UserIcon className="svg" /> },
  ],
  profe: [
    { path: "/home", name: "Gestión de Reservas", icon: <House className="svg" /> },
  ]
};

const Menu = ({ user }) => {
  if (!user) return null;
  const userRoutes = routesConfig[user.isAdmin ? "admin" : "profe"] || [];

  return (
    <ul className="menu">
      {userRoutes.map((item, index) => (
        <li className="item-menu" key={index}>
          <Link className="navBarBTN" to={item.path}>
            {item.icon}
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

//
// HEADER: muestra título, saludo, avatar y botón de logout
//
const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let title = "Elysium";

  useEffect(() => {
    if (user) {
      const currentPage = routesConfig[user.isAdmin ? "admin" : "profe"]?.find(
        (route) => route.path === location.pathname
      );
      document.title = currentPage ? currentPage.name : "Elysium";
    }
  }, [location.pathname, user]);

  if (!user) return null;

  return (
    <div className="header">
      <div className="info">
        <span className="title">{title}</span>
        <span className="greetings">
          Buen día, {user.isAdmin ? "Admin" : "Profe"} {user.nombre}
        </span>
        <span className="subtitle">
          Gestiona las reservas que has agendado últimamente
        </span>
      </div>
      <div className="user-info">
        <UserAvatar
          src="https://img.freepik.com/vector-gratis/establecimiento-circulos-usuarios_78370-4704.jpg?ga=GA1.1.204243624.1732496744&semt=ais_hybrid"
          alt="Avatar de usuario"
        />
        <span>{user.nombre} {user.apellido}</span>
        <button className="log-out"
          onClick={() => {
            onLogout();
            navigate("/");
          }}>
            <Door />
        </button>
      </div>
    </div>
  );
};

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
`;

const obtenerCorreoDesdeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    return null;
  }
};



//
// Componente principal de rutas
//
function AppRoutes({ user, setUser }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const correoGuardado = obtenerCorreoDesdeToken(token);
          if (correoGuardado) {
            const usuario = await consultarUsuarioPorCorreo(correoGuardado);
            setUser(usuario);

            if (usuario.isAdmin) {
              document.documentElement.style.setProperty("--variable-collection-current-color", "var(--variable-collection-user-admin)");
              navigate("/administrador");
            } else {
              document.documentElement.style.setProperty("--variable-collection-current-color", "var(--variable-collection-user-estandar)");
              navigate("/home");
            }
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error obteniendo usuario:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <Routes>
      {/* Si no hay usuario autenticado, se muestra LoginPage */}
      {!user ? (
        <>
          <Route path="/" element={<LoginPage onLogin={setUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        // Una vez autenticado, se muestra la aplicación completa (Header, Menu, contenido)
        <Route
          path="/*"
          element={
            <div className="content">
              <div className="navBar">
                <Menu user={user} />
              </div>
              <div className="panel">
                <Header user={user} onLogout={handleLogout} />
                <div className="container">
                  <Routes>
                    {user.isAdmin ? (
                      <>
                        <Route path="/administrador" element={<AdministratorHome token={localStorage.getItem("token")} />} />
                        <Route path="/administrador/salones" element={<GestionarSalones />} />
                        <Route path="/administrador/usuarios" element={<GestionarUsuarios />} />
                        <Route path="*" element={<Navigate to="/administrador" />} />
                      </>
                    ) : (
                      <>
                        <Route path="/home" element={<Home usuario={user}/>} />
                        <Route path="*" element={<Navigate to="/home" />} />
                      </>
                    )}
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      )}
    </Routes>
  );
}

//
// Componente principal de la aplicación con <Router> en el nivel más alto
//
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppRoutes user={user} setUser={setUser} />
    </Router>
  );
}


export default App;
