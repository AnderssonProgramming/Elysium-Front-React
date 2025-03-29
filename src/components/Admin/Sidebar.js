import React from "react";
import styled from "styled-components";

export function Sidebar() {
  return (
    <Nav role="navigation" aria-label="Main navigation">
      <NavItem active>
        <NavIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e24647b18074c6a677126b02d333344215c5285?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
          alt=""
        />
        <NavText>Panel de control</NavText>
      </NavItem>
      <NavItem>
        <NavIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb61f62f4587eefa40008348f217d1d5dc6c2f72?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
          alt=""
        />
        <NavText>Gestionar salones</NavText>
      </NavItem>
      <NavItem>
        <NavIcon
          src="https://img.freepik.com/vector-gratis/diseno-fondo-concepto-topologia-conexion-grupos-humanos_1017-53324.jpg?ga=GA1.1.204243624.1732496744&semt=ais_hybrid" //Imagen extraída de starline Freepik
          alt=""
        />
        <NavText>Gestionar usuarios</NavText>
      </NavItem>
    </Nav>
  );
}

const Nav = styled.nav`
  align-self: start;
  margin-top: 42px;
  font-family: "Inter", -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 13px;
  color: rgba(82, 182, 154, 1);
  font-weight: 700; /* Mantiene un peso base para todo el nav */
  letter-spacing: -0.26px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const NavItem = styled.div`
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "rgba(82, 182, 154, 1)" : "transparent")};
  border: 1px solid
    ${(props) => (props.active ? "transparent" : "rgba(82, 182, 154, 1)")};
  display: flex;
  padding: 6px 9px;
  align-items: center;
  gap: 14px;
  color: ${(props) => (props.active ? "#fff" : "inherit")};
  margin-top: ${(props) => (props.active ? "0" : "21px")};
  cursor: pointer;
`;

const NavIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 18px;
`;

const NavText = styled.span`
  flex-grow: 1;
  flex-shrink: 1;
  width: 127px;
  font-weight: bold; /* Texto en negrilla */
`;

