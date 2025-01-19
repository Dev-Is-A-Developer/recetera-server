// Import de los módulos necesarios
const express = require('express'); // Framework para crear aplicaciones web y APIs en Node.js
const cors = require('cors'); // Middleware para permitir solicitudes de diferentes orígenes
const bunyan = require('bunyan'); // Librería para registrar logs estructurados y fáciles de leer

// Crear un logger usando Bunyan, con un nombre identificador para los logs
const logger = bunyan.createLogger({name: 'Servidor'});

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config()

// Importar los routers para manejar las rutas relacionadas con usuarios y recetas
const usuarios = require('./routers/usuarioRouter');
const recetas = require('./routers/recetaRouter');

// Inicializar la aplicación de Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json())

// Middleware para habilitar CORS, permitiendo solicitudes desde otros dominios
app.use(cors());

// Asignamos los routers
app.use('/usuarios',usuarios);
app.use('/recetas',recetas);

// Iniciamos el servidor en el puerto especificado en las variables de entorno (archivo .env)
app.listen(process.env.PORT,()=>{
    logger.info('El servidor está funcionando.'); // Registra un mensaje en los logs cuando el servidor está funcionando
})