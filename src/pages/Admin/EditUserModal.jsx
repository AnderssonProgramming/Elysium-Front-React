import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { actualizarInformacionUsuario } from "../../api/usuario";

// Estilos con styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ToggleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const ToggleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: #2196f3;
  }

  ${SwitchInput}:checked + &:before {
    transform: translateX(24px);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f2f2f2;
  color: #333;
  
  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

const SaveButton = styled(Button)`
  background-color: #2196f3;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #1976d2;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

function EditUserModal({ user, onClose, onUpdate }) {
  // Estado para manejar el formulario con los datos del usuario
  const [formData, setFormData] = useState({
    idInstitucional: "",
    nombre: "",
    apellido: "",
    correoInstitucional: "",
    isAdmin: false,
    activo: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Cuando el modal recibe el usuario, actualiza el estado con sus datos
  useEffect(() => {
    if (user) {
      setFormData({
        idInstitucional: user.idInstitucional,
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correoInstitucional: user.correoInstitucional || "",
        isAdmin: user.isAdmin || false,
        activo: user.activo !== undefined ? user.activo : true
      });
    }
  }, [user]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  // Al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Solo enviamos los campos que deseamos actualizar
      const usuarioActualizado = await actualizarInformacionUsuario(
        formData.idInstitucional,
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correoInstitucional,
          isAdmin: formData.isAdmin,
          activo: formData.activo
        }
      );
      
      // Notificar al componente padre sobre la actualización exitosa
      if (onUpdate) {
        onUpdate(usuarioActualizado || { ...user, ...formData });
      }
      
      onClose(); // Cerrar modal tras guardar cambios
    } catch (err) {
      setError(err.message || "Error al actualizar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {/* Encabezado del modal */}
        <ModalHeader>
          <ModalTitle>
            Id institucional - {formData.idInstitucional || "000000000"}
          </ModalTitle>
        </ModalHeader>

        {/* Cuerpo del modal */}
        <ModalBody>
          <h3>Editar Usuario</h3>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <FormLabel>
              Nombre
              <FormInput
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </FormLabel>

            <FormLabel>
              Apellido
              <FormInput
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </FormLabel>

            <FormLabel>
              Correo
              <FormInput
                type="email"
                name="correoInstitucional"
                value={formData.correoInstitucional}
                onChange={handleChange}
                required
              />
            </FormLabel>

            {/* Toggles de Admin y Activo */}
            <ToggleGroup>
              <ToggleItem>
                <span>Admin</span>
                <Switch>
                  <SwitchInput
                    type="checkbox"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                  />
                  <Slider />
                </Switch>
              </ToggleItem>
              
              <ToggleItem>
                <span>Activo</span>
                <Switch>
                  <SwitchInput
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                  />
                  <Slider />
                </Switch>
              </ToggleItem>
            </ToggleGroup>

            <ModalButtons>
              <CancelButton
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </CancelButton>
              <SaveButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </SaveButton>
            </ModalButtons>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EditUserModal;