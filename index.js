// calorias.js

// Función para calcular las calorías
const calcularCalorias = (peso, altura, edad, genero, nivelActividad, objetivo) => {
    // Calcular TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict
    let tmb;
    if (genero === 'masculino') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    }

    // Multiplicar TMB por el nivel de actividad
    const actividad = {
        sedentario: 1.2,
        ligero: 1.375,
        moderado: 1.55,
        activo: 1.725,
        muyActivo: 1.9
    };

    const caloriasMantenimiento = tmb * actividad[nivelActividad];

    // Ajustar calorías según el objetivo
    const ajuste = objetivo === 'volumen' ? 500 : -500;
    const caloriasObjetivo = caloriasMantenimiento + ajuste;

    return {
        caloriasMantenimiento: caloriasMantenimiento.toFixed(2),
        caloriasObjetivo: caloriasObjetivo.toFixed(2)
    };
};

// Array para almacenar los datos de los usuarios
const usuarios = [];

// Función para registrar y mostrar la información del usuario
const registrarUsuario = () => {
    // Obtener los valores de los inputs
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    const nivelActividad = document.getElementById('nivelActividad').value;
    const objetivo = document.getElementById('objetivo').value;

    // Calcular las calorías
    const calculo = calcularCalorias(peso, altura, edad, genero, nivelActividad, objetivo);

    // Almacenar los datos en el array
    const usuario = {
        nombre,
        apellido,
        peso, 
        altura, 
        edad, 
        genero, 
        nivelActividad, 
        objetivo, 
        ...calculo
    };
    usuarios.push(usuario);

    // Mostrar los resultados en la tabla
    mostrarResultados();
};

// Función para mostrar los resultados en la tabla
const mostrarResultados = () => {
    const tabla = document.getElementById('resultados');
    tabla.innerHTML = ''; // Limpiar la tabla

    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        Object.values(usuario).forEach(valor => {
            const celda = document.createElement('td');
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });
};
