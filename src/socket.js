const { Server } = require('socket.io');
const productsService = require('./services/productsService.js');
const CartsService = require('./services/cartsServices.js');

module.exports = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', socket => {
        console.log("Nuevo cliente conectado");

        socket.on('message', data => {
            console.log(data);
        });

        productsService.getAllProducts()
            .then((products) => {
                socket.emit('listProducts', products);
            });

        socket.broadcast.emit('message_user_conect', "Ha Ingresado un nuevo USUARIO");
        socketServer.emit('event_for_all', "Este evento lo veran todos los usuarios");

        socket.on('productAdd', async (product) => {
            try {
                const addIsValid = await productsService.addProduct(product);
                if (addIsValid) {
                    await productsService.getAllProducts()
                        .then((products) => {
                            socket.emit('listProducts', products);
                            socket.emit('message_add', "Producto Agregado");
                        });
                }
            } catch (error) {
                socket.emit('message_add', "Error al agregar el producto: " + error.message);
            }
        });

        socket.on('productDelete', async (pid) => {
            try {
                const Productexist = await productsService.getProductById(pid);

                if (Productexist) {
                    await productsService.deleteProduct(pid);
                    await productsService.getAllProducts()
                        .then((products) => {
                            socket.emit('listProducts', products);
                            socket.emit('message_delete', "Producto Eliminado");
                        });
                }
            } catch (error) {
                socket.emit('message_delete', "Error al Eliminar el producto: " + error.message);
            }
        });

        socket.on('add_Product_cart', async (productoInfo) => {
            try {
                const quantity = 1;
                console.log("PRODUCTID: "+ productoInfo._id);
                console.log("CARTID: " + productoInfo.cartId);

                await CartsService.addProductToCart(productoInfo.cartId, productoInfo._id, quantity);

                socket.emit('productAdded', { message: "El producto se agrego correctamente" });
            } catch (error) {
                socket.emit('productAdded', "Error al agregar el producto al cart selecionado: " + error.message);
            }
        });
    });
};