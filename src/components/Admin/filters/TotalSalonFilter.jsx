// src/components/Admin/filters/TotalSalonFilter.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSalones } from "../../../api/salon"; // Ajusta la ruta según tu estructura

/**
 * Filtro para seleccionar un salón (opcional).
 * Si se deja en "Todos", se interpretará que se desean reservas de todos los salones.
 */
const TotalSalonFilter = ({ onBuscar }) => {
  const [salon, setSalon] = useState("");
  const [listaSalones, setListaSalones] = useState([]);

  useEffect(() => {
    // Cargar la lista de salones activos
    getSalones({ activo: true })
      .then((salones) => setListaSalones(salones))
      .catch((err) => console.error("Error al obtener salones:", err));
  }, []);

  useEffect(() => {
    // Realizar la búsqueda automáticamente cuando se selecciona un salón
    onBuscar({ ...(salon && { idSalon: salon }) });
  }, [salon]);

  return (
    <Container>
      <Row>
        <Label>Salón (opcional):</Label>
        <Select value={salon} onChange={(e) => setSalon(e.target.value)}>
          <option value="">Todos</option>
          {listaSalones.map((s) => (
            <option key={s.mnemonico} value={s.mnemonico}>
              {s.nombre} ({s.mnemonico})
            </option>
          ))}
        </Select>
      </Row>
    </Container>
  );
};

export default TotalSalonFilter;

const Container = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;

const Select = styled.select`
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
`;