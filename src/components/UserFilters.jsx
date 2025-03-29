import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const UserFilters = ({ filters, setFilters }) => {
  const handleActiveFilterChange = (value) => {
    // Si se selecciona el mismo valor, lo deseleccionamos (null)
    setFilters(prev => ({
      ...prev,
      activo: prev.activo === value ? null : value
    }));
  };

  const handleAdminFilterChange = (value) => {
    // Si se selecciona el mismo valor, lo deseleccionamos (null)
    setFilters(prev => ({
      ...prev,
      isAdmin: prev.isAdmin === value ? null : value
    }));
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterTitle>Estado</FilterTitle>
        <FilterOptions>
          <FilterOption>
            <input
              type="checkbox"
              checked={filters.activo === true}
              onChange={() => handleActiveFilterChange(true)}
              id="filter-activo"
            />
            <label htmlFor="filter-activo">Activos</label>
          </FilterOption>
          <FilterOption>
            <input
              type="checkbox"
              checked={filters.activo === false}
              onChange={() => handleActiveFilterChange(false)}
              id="filter-inactivo"
            />
            <label htmlFor="filter-inactivo">Inactivos</label>
          </FilterOption>
        </FilterOptions>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Rol</FilterTitle>
        <FilterOptions>
          <FilterOption>
            <input
              type="checkbox"
              checked={filters.isAdmin === true}
              onChange={() => handleAdminFilterChange(true)}
              id="filter-admin"
            />
            <label htmlFor="filter-admin">Administradores</label>
          </FilterOption>
          <FilterOption>
            <input
              type="checkbox"
              checked={filters.isAdmin === false}
              onChange={() => handleAdminFilterChange(false)}
              id="filter-estandar"
            />
            <label htmlFor="filter-estandar">Estándar</label>
          </FilterOption>
        </FilterOptions>
      </FilterGroup>
    </FilterContainer>
  );
};

export default UserFilters;