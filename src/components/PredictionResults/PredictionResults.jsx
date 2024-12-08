import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PredictionResults.css";

const PredictionResults = () => {
  const { codigo_unico } = useParams(); // Captura el parámetro dinámico de la URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/projects/${codigo_unico}`);
        if (!response.ok) {
          setError("No existe un proyecto con el código proporcionado.");
          setProject(null);
        } else {
          const data = await response.json();
          setProject(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [codigo_unico]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="no-data">Proyecto no encontrado</div>;

  return (
    <div className="prediction-results-container">
      <div className="technical-document">
        <h2 className="doc-title">Resultados de Predicción</h2>
        <div className="doc-section">
          <h3>Información del Proyecto</h3>
          <ul>
            <li><strong>Código Único:</strong> {project.codigo_unico}</li>
            <li><strong>Nombre del Proyecto:</strong> {project.nombre_proyecto}</li>
            <li><strong>Responsable:</strong> {project.responsable}</li>
            <li><strong>Fecha de Inicio:</strong> {project.fecha_inicio}</li>
            <li><strong>Departamento:</strong> {project.departamento}</li>
            <li><strong>Distrito:</strong> {project.distrito}</li>
            <li><strong>Objetivo:</strong> {project.objetivo}</li>
          </ul>
        </div>

        <div className="doc-section">
          <h3>Parámetros del Proyecto</h3>
          <ul>
            <li><strong>Monto Viable:</strong> ${project.monto_viable}</li>
            <li><strong>Costo Actualizado:</strong> ${project.costo_actualizado}</li>
            <li><strong>Situación:</strong> {project.situacion ? "Crítica" : "No Crítica"}</li>
            <li><strong>Estado:</strong> {project.estado ? "Activo" : "Inactivo"}</li>
            <li><strong>Nivel:</strong> {["Bajo", "Medio", "Alto"][project.nivel]}</li>
            <li><strong>Función:</strong> {["No Prioritaria", "Intermedia", "Prioritaria"][project.funcion]}</li>
            <li><strong>Sector:</strong> {["Público", "Privado", "Mixto"][project.sector]}</li>
          </ul>
        </div>

        <div className="doc-section">
          <h3>Resultados de la Predicción</h3>
          <ul>
            
            <li><strong>Puntaje de Viabilidad:</strong> {project.score_viabilidad}</li>
            <li><strong>Costo Devengado:</strong> {project.costo_devengado}%</li>
            <li
              className={
                project.viable === "Viable"
                  ? "highlight-viability viable"
                  : "highlight-viability not-viable"
              }
            >
              <strong>Viabilidad:</strong> {project.viable}
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
