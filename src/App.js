import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { ReactComponent as House } from './assets/icons/house-user_11269953 1.svg';
import { ReactComponent as Room } from './assets/icons/workshop_14672030 1.svg';
import { ReactComponent as User } from './assets/icons/User.svg';
import Home from './pages/Home/Home.js';
import GestionarSalones from './pages/Salones/GestionarSalones';
/*
import Admin from './pages/Admin/Admin.js';
import Salones from './pages/Salones/Salones.js';
import Usarios from './pages/Usarios/Usarios.js';
*/

import './App.css';

const routesConfig = {
  admin: [
    { path: "/admin", name: "Panel de Control", icon: <House className="svg" /> },
    { path: "/salones", name: "Gestión de Salones", icon: <Room className="svg" /> },
    { path: "/usuarios", name: "Gestión de Usuarios", icon: <User className="svg" /> },
  ],
  profe: [
    { path: "/home", name: "Gestión de Reservas", icon: <House className="svg" /> },
  ],
};

const Menu = ({ role }) => (
  <ul className="menu">
    {routesConfig[role]?.map((item, index) => (
      <li className="item-menu" key={index}>
        <Link className="navBarBTN" to={item.path}>
          {item.icon}
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
)

const Header = ({ role }) => {
  const location = useLocation();
  const currentPage = routesConfig[role]?.find(route => route.path === location.pathname);
  const title = currentPage ? currentPage.name : "Elysium";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className='header'>
      <span className="title">{title}</span>
      <span className="greetings">Buen día, {role === "admin" ? "Admin" : "Profe"}</span>
      <span className="subtitle">Gestiona las reservas que has agendado últimamente</span>
    </div>
  );
};


function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
      const randomRole = Math.random() > 0.5 ? "admin" : "profe"; // Configurar logica de login para obtener el usuario que usa la pagina
      setRole(randomRole);
      const colorVariable =
      randomRole === "admin"
        ? "var(--variable-collection-user-admin)"
        : "var(--variable-collection-user-estandar)";
      document.documentElement.style.setProperty("--variable-collection-current-color", colorVariable);
  }, []);

  return (
    <Router>
      <div className='content'>
        <div className='navBar'>
          <Menu role={role}/>
        </div>
        <div className='panel'>
          <Header role={role} />
          <div className='container'>
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/salones" element={<GestionarSalones />} />
              {/*
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/salones" element={<Salones />}></Route>
              <Route path="/usuarios" element={<Usarios />}></Route>
              */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
