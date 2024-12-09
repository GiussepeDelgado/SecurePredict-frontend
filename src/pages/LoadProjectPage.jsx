import React, { useState, useEffect } from "react";

const BulkProjectTable = ({ bulkData, selectedRows, setSelectedRows }) => {
  const [existingProjects, setExistingProjects] = useState([]); // Proyectos existentes en el servidor

  useEffect(() => {
    // Obtener los proyectos existentes del backend
    const fetchExistingProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/projects");
        if (!response.ok) {
          throw new Error("Error al obtener los proyectos existentes");
        }
        const data = await response.json();
        setExistingProjects(data.map((proj) => proj.codigo_unico)); // Extraer solo los códigos únicos
      } catch (error) {
        console.error("Error al cargar los proyectos existentes:", error.message);
      }
    };

    fetchExistingProjects();
  }, []);

  const handleSelectRow = (codigo_unico) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(codigo_unico)
        ? prevSelectedRows.filter((id) => id !== codigo_unico)
        : [...prevSelectedRows, codigo_unico]
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Código Único</th>
            <th>Nombre del Proyecto</th>
            <th>Responsable</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          {bulkData.map((project) => {
            const isDisabled = existingProjects.includes(project.codigo_unico); // Verifica si ya existe
            return (
              <tr key={project.codigo_unico}>
                <td>
                  <input
                    type="checkbox"
                    disabled={isDisabled} // Deshabilita si existe
                    checked={selectedRows.includes(project.codigo_unico)}
                    onChange={() => handleSelectRow(project.codigo_unico)}
                  />
                </td>
                <td>{project.codigo_unico}</td>
                <td>{project.nombre_proyecto}</td>
                <td>{project.responsable}</td>
                <td>{["Público", "Privado", "Mixto"][project.sector]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BulkProjectTable;
