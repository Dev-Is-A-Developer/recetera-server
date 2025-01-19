// ROUTER PARA RECETAS

const express = require('express');
const recetaController = require('../controllers/recetaController') // Importar las funciones del controlador relacionadas con recetas

const router = express.Router(); // Crear router para manejar rutas específicas relacionadas con recetas

// Ruta GET: Devuelve las últimas de todas las recetas disponibles llamando a "obtenerRecetas" del controlador
router.get('/',recetaController.obtenerRecetas)

// Ruta dinámica GET: Devuelve todas las recetas que pertenecen a una categoría específica.
// ":tipo" es un parámetro dinámico que representa el tipo de categoría.
router.get('/categorias/:tipo', recetaController.obtenerRecetasPorCategoria);

// Ruta dinámica GET: Devuelve las recetas asociadas a un usuario específico.
// ":usuario" es un parámetro dinámico en la URL que representa al usuario.
router.get('/:usuario',recetaController.obtenerMisRecetas)

// Ruta POST: Crea una nueva receta al llamar a "crearReceta" en el controlador.
router.post('/',recetaController.crearReceta)

// Ruta dinámica GET: Encuentra y devuelve una receta específica por su ID.
// ":id" es un parámetro dinámico que se pasa en la URL.
router.get('/recetaActual/:id',recetaController.encontrarReceta)

// Ruta PUT: Edita una receta existente al llamar a "editarReceta" en el controlador.
router.put('/',recetaController.editarReceta)

// Ruta dinámica DELETE : Elimina una receta específica basada en su ID.
// ":id" es un parámetro dinámico que se pasa en la URL.
router.delete('/:id', recetaController.eliminarReceta); // ruta dinamica

module.exports = router; // Exportar el router