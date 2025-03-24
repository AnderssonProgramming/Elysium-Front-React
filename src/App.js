import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home/Home.js';
import LoginPage from './pages/Login/LoginPage.js';
import AdministratorHome from './pages/Administrator/AdministratorHome.js'; // Importa el componente

import './App.css';

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Aquí puedes manejar el rol del usuario tras login; por ejemplo, obtenerlo desde el token.
    // Para este ejemplo simulamos un rol admin.
    setRole("admin");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adminhome" element={<AdministratorHome />} />
        <Route path="/home" element={<Home />} />
        {/* Resto de rutas */}
        {/* Si no hay coincidencia, redirigir a login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
