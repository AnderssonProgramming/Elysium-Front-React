import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { consultarUsuarioPorCorreo } from "../../api/usuario/administrador"; // Importa la nueva función


const LoginForm = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState(""); // Aquí se ingresa el idInstitucional
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      // Consulta el usuario por su correo institucional
      const usuario = await consultarUsuarioPorCorreo(correo);
      // Valida que el idInstitucional (password) ingresado sea igual al del usuario retornado.
      if (usuario && String(usuario.idInstitucional) === password) {
        // Si coincide, redirige a la pantalla de administrador
        localStorage.setItem("token", "dummy-token");
        navigate("/adminhome");
      } else {
        setErrorMsg("Usuario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      setErrorMsg("Usuario no encontrado o contraseña incorrecta");
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <LogoImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19837d48e4d4d7edc67669c3478e546d719fa809"
        alt="Logo"
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          label="CORREO INSTITUCIONAL"
          type="email"
          placeholder="nombre.apellido@escuelaing.edu.co"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <FormInput
          label="CONTRASEÑA"
          type="password"
          placeholder="idInstitucional"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Ingresar</LoginButton>
      </form>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      <CvdsLogo
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a04bfa90ef84cb31360009a48d4d01c2ac370589"
        alt="CVDS Logo"
      />
    </FormContainer>
  );
};

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 155px 153px;
  width: 50%;
  position: relative;
  @media (max-width: 991px) {
    width: 100%;
    padding: 40px 20px;
  }
  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const LogoImage = styled.img`
  width: 226px;
  height: 151px;
  margin: 0 auto 137px;
  @media (max-width: 640px) {
    width: 180px;
    height: 120px;
    margin-bottom: 60px;
  }
`;

const LoginButton = styled.button`
  width: 246px;
  height: 54px;
  border-radius: 2px;
  border: none;
  color:rgb(22, 45, 255);
  font-family: "Inter", sans-serif;
  font-size: 19px;
  font-weight: 700;
  margin: 0 auto;
  margin-top: 100px;
  cursor: pointer;
  background-color: #d9ed92;
  display: block;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const CvdsLogo = styled.img`
  width: 59px;
  height: 63px;
  margin: 130px auto 0;
`;

export default LoginForm;
