// CONFIGURACION DE BASE DE DATOS

// Importar el módulo MySQL para manejar conexiones y consultas con bases de datos MySQL
const mysql = require('mysql2')

// Manejar logs con Bunyan
const bunyan = require('bunyan')

// Crear un logger específico para la base de datos, nombrado 'Database Log'.
const logDatabase = bunyan.createLogger({name:'Database Log'});

// Configuración de la conexión a la base de datos utilizando las variables de entorno definidas en el archivo .env.
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USUARIO,
    password: process.env.DB_CONTRASENA,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306 // port FreeDB
});

// Establecer la conexión con la base de datos.
conexion.connect ( err => {

    if (err) {
        logDatabase.error(err)
    }

    logDatabase.info('Conectado a la base de datos.')

});

module.exports = conexion;
