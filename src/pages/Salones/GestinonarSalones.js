import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch } from 'react-icons/fa';
import './GestionarSalones.css';
import AgregarSalones from './AgregarSalones';

const GestionarSalones = () => {
  // Estado para almacenar los salones
  const [salones, setSalones] = useState([
    {
      id: 1,
      nombre: 'Fundamentos computacionales',
      descripcion: 'Lorem ipsum dolor sit amet, con...',
      activo: true
    },
    {
      id: 2,
      nombre: 'Fundamentos computacionales',
      descripcion: 'Lorem ipsum dolor sit amet, con...',
      activo: true
    },
    {
      id: 3,
      nombre: 'Fundamentos computacionales',
      descripcion: 'Lorem ipsum dolor sit amet, con...',
      activo: true
    },
    {
      id: 4,
      nombre: 'Fundamentos computacionales',
      descripcion: 'Lorem ipsum dolor sit amet, con...',
      activo: true
    },
    {
      id: 5,
      nombre: 'Fundamentos computacionales',
      descripcion: 'Lorem ipsum dolor sit amet, con...',
      activo: true
    }
  ]);

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estado para controlar la visibilidad del modal
  const [modalOpen, setModalOpen] = useState(false);

  // Función para manejar el cambio en el toggle de activo
  const handleToggleActivo = (id) => {
    setSalones(
      salones.map((salon) =>
        salon.id === id ? { ...salon, activo: !salon.activo } : salon
      )
    );
  };

  // Función para eliminar un salón
  const handleBorrarSalon = (id) => {
    setSalones(salones.filter((salon) => salon.id !== id));
  };

  // Función para filtrar salones según la búsqueda
  const salonesFiltrados = salones.filter(
    (salon) =>
      salon.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      salon.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para guardar un nuevo salón
  const handleSaveSalon = (nuevoSalon) => {
    setSalones([
      ...salones,
      {
        id: salones.length + 1,
        ...nuevoSalon,
        activo: true
      }
    ]);
  };

  return (
    <div className="gestionar-salones-container">
      <div className="sidebar">
        <div className="sidebar-option active">
          <div className="sidebar-icon">
            <i className="panel-icon"></i>
          </div>
          <span>Panel de control</span>
        </div>
        <div className="sidebar-option selected">
          <div className="sidebar-icon">
            <i className="salones-icon"></i>
          </div>
          <span>Gestionar salones</span>
        </div>
        <div className="sidebar-option">
          <div className="sidebar-icon">
            <i className="usuarios-icon"></i>
          </div>
          <span>Gestionar usuarios</span>
        </div>
        <div className="sidebar-option">
          <div className="sidebar-icon">
            <i className="insights-icon"></i>
          </div>
          <span>Insights</span>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="header-title">
            <h1>Panel de control</h1>
            <h2>Buen día, admin Emily</h2>
            <p>Gestiona las reservas que has agendado últimamente</p>
          </div>
          <div className="header-user">
            <div className="user-avatar">
              <img src="/avatar-placeholder.jpg" alt="Emily Rincon" />
            </div>
            <span>Emily Rincon</span>
            <button className="logout-button">
              <i className="logout-icon"></i>
            </button>
          </div>
        </div>

        <div className="actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button className="add-salon-button" onClick={() => setModalOpen(true)}>
            <i className="add-icon"></i>
            Agregar salon
          </button>
        </div>

        <div className="table-container">
          <table className="salones-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Activo</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {salonesFiltrados.map((salon) => (
                <tr key={salon.id}>
                  <td>{salon.nombre}</td>
                  <td>{salon.descripcion}</td>
                  <td>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={salon.activo}
                        onChange={() => handleToggleActivo(salon.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="actions-cell">
                    <button className="edit-button">
                      <FaPencilAlt /> Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleBorrarSalon(salon.id)}
                    >
                      <FaTrash /> Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar salón */}
      <AgregarSalonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSalon}
      />
    </div>
  );
};

export default GestionarSalones;