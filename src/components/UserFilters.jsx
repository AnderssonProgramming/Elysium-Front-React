import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-left: 4px solid #52b69a;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
    }
`;

const FiltersTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    
    i {
        margin-right: 8px;
        color: #52b69a;
    }
`;

const FiltersGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
`;

const FilterGroup = styled.div`
    min-width: 220px;
    background-color: #ffffff;
    padding: 14px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const FilterGroupTitle = styled.div`
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 15px;
    color: #444;
    display: flex;
    align-items: center;
    
    i {
        margin-right: 8px;
        color: #52b69a;
    }
`;

const FilterOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const FilterOption = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #f0f2f5;
    }
    
    input {
        cursor: pointer;
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #d0d5dd;
        border-radius: 4px;
        position: relative;
        transition: all 0.2s ease;
        
        &:checked {
            background-color: #52b69a;
            border-color: #52b69a;
        }
        
        &:checked:after {
            content: '\u2714';
            font-size: 12px;
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    
    i {
        color: #52b69a;
        width: 16px;
    }
`;

function UserFilters({ filters, setFilters }) {
    const handleActiveFilterChange = (value) => {
        setFilters(prev => ({
            ...prev,
            activo: prev.activo === value ? null : value
        }));
    };

    const handleAdminFilterChange = (value) => {
        setFilters(prev => ({
            ...prev,
            isAdmin: prev.isAdmin === value ? null : value
        }));
    };

    return (
        <FiltersContainer>
            <FiltersTitle>
                <i className="fas fa-filter"></i>
                Filtros
            </FiltersTitle>
            <FiltersGrid>
                <FilterGroup>
                    <FilterGroupTitle>
                        <i className="fas fa-toggle-on"></i>
                        Estado
                    </FilterGroupTitle>
                    <FilterOptions>
                        <FilterOption>
                            <input
                                type="checkbox"
                                id="filter-active"
                                checked={filters.activo === true}
                                onChange={() => handleActiveFilterChange(true)}
                            />
                            <i className="fas fa-check-circle"></i>
                            <span>Activos</span>
                        </FilterOption>
                        <FilterOption>
                            <input
                                type="checkbox"
                                id="filter-inactive"
                                checked={filters.activo === false}
                                onChange={() => handleActiveFilterChange(false)}
                            />
                            <i className="fas fa-times-circle"></i>
                            <span>Inactivos</span>
                        </FilterOption>
                    </FilterOptions>
                </FilterGroup>

                <FilterGroup>
                    <FilterGroupTitle>
                        <i className="fas fa-user-shield"></i>
                        Rol
                    </FilterGroupTitle>
                    <FilterOptions>
                        <FilterOption>
                            <input
                                type="checkbox"
                                id="filter-admin"
                                checked={filters.isAdmin === true}
                                onChange={() => handleAdminFilterChange(true)}
                            />
                            <i className="fas fa-crown"></i>
                            <span>Administradores</span>
                        </FilterOption>
                        <FilterOption>
                            <input
                                type="checkbox"
                                id="filter-standard"
                                checked={filters.isAdmin === false}
                                onChange={() => handleAdminFilterChange(false)}
                            />
                            <i className="fas fa-user"></i>
                            <span>Estándar</span>
                        </FilterOption>
                    </FilterOptions>
                </FilterGroup>
            </FiltersGrid>
        </FiltersContainer>
    );
}

export default UserFilters;