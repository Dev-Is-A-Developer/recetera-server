// CONTROLLER PARA RECETAS

const db = require('../connections/database'); // Importar la conexión a la base de datos para ejecutar consultas SQL.

const recetaController = {

    // Obtener las últimas 5 recetas ordenadas de forma descendente por ID.
    obtenerRecetas(req,res){

        db.query('SELECT * FROM recetas ORDER BY id_receta DESC LIMIT 5',(err,results)=>{

            if (err) {
                console.log(err); // Error en la consulta
                return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
            }

            return res.status(200).json(results);  // Devuelve las recetas encontradas.

        });
    },

    // Obtener recetas según su categoría.
    obtenerRecetasPorCategoria(req, res) {

        let { tipo } = req.params;  // Obtener tipos de parametros (Desayuno, Comida, etc.)

        // Consulta para seleccionar recetas que coincidan con el tipo especificado
        db.query('SELECT * FROM recetas WHERE tipo = ?', [tipo], (err, results) => {
            if (err) {
                console.log(err); // Error en la consulta
                return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
            }
            if (results.length === 0) {
                return res.status(404).json({ error: "No hay recetas para esta categoría" }); // Devuelve las recetas encontradas
            }

            return res.status(200).json(results); // Devuelve las recetas encontradas.
            
        });

    },

    // Obtener las recetas que coincidan con el usuario especificado.
    obtenerMisRecetas(req,res) {
        
        let usuario = req.params.usuario; // Obtener nombre y contrasena de parametros

        // Consulta para seleccionar recetas cuyo escritor coincida con el usuario especificado.
        db.query('SELECT * FROM recetas WHERE escritor = ?',[usuario],(err,results)=>{

            if (err) {
                console.log(err); // Error en la consulta
                return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
            }

            return res.status(200).json(results); // Devuelve las recetas encontradas.

        });
    },

    // Crear una nueva receta con los datos proporcionados
    crearReceta(req,res) {

        // Desestructura los datos de la receta desde el cuerpo de la solicitud.
        let {titulo, tiempo, tipo, descripcion, ingredientes, instrucciones, escritor} = req.body;

        // Consulta para insertar una nueva receta en la base de datos.
        db.query('INSERT INTO recetas(titulo, tiempo, tipo, descripcion, ingredientes, instrucciones, escritor) VALUES (?,?,?,?,?,?,?)',
            [titulo, tiempo, tipo, descripcion, ingredientes, instrucciones, escritor],
            (err) => {

                if (err) {
                    console.log(err); // Error en la consulta
                    return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
                }
               
                return res.status(200).json({ mensaje: 'Inserción con éxito' });
    
            });
    },

    // Obtener una receta específica por su ID.
    encontrarReceta(req,res) {

        let {id} = req.params; // Obtiene el ID de la receta desde los parámetros

        db.query('SELECT * FROM recetas WHERE id_receta = ?',
        [id],
        (err,results) => {

            if (err) {
                console.log(err); // Error en la consulta
                return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
            }
    
            if (results.length === 0) {
                return res.status(404).json({ error: "Receta no encontrada" });
            }
    
            return res.status(200).json(results[0]); // Devuelve la receta encontrada.

        });

    },

    // Actualizar los datos de una receta.
    editarReceta (req,res) {

        let id = req.body.id_receta; // ID de la receta a actualizar.
        let {titulo, tiempo, tipo, descripcion, ingredientes, instrucciones} = req.body; // Nuevos datos de la receta

        // Consulta para actualizar los campos de la receta.
        db.query('UPDATE recetas SET titulo = ?, tiempo = ?, tipo = ?, descripcion = ?, ingredientes = ?, instrucciones = ? WHERE id_receta = ?',
        [titulo, tiempo, tipo, descripcion, ingredientes, instrucciones, id],
        (err,results) => {

            if (err) {
                console.log(err); // Error en la consulta
                return res.status(500).json({ error: "Error en la consulta" }); // Devuelve un error de servidor y para de ejecutar
            }
            
            // Verificar si alguna fila fue afectada (receta encontrada y actualizada).
            if (results.entradasDatabaseEliminadas === 0) {
                return res.status(404).json({ error: "Receta no encontrada" });
            }

            return res.status(200).json({ mensaje: 'Modificado con éxito' });

        });

    },

    // Eliminar una receta por su ID.
    eliminarReceta(req, res) {

        let { id } = req.params; // Obtener el ID de la receta desde los parámetros
    
        db.query('DELETE FROM recetas WHERE id_receta = ?', [id], (err, results) => {
            if (err) {
                console.error(err); // Error en la consulta
                return res.status(500).json({ error: "Error al eliminar la receta" }); // Devuelve un error de servidor y para de ejecutar
            }
            
            // Verificar si alguna fila fue afectada (receta encontrada y eliminada).
            if (results.entradasDatabaseEliminadas === 0) {
                return res.status(404).json({ error: "Receta no encontrada" });
            }
    
            return res.status(200).json({ mensaje: 'Receta eliminada con éxito' });
        });
    }        

}

module.exports = recetaController;