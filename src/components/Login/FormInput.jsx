import React from "react";
import styled from "styled-components";

const FormInput = ({ label, type = "text", onChange, placeholder }) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <StyledInput
        type={type}
        aria-label={label}
        onChange={onChange}
        placeholder={placeholder}
      />
      <InputUnderline />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 60px; /* Ajusta el espacio vertical entre los campos */
  width: 100%;
  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`;

const InputLabel = styled.label`
  color: rgb(107, 155, 61); /* Negro */
  font-family: "Inter", sans-serif;
  font-size: 18px; /* Tamaño mayor */
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Inter", sans-serif;
  font-size: 16px; /* Tamaño mayor */
  font-weight: bold;
  outline: none;
  padding: 0;
  color: #000; /* Texto en negro */

  ::placeholder {
    color: #999; /* Color del placeholder */
  }
`;

const InputUnderline = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
  background-color: #aaba70;
`;

export default FormInput;