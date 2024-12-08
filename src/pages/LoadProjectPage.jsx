import React, { useState } from "react";
import "./LoadProjectPage.css";

const LoadProjectPage = () => {
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
      console.log("Respuesta del servidor:", result);
      alert("¡Proyecto cargado correctamente!");
  
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
  
  

  return (
    <div className="load-project-container">
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
  );
};

export default LoadProjectPage;
