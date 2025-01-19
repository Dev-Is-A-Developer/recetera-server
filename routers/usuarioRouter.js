// ROUTER PARA USUARIOS

const express = require('express');
const usuarioController = require('../controllers/usuarioController')  // Importar las funciones del controlador relacionadas con usuarios.

const router = express.Router(); // Crear router para manejar rutas específicas relacionadas con usuarios

// Ruta POST: Cuando se hace una solicitud POST a '/', llama a la función "verificarUsuario" en el controlador
// Ej. Este endpoint podría usarse para validar las credenciales de un usuario al iniciar sesión
router.post('/',usuarioController.verificarUsuario);

module.exports = router; // Exportar el router