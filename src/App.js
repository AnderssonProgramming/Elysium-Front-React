import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate
} from "react-router-dom";
import { ReactComponent as House } from './assets/icons/house-user_11269953 1.svg';
import { ReactComponent as Room } from './assets/icons/workshop_14672030 1.svg';
import { ReactComponent as User } from './assets/icons/User.svg';
import Home from './pages/Home/Home.js';
import LoginPage from './pages/Login/LoginPage.jsx';
import AdministratorHome from './pages/Administrator/AdministratorHome.jsx';
import './App.css';

/**
 * Configuración de rutas según el rol del usuario.
 */
const routesConfig = {
  admin: [
    { path: "/administrador", name: "Panel de Control", icon: <House className="svg" /> },
    { path: "/administrador/salones", name: "Gestión de Salones", icon: <Room className="svg" /> },
    { path: "/administrador/usuarios", name: "Gestión de Usuarios", icon: <User className="svg" /> },
  ],
  profe: [
    { path: "/home", name: "Gestión de Reservas", icon: <House className="svg" /> },
  ],
};

const Menu = ({ user }) => {
  if (!user) return null;
  return (
    <ul className="menu">
      {routesConfig[(user.isAdmin ? "admin" : "profe")]?.map((item, index) => (
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

/**
 * Componente de encabezado que muestra el título de la página y el saludo al usuario.
 */
const Header = ({ user }) => {
  const location = useLocation();
  let title = "Elysium";

  if (user) {
    const currentPage = routesConfig[(user.isAdmin ? "admin" : "profe")]?.find(
      (route) => route.path === location.pathname
    );
    title = currentPage ? currentPage.name : "Elysium";
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

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

      </div>
    </div>
  );
};

/**
 * Componente principal de la aplicación.
 */
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulacionData = {
      "idInstitucional": 12,
      "nombre": "Santi",
      "apellido": "Castroso",
      "correoInstitucional": "valeria.castroso@example.com",
      "activo": true,
      "isAdmin": true,
      "password": null
    }
    setUser(simulacionData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user != null) {
      const colorVariable = user.isAdmin 
        ? "var(--variable-collection-user-admin)"
        : "var(--variable-collection-user-estandar)";
      document.documentElement.style.setProperty(
        "--variable-collection-current-color",
        colorVariable
      );
    }
  }, [user]);

  if (loading) return <div>Cargando...</div>;

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<LoginPage onLogin={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )  : (
          <Route path="/*" element={
            <div className="content">
              <div className="navBar">
                <Menu user={user} />
              </div>
              <div className="panel">
                <Header user={user} />
                <div className="container">
                  <Routes>
                    {user.isAdmin ? (
                      <>
                        <Route path="/administrador" element={<AdministratorHome />} />
                        <Route path="/administrador/salones" element={<div>Gestión de Salones</div>} />
                        <Route path="/administrador/usuarios" element={<div>Gestión de Usuarios</div>} />
                        <Route path="*" element={<Navigate to="/administrador" />} />
                      </>
                    ) : (
                      <>
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<Navigate to="/home" />} />
                      </>
                    )}
                  </Routes>
                </div>
              </div>
            </div>
          }/>
        )}
      </Routes>
    </Router>
  );
}

export default App;