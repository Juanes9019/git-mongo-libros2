const {response} = require('express');
const Libro = require('../modules/libro');

const librosGet = async (req, res = response) => {
    try {
        const libros = await Libro.find();
        res.json({
            libros
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error en el servidor'});
    }
}


const librosPost = async (req, res = response) => {
    try {
        const { IDlibro, ISBN, TITULO, AUTOR, IDeditorial, FECHA, PRECIO, COMENTARIOS, Foto } = req.body;
        const libro = new Libro({ IDlibro, ISBN, TITULO, AUTOR, IDeditorial, FECHA, PRECIO, COMENTARIOS, Foto });
        await libro.save(); 
        res.json({
            msg: 'Libro creado',
            libro
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}



// Controlador para actualizar un libro existente
const librosPut = async (req, res = response) => {
    try {
        const { IDlibro } = req.params; 
        const { ISBN, TITULO, AUTOR, IDeditorial, FECHA, PRECIO, COMENTARIOS, Foto } = req.body;
        const libro = await Libro.findOneAndUpdate({ IDlibro }, { ISBN, TITULO, AUTOR, IDeditorial, FECHA, PRECIO, COMENTARIOS, Foto }, { new: true });

        if (!libro) {
            return res.status(404).json({
                msg: 'libro no encontrado'
            });
        }

        res.json({
            msg: 'libro actualizado',
            libro
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const librosDelete = async (req, res = response) => {
    try {
        const { IDlibro } = req.params; 
        const libro = await Libro.findOneAndDelete({ IDlibro });

    if (!libro) {
        return res.status(404).json({
            msg: 'libro no encontrado'
        });
    }

    res.json({
        msg: 'libro eliminado',
        libro
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

module.exports ={
    librosGet,
    librosPost,
    librosPut,
    librosDelete
}
