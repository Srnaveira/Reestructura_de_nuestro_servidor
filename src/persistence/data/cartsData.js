const cartsModel = require('../models/carts.model.js')
const productModel = require('../models/products.model.js')
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
            return await cartsModel.findOne({_id: idCart }).populate('product.idP').lean();
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
            const cart = await cartsModel.findOne({ _id: idCart });
    
            if (!cart) {
                throw new Error(`Carrito con id ${idCart} no encontrado`);
            }
            const productIndex = cart.product.findIndex((item) => item.idP.toString() === idProduct);
    
            if (productIndex !== -1) {
                // Actualizar cantidad si el producto ya existe
                cart.product[productIndex].quantity += quantity;
            } else {
                // Agregar nuevo producto si no existe
                cart.product.push({ idP: idProduct, quantity });
            }
    
            // Guardar los cambios en la base de datos
            await cart.save();
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            throw error;
        }
        
    },
    
    deletProductToCart: async (idCart, idProduct) =>{
        try {
            const cart = await cartsModel.findOne({ _id: idCart });
    
            if (!cart) {
                throw new Error(`Carrito con id ${idCart} no encontrado`);
            }
    
            const productIndex = cart.product.findIndex((item) => item.idP.toString() === idProduct);
    
            if (productIndex !== -1) {
                // Eliminar el producto del carrito
                cart.product.splice(productIndex, 1);
    
                // Guardar los cambios en la base de datos
                await cart.save();
            } else {
                throw new Error(`Producto con id ${idProduct} no encontrado en el carrito`);
            }
        } catch (error) {
            console.error(`Error al Eliminar el producto del Cart: ${idCart} indicado`);
            throw Error;        
        }
    }

}