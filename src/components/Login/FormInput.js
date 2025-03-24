import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormInput = ({ label, type = "text" }) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <StyledInput type={type} aria-label={label} />
      <InputUnderline />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 108px;
  width: 100%;
  @media (max-width: 640px) {
    margin-bottom: 60px;
  }
`;

const InputLabel = styled.label`
  color: ${(props) => (props.children === "CONTRASEÑA" ? "#000" : "#aaba70")};
  font-family: "Inter", sans-serif;
  font-size: 11px;
  margin-bottom: 22px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  outline: none;
  padding: 0;
`;

const InputUnderline = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  background-color: #aaba70;
`;
FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default FormInput;

