const cartsServices = require('../services/cartsServices.js');

async function addCart (req, res) {
    try {
        const newCart = {
            product: []
        }
        await cartsServices.addCart(newCart)
        res.status(201).json({message:'Se a creado correctamente el nuevo cart', cart: newCart});
    } catch (error) {
        console.error("Se produjo algun error al generar el Cart", error);
        res.status(500).json({message: "Error interno del servidor", error: error}); 
    }
}


async function getAllCarts (req, res) {
    try {
       const carts = await cartsServices.getAllCarts()
       res.status(200).json({message: "Se envio el contenido de todos los carritos", cart: carts});
    } catch (error) {
        console.error("Se produjo algun error al traer el contenido del Cart", error);
        res.status(500).json({message: "Error interno del servidor", error: error});       
    }       
}


async function getCartById (req, res) {
   try {
        const idCart = req.params.cid;    
        const CartisValid = await cartsServices.getCartById(idCart)
        if(CartisValid){
            res.status(200).render('cart', CartisValid);
        } else {
            res.status(404).json({message: "No existe ese producto"});
        }
    } catch (error) {
        console.error("Se produjo algun error al traer el contenido del Cart", error);
        res.status(500).json({message: "Error interno del servidor", error: error});
    }
}



async function deleteCart (req, res) {
    try {
       
    } catch (error) {
       
    }       
}


async function addProductToCart (req, res) {
    try {
       
    } catch (error) {
       
    }       
}



async function deletProductToCart (req, res) {
    try {
       
    } catch (error) {
       
    }       
}












module.exports = {
    addCart,
    getAllCarts,
    getCartById,
    deleteCart,
    addProductToCart,
    deletProductToCart
}