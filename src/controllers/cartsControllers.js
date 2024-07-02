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
        const CartIsValid = await cartsServices.getCartById(idCart)
        if(CartIsValid){
            res.status(200).render('cart', CartIsValid);
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
        const idCart = req.params.cid;
        const cartIsValid = await cartsServices.deleteCart(idCart);
        if(cartIsValid){
            res.status(200).json({message: `El cart: ${idCart} Se elimino correctamente`})
        } else {
            res.status(404).json({message: `El cart: ${idCart} No existe`})
        }
    } catch (error) {
        console.error("Se produjo algun error al Eliminar el Cart", error);
        res.status(500).json({message: "Error interno del servidor", error: error});
    }       
}


async function addProductToCart (req, res) {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantity = 1;
        
        const CartIsValid = await cartsServices.getCartById(idCart)
        if(CartIsValid){
            const productIsValid = CartIsValid.product.find((item) => item.idP === idProduct);
            if(productIsValid){
                quantity = productIsValid.quantity + quantity;
                await cartsServices.deletProductToCart(idCart, idProduct);
                await cartsServices.addProductToCart( idCart, idProduct, quantity);
                res.status(200).json({message: "Producto agregado correctamente"})
            } else {
                await cartsServices.addProductToCart( idCart, idProduct, quantity);
                res.status(200).json({message: "Producto agregado correctamente"})
            }
            
        } else {
        res.status(404).json({message: "carrito no encontrado"})      
        }
    } catch (error) {
        console.error("Hubo un problema al eliminar ese carrito", error)
        res.status(404).json({message: "carrito no encontrado", error: error})      
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