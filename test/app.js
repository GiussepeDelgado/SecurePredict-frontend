import fs from 'fs';
import path from 'path';

// Helper function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random date
function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// Generate random row data
function generateRandomRow(index) {
    const departamentosYDistritos = {
        "Lima": ["Miraflores", "San Isidro", "Barranco", "Surco", "Chorrillos"],
        "Cusco": ["Wanchaq", "San Sebastián", "San Jerónimo", "Santiago", "Cusco"],
        "Arequipa": ["Yanahuara", "Cayma", "Cercado", "Paucarpata", "Alto Selva Alegre"],
        "Piura": ["Catacaos", "Castilla", "Tambogrande", "Sullana", "Talara"],
        "Trujillo": ["Víctor Larco Herrera", "El Porvenir", "Florencia de Mora", "La Esperanza", "Trujillo"]
    };

    const objetivos = [
        "Incrementar la seguridad ciudadana",
        "Reducir los índices de delincuencia",
        "Mejorar la capacidad de respuesta",
        "Prevenir actividades delictivas",
        "Fortalecer la cooperación comunitaria"
    ];
    const responsables = ["Luis Gutiérrez", "María López", "Juan Pérez", "Ana Martínez", "Pedro Sánchez"];

    const departamentos = Object.keys(departamentosYDistritos);
    const departamento = departamentos[getRandomInt(0, departamentos.length - 1)];
    const distrito = departamentosYDistritos[departamento][getRandomInt(0, departamentosYDistritos[departamento].length - 1)];

    return {
        codigo_unico: `SEC-${(index+10).toString().padStart(3, '0')}`,
        nombre_proyecto: objetivos[getRandomInt(0, objetivos.length - 1)],
        responsable: responsables[getRandomInt(0, responsables.length - 1)],
        fecha_inicio: getRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31)),
        departamento: departamento,
        distrito: distrito,
        objetivo: objetivos[getRandomInt(0, objetivos.length - 1)],
        monto_viable: getRandomInt(1000, 50000),
        costo_actualizado: getRandomInt(2000, 60000),
        situacion: getRandomInt(0, 1).toString(),
        estado: getRandomInt(0, 1).toString(),
        nivel: getRandomInt(0, 2).toString(),
        funcion: getRandomInt(0, 2).toString(),
        sector: getRandomInt(0, 2).toString()
    };
}


// Function to generate and save CSV
function generateCSV(n) {
    const headers = [
        "codigo_unico",
        "nombre_proyecto",
        "responsable",
        "fecha_inicio",
        "departamento",
        "distrito",
        "objetivo",
        "monto_viable",
        "costo_actualizado",
        "situacion",
        "estado",
        "nivel",
        "funcion",
        "sector"
    ];

    const rows = Array.from({ length: n }, (_, i) => generateRandomRow(i + 1));
    const csvContent = [
        headers.join(','),
        ...rows.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    const filePath = path.resolve('proyectos_seguridad.csv');
    fs.writeFileSync(filePath, csvContent);
    console.log(`CSV file generated at ${filePath}`);
}

// Example: Generate 100 rows and save to CSV
generateCSV(50);
