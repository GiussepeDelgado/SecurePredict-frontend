import React, { useState, useEffect } from "react";
import "./LoadProjectPage.css";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
const LoadProjectPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("individual");
  const [formData, setFormData] = useState({
    codigo_unico: "",
    nombre_proyecto: "",
    responsable: "",
    fecha_inicio: "",
    departamento: "",
    distrito: "",
    objetivo: "",
    monto_viable: "",
    costo_actualizado: "",
    situacion: "",
    estado: "",
    nivel: "",
    funcion: "",
    sector: "",
  });

  const [bulkData, setBulkData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Si la respuesta no es exitosa, lanzar error
      if (!response.ok) {
        const errorData = await response.json(); // Obtener el error del servidor
        console.error("Error en el servidor:", errorData.detail);
        alert(`Error al cargar el proyecto: ${errorData.detail}`); // Mostrar alerta con la validación
        return;
      }

      // Si la respuesta es exitosa
      const result = await response.json();
      //navigate("/resultados", { state: { predictionData: result } });
      navigate(`/projects/${formData.codigo_unico}`);
      //console.log("Respuesta del servidor:", result);
      //alert("¡Proyecto cargado correctamente!");

      // Limpia el formulario si es necesario
      /*
      setFormData({
        codigoUnico: "",
        nombreProyecto: "",
        responsable: "",
        fechaInicio: "",
        departamento: "",
        distrito: "",
        objetivo: "",
        montoViable: "",
        costoActualizado: "",
        situacion: "",
        estado: "",
        nivel: "",
        funcion: "",
        sector: "",
      });
      */
    } catch (error) {
      console.error("Error inesperado:", error.message);
      alert("Error inesperado al cargar el proyecto. Por favor, inténtalo de nuevo.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const rows = event.target.result.split("\n").slice(1); // Ignorar encabezado
      const parsedData = rows.map((row) => {
        const [
          codigo_unico,
          nombre_proyecto,
          responsable,
          fecha_inicio,
          departamento,
          distrito,
          objetivo,
          monto_viable,
          costo_actualizado,
          situacion,
          estado,
          nivel,
          funcion,
          sector,
        ] = row.split(",");
        return {
          codigo_unico,
          nombre_proyecto,
          responsable,
          fecha_inicio,
          departamento,
          distrito,
          objetivo,
          monto_viable,
          costo_actualizado,
          situacion,
          estado,
          nivel,
          funcion,
          sector,
        };
      });
      setBulkData(parsedData);
    };
    reader.readAsText(file);
  };

  const handleSelectRow = (codigo_unico) => {
    setSelectedRows((prev) =>
      prev.includes(codigo_unico)
        ? prev.filter((id) => id !== codigo_unico)
        : [...prev, codigo_unico]
    );
  };

  const handlePredict = async () => {
    const selectedProjects = bulkData.filter((p) =>
      selectedRows.includes(p.codigo_unico)
    );

    if (selectedProjects.length === 0) {
      alert("No hay proyectos seleccionados para predecir.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/projects/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProjects), // Envía los proyectos seleccionados
      });

      if (!response.ok) {
        throw new Error("Error al predecir los proyectos seleccionados.");
      }

      const predictionResults = await response.json();
      console.log("Resultados de la predicción:", predictionResults);

      // Ejemplo: Alerta con los resultados de la predicción
      alert("Predicción completada. Revisa los detalles en la consola.");
      //navigate(`/projects`);
      // Opcional: Actualizar UI o redirigir
    } catch (error) {
      console.error("Error en la predicción:", error.message);
      alert("Error en la predicción de proyectos seleccionados.");
    }
  };

  // Función para manejar "Seleccionar Todos"
  const handleSelectAll = () => {
    // Filtra los proyectos no deshabilitados
    const selectableProjects = bulkData
      .filter((project) => !existingProjects.includes(project.codigo_unico)) // Excluye los proyectos existentes
      .map((project) => project.codigo_unico);
  
    // Verifica si ya están seleccionados todos los proyectos no deshabilitados
    if (selectedRows.length === selectableProjects.length) {
      setSelectedRows([]); // Deselecciona todo
    } else {
      setSelectedRows(selectableProjects); // Selecciona todos los proyectos válidos
    }
  };

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
        console.log("existingProjects: ", existingProjects)
      } catch (error) {
        console.error("Error al cargar los proyectos existentes:", error.message);
      }
    };

    fetchExistingProjects();
  }, []);

  return (
    <div className="load-project-container">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("individual")}
          className={activeTab === "individual" ? "active" : ""}
        >
          Carga Individual
        </button>
        <button
          onClick={() => setActiveTab("masiva")}
          className={activeTab === "masiva" ? "active" : ""}
        >
          Carga Masiva
        </button>
      </div>
      {activeTab === "individual" ? (
        <div>
          <h2>Formulario de Carga de Proyecto</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Código Único:
              <input
                type="text"
                name="codigo_unico"
                value={formData.codigo_unico}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Nombre del Proyecto:
              <input
                type="text"
                name="nombre_proyecto"
                value={formData.nombre_proyecto}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Responsable:
              <input
                type="text"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Fecha de Inicio:
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Departamento:
              <input
                type="text"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Distrito:
              <input
                type="text"
                name="distrito"
                value={formData.distrito}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Objetivo:
              <input
                type="text"
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Monto Viable:
              <input
                type="number"
                name="monto_viable"
                value={formData.monto_viable}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Costo Actualizado:
              <input
                type="number"
                name="costo_actualizado"
                value={formData.costo_actualizado}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Situación:
              <select
                name="situacion"
                value={formData.situacion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="1">Crítica</option>
                <option value="0">No crítica</option>
              </select>
            </label>

            <label>
              Estado:
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </label>

            <label>
              Nivel:
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="0">Bajo</option>
                <option value="1">Medio</option>
                <option value="2">Alto</option>
              </select>
            </label>

            <label>
              Función:
              <select
                name="funcion"
                value={formData.funcion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="0">No prioritaria</option>
                <option value="1">Intermedia</option>
                <option value="2">Prioritaria</option>
              </select>
            </label>

            <label>
              Sector:
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="0">Público</option>
                <option value="1">Privado</option>
                <option value="2">Mixto</option>
              </select>
            </label>

            <button type="submit">Cargar Proyecto</button>
          </form>
        </div>
      ) : (
        <div className="bulk-upload-section">
          <h2>Carga Masiva de Proyectos</h2>
          <label htmlFor="fileUpload" className="drop-container" id="dropcontainer">
            <span className="drop-title">Suelta el archivo aquí</span>
            <span className="upload-button">Seleccionar archivo</span>
            <input
              id="fileUpload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input"
            />
          </label>

          {bulkData.length > 0 && (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <button onClick={handleSelectAll} className="select-all-button">
                          {selectedRows.length === bulkData.length ? (
                            <>
                              <FaCheckSquare className="icon" /> Deseleccionar Todos
                            </>
                          ) : (
                            <>
                              <FaRegSquare className="icon" /> Seleccionar Todos
                            </>
                          )}
                        </button>
                      </th>
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
              <button onClick={() => handlePredict(selectedRows)} className="predict-button">
                Predecir Proyectos Seleccionados
              </button>
            </>
          )}
        </div>
      )}


    </div>
  );
};

export default LoadProjectPage;
