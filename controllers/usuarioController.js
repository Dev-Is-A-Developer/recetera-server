// CONTROLLER PARA USUARIOS

const db = require('../connections/database') // Importar la conexión a la base de datos para ejecutar consultas SQL.


const usuarioController = {

    // Verificar si un usuario existe y si sus credenciales son correctas.
    verificarUsuario(req,res){

        // Extraer el usuario y la contraseña
        let usuario = req.body.usuario;
        let contrasena = req.body.contrasena;

        // Realizar una consulta SQL para buscar un usuario en la base de datos con el nombre y contraseña proporcionados
        db.query('SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?',
            [usuario,contrasena], // Sustituir los marcadores de posición por las variables 'usuario' y 'contrasena'.
            (err,results)=>{ // Callback que se ejecuta cuando la consulta se completa.

            if (err) {
                console.log(err); // Error en la consulta
            }

            // Verifica si se encontró algún resultado en la base de datos.
            if (results.length == 0) {
                res.json({mensajeError: 'Usuario no encontrado'}).status(401) // Si no se encontró ningún usuario con las credenciales proporcionadas, devuelve error

            } else {
                res.json(results[0]) // Si se encontró un usuario, devuelve el primer objeto (usuario) de los resultados en formato JSON
            }
            
        })

    }

}

module.exports = usuarioController;