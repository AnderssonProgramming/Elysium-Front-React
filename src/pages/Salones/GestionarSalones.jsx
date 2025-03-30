import React, { useState, useEffect } from "react";
import "./GestionarSalones.css";
import { getSalones, agregarSalon, actualizarSalon, getSalonByMnemonico } from "../../api/salon";
import { getRecursos, consultarRecurso, agregarRecurso, actualizarRecurso} from "../../api/recursos";
import { ReactComponent as Editar} from '../../assets/icons/edit-3-svgrepo-com.svg';
import { ReactComponent as Buscar} from '../../assets/icons/Search Glyph.svg';
import { ReactComponent as Puerta} from '../../assets/icons/open-exit-door-svgrepo-com 1.svg';
import AddSalonModal from "../../components/popup/CRUDSalonModal/AddSalonModal";
import EditarSalonModal from "../../components/popup/CRUDSalonModal/EditarSalonModal";


function GestionarSalones() {
  const [salones, setSalones] = useState([]);
  const [popup, setPopup] = useState({tipo: ""});
  const [recursosDisponibles, setRecursosDisponibles] = useState([]);
  const [newSalon, setNewSalon] = useState({
    nombre: "",
    mnemonico: "",
    descripcion: "",
    ubicacion: "",
    capacidad: 0,
    recursos: []
  });

  const abrirPopup = (tipo, salon = null) => {
    if (tipo === "editar-salon" && salon) {
      setNewSalon(salon);
    } else if (tipo === "agregar-salon") {
      setNewSalon({ nombre: "", mnemonico: "", descripcion: "", ubicacion: "", capacidad: 0, recursos: [] });
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
        setSalones(dataSalones);
        const dataRecursos = await getRecursos();
        setRecursosDisponibles(dataRecursos);
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
        const addedSalon = await agregarSalon({ ...newSalon, activo: true });
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

  return (
    <div className="gestionar-salones">
      <div className="top-bar">
        <div className="search-container">
          <Buscar className="search-icon" />
          <input type="text" className="search-bar" placeholder="Buscar..." />
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
            {salones.map((salon) => (
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