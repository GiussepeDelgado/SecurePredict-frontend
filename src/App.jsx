import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import LoadProjectPage from "./components/LoadProjectPage/LoadProjectPage";
import ProjectHistory from "./components/ProjectHistory/ProjectHistory";
import PredictionResults from "./components/PredictionResults/PredictionResults";
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Fondo de partículas animadas */}
        <div className="particles">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Encabezado */}
        <Header />
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/cargar-proyecto" element={<LoadProjectPage />} />
          <Route path="/historial-proyectos" element={<ProjectHistory />} />
          <Route path="/projects/:codigo_unico" element={<PredictionResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
