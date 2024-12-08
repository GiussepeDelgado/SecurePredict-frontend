import React from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import "./MainSection.css";

const MainSection = () => {
  return (
    <section className="main-section">
      <div className="main-container">
        <h1 className="main-title">Predicción de Proyectos de Seguridad</h1>
        <p className="main-description">
          Carga los parámetros de tu proyecto y descubre su viabilidad y costo devengado
          con nuestro modelo predictivo avanzado.
        </p>
        <Link to="/cargar-proyecto" className="main-button">
          Cargar Proyecto
        </Link>
      </div>
    </section>
  );
};

export default MainSection;
