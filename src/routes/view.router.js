const express = require('express');
const productsController = require('../controllers/productsController.js'); // Asegúrate de que la ruta del archivo es correcta

const router = express.Router();

router.get('/realtimeproducts',  (req, res) => {
    try {
        res.status(200).render('realtimeproducts', {
            user: res.locals.user,
            isAdmin: res.locals.user && res.locals.user.rol === "admin",  
        });
    } catch (error) {
        console.error("Error al renderizar realtimeproducts", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
});


module.exports = router;
