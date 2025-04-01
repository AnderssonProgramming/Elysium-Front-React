import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MesSalonFilter = ({ onBuscar }) => {
  const [mes, setMes] = useState("");
  const [mesesDelAnio, setMesesDelAnio] = useState([]);

  useEffect(() => {
    const generarMeses = () => {
      const añoActual = new Date().getFullYear();
      const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const mesesFormateados = meses.map((mesNombre, index) => ({
        value: `${añoActual}-${String(index + 1).padStart(2, "0")}`,
        label: `${mesNombre} ${añoActual}`
      }));
      setMesesDelAnio(mesesFormateados);
    };

    const obtenerMesActual = () => {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const añoActual = fechaActual.getFullYear();
      const mesFormateado = `${añoActual}-${String(mesActual).padStart(2, "0")}`;
      setMes(mesFormateado);
    };

    generarMeses();
    obtenerMesActual();
  }, []);

  useEffect(() => {
    if (mes) {
      onBuscar({ mes });
    }
  }, [mes]);

  const handleBuscar = () => {
    if (!mes) {
      alert("Por favor selecciona un mes");
      return;
    }
    onBuscar({ mes });
  };

  return (
    <Container>
      <Row>
        <Label>Mes:</Label>
        <Select value={mes} onChange={(e) => setMes(e.target.value)}>
          <option value="">Selecciona un mes</option>
          {mesesDelAnio.map((mesItem) => (
            <option key={mesItem.value} value={mesItem.value}>
              {mesItem.label}
            </option>
          ))}
        </Select>
      </Row>
    </Container>
  );
};

export default MesSalonFilter;

/* Estilos */
const Container = styled.div`
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
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