import React from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Sistema de Predicción de Proyectos de Seguridad</h1>
        <nav className="header-nav">
          <ul className="header-menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/cargar-proyecto">Cargar Proyecto</Link></li>
            <li><Link to="/historial-proyectos">Lista de Proyectos</Link></li>
            <li><Link to="/predecir">Predecir</Link></li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
