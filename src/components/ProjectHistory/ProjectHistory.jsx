import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectHistory.css";

const ProjectHistory = () => {
  const [projects, setProjects] = useState([]); // Lista original de proyectos
  const [filteredProjects, setFilteredProjects] = useState([]); // Lista filtrada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // Estado de búsqueda
  const [sortField, setSortField] = useState(""); // Campo a ordenar
  const [sortOrder, setSortOrder] = useState("asc"); // Orden ascendente/descendente

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/projects");
        console.log(response)
        if (!response.ok) {
          throw new Error("Error al obtener el historial de proyectos");
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Inicialmente muestra todos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filtrado en tiempo real
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = projects.filter((project) =>
      project.nombre_proyecto.toLowerCase().includes(value.toLowerCase()) ||
      project.codigo_unico.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProjects(filtered);
  };

  // Ordenar proyectos
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredProjects].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProjects(sorted);
  };

  if (loading) return <div className="loading">Cargando historial...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-history-container">
      <h2>Historial de Proyectos</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por código o nombre..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredProjects.length === 0 ? (
        <p>No hay proyectos registrados.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("codigo_unico")}>
                Código Único {sortField === "codigo_unico" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("nombre_proyecto")}>
                Nombre del Proyecto {sortField === "nombre_proyecto" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("responsable")}>
                Responsable {sortField === "responsable" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("fecha_inicio")}>
                Fecha de Inicio {sortField === "fecha_inicio" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Viabilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.codigo_unico}>
                <td>{project.codigo_unico}</td>
                <td>{project.nombre_proyecto}</td>
                <td>{project.responsable}</td>
                <td>{project.fecha_inicio}</td>
                <td
                  className={
                    project.viable === "Viable" ? "viable" : "not-viable"
                  }
                >
                  {project.viable}
                </td>
                <td>
                  <Link
                    to={`/projects/${project.codigo_unico}`}
                    className="view-details-button"
                  >
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectHistory;
