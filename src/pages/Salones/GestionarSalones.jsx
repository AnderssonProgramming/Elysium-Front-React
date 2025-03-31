import React, { useState, useEffect } from "react";
import "./GestionarSalones.css";
import { getSalones, actualizarSalon, getSalonByMnemonico } from "../../api/salon";
import { agregarSalon } from "../../api/usuario/administrador";
import { getRecursos, consultarRecurso, agregarRecurso, actualizarRecurso} from "../../api/recursos";
import { ReactComponent as Editar} from '../../assets/icons/edit-3-svgrepo-com.svg';
import { ReactComponent as Buscar} from '../../assets/icons/Search Glyph.svg';
import { ReactComponent as Puerta} from '../../assets/icons/open-exit-door-svgrepo-com 1.svg';
import AddSalonModal from "../../components/popup/CRUDSalonModal/AddSalonModal";
import EditarSalonModal from "../../components/popup/CRUDSalonModal/EditarSalonModal";


function GestionarSalones() {
  const [salones, setSalones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popup, setPopup] = useState({tipo: ""});
  const [recursosDisponibles, setRecursosDisponibles] = useState([]);
  const [newSalon, setNewSalon] = useState({
    mnemonic: "",
    name: "",
    description: "",
    location: "",
    capacity: 0,
    resources: []
  });
  const user={   //simulacion de usuario administrador
    "idInstitucional": 1000098257,
    "nombre": "Santiago",
    "apellido": "Botero",
    "correoInstitucional": "santiago.botero@escuelaing.edu.co",
    "activo": true,
    "isAdmin": true
  };

  const abrirPopup = (tipo, salon = null) => {
    if (tipo === "editar-salon" && salon) {
      setNewSalon(salon);
    } else if (tipo === "agregar-salon") {
      setNewSalon({ mnemonic: "", name: "", description: "", location: "", capacity: 0, resources: [] });
    }
    setPopup({ tipo });
  };

  const cerrarPopup = () => {
    setPopup({ tipo: "" });
  };

  // Cargar los salones al montar el componente
  useEffect(() => {
    async function cargarDatos() {
      try {
        const dataSalones = await getSalones();
        console.log("Datos de salones cargados:", dataSalones);
        setSalones(dataSalones || []);
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    }
    cargarDatos();
  }, []);

  // Alternar estado activo/inactivo
  const toggleActivo = async (salonId) => {
    try {
      setSalones((prevSalones) =>
        prevSalones.map(salon =>
          salon.id === salonId ? { ...salon, activo: !salon.activo } : salon
        )
      );

      const salonActualizado = salones.find(s => s.id === salonId);
      await actualizarSalon(salonId, { activo: !salonActualizado?.activo });
    } catch (error) {
      console.error("Error al cambiar estado de salón:", error);
    }
  };

  // Agregar un nuevo salón
  const handleAddSalon = async () => {
    if (newSalon.nombre.trim() && newSalon.descripcion.trim()) {
      try {
        const formattedSalon = {
          mnemonic: newSalon.mnemonico,
          name: newSalon.nombre,
          description: newSalon.descripcion,
          location: newSalon.ubicacion,
          capacity: newSalon.capacidad,
          resources: newSalon.recursos || [],
        };
        const addedSalon = await agregarSalon(user.idInstitucional, formattedSalon);
        setSalones([...salones, addedSalon]);
        cerrarPopup();
      } catch (error) {
        console.error("Error al agregar el salón", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  // edita un nuevo salón
  const handleEdit = async () => {
    if (newSalon.nombre.trim() && newSalon.descripcion.trim()) {
      try {
        await actualizarSalon(newSalon.mnemonico, newSalon);
        setSalones(salones.map(s => s.mnemonico === newSalon.mnemonico ? newSalon : s));
        cerrarPopup();
      } catch (error) {
        console.error("Error al editar el salón", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  // Filtrar los salones según el término de búsqueda
  const salonesFiltrados = salones.filter((salon) =>
    salon.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gestionar-salones">
      <div className="top-bar">
        <div className="search-container">
          <Buscar className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado de búsqueda
          />
        </div>
        <button className="add-button" onClick={() => abrirPopup("agregar-salon")}>
          <Puerta />
          <span>Agregar salón</span>
        </button>
      </div>

      <div className="table-container">
        <table>
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
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={salon.activo}
                      onChange={() => toggleActivo(salon.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
                <td className="btn">
                  <button className="edit-button" onClick={() => abrirPopup("editar-salon", salon)}>
                    <Editar />
                    <span> Editar </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup.tipo === "agregar-salon" && (
        <AddSalonModal 
          onClose={cerrarPopup} 
          newSalon={newSalon} 
          setNewSalon={setNewSalon} 
          recursosDisponibles={recursosDisponibles}
          handleAddSalon={handleAddSalon}
        />
      )}

      {popup.tipo === "editar-salon" && (
        <EditarSalonModal 
          onClose={cerrarPopup} 
          newSalon={newSalon} 
          setNewSalon={setNewSalon} 
          recursosDisponibles={recursosDisponibles}
          handleEdit={handleEdit}
        />
      )}

    </div>
  );
};

export default GestionarSalones;