import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FiltersTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const FiltersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FilterGroup = styled.div`
  min-width: 200px;
`;

const FilterGroupTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 16px;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;

  input {
    cursor: pointer;
  }
`;

function UserFilters({ filters, setFilters }) {
  // Función para manejar cambios en los filtros de estado (activo)
  const handleActiveFilterChange = (value) => {
    setFilters(prev => ({
      ...prev,
      activo: prev.activo === value ? null : value
    }));
  };

  // Función para manejar cambios en los filtros de rol (isAdmin)
  const handleAdminFilterChange = (value) => {
    setFilters(prev => ({
      ...prev,
      isAdmin: prev.isAdmin === value ? null : value
    }));
  };

  return (
    <FiltersContainer>
      <FiltersTitle>Filtros</FiltersTitle>
      <FiltersGrid>
        <FilterGroup>
          <FilterGroupTitle>Estado</FilterGroupTitle>
          <FilterOptions>
            <FilterOption>
              <input
                type="checkbox"
                id="filter-active"
                checked={filters.activo === true}
                onChange={() => handleActiveFilterChange(true)}
              />
              <span>Activos</span>
            </FilterOption>
            <FilterOption>
              <input
                type="checkbox"
                id="filter-inactive"
                checked={filters.activo === false}
                onChange={() => handleActiveFilterChange(false)}
              />
              <span>Inactivos</span>
            </FilterOption>
          </FilterOptions>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupTitle>Rol</FilterGroupTitle>
          <FilterOptions>
            <FilterOption>
              <input
                type="checkbox"
                id="filter-admin"
                checked={filters.isAdmin === true}
                onChange={() => handleAdminFilterChange(true)}
              />
              <span>Administradores</span>
            </FilterOption>
            <FilterOption>
              <input
                type="checkbox"
                id="filter-standard"
                checked={filters.isAdmin === false}
                onChange={() => handleAdminFilterChange(false)}
              />
              <span>Estándar</span>
            </FilterOption>
          </FilterOptions>
        </FilterGroup>
      </FiltersGrid>
    </FiltersContainer>
  );
}

export default UserFilters;