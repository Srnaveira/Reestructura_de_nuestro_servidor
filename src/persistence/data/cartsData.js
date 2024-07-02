const cartsModel = require('../models/carts.model.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() =>{ console.log("Conexion sucefull")})
    .catch((error) => {console.error("Error en conexion con la BD", error)})


module.exports = {
    addCart: async (newCart) => { 
        try {
            await cartsModel.create(newCart);     
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw error;
        }
    },

    getAllCarts: async () => {
        try {
            return await cartsModel.find();
        } catch (error) {
            console.error("Error Al traer el los Carts");
            throw Error;
        }
    },

    getCartById: async (idCart) =>{
        try {
            await cartsModel.findOne({_id: cartId}).populate('product.idP').lean();
        } catch (error) {
            console.error(`Error al Buscar el Cart: ${idCart}`);
            throw Error;            
            
        }

    },

    deleteCart: async (idCart) =>{
        try {
            await cartsModel.deleteOne({_id: idCart});
        } catch (error) {
            console.error(`Error al Eliminar el Cart: ${idCart}`);
            throw Error;            
        }
    },

    addProductToCart: async (idCart, idProduct, quantity) =>{
        try {
            await cartsModel.updateOne(
                { _id: idCart }, 
                { $push: { product: { idP: idProduct, quantity } } }
            );
        } catch (error) {
            console.error(`Error al Actualizar el Contenido del Cart: ${idCart}`);
            throw Error;                      
        }
        
    },   

    deletProductToCart: async (idCart, idProduct) =>{
        try {
            await cartsModel.updateOne(
                {_id: idCart},
                { $pull: { product: {idP: idProduct} } }
            );
        } catch (error) {
            console.error(`Error al Eliminar el producto del Cart: ${idCart} indicado`);
            throw Error;                                
        }
    }

}