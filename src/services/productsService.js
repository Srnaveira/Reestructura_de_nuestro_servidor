const productsData = require('../persistence/data/productsData.js')

async function addProduct (newProduct) {
    try {
        await productsData.addProduct(newProduct)

    } catch (error) {
        console.error("Hubo un problema en el productService function addProduct");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function getAllProducts () {
    try {
        return await productsData.getAllProducts()

    } catch (error) {
        console.error("Hubo un problema en el productService function getAllProducts");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function getProductById (idProduct) {
    try {
        return await productsData.getProductById(idProduct);

    } catch (error) {
        console.error("Hubo un problema en el productService function getProductById");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function updateProduct (idProduct, productUpdate) {
    try {
        await productsData.updateProduct(idProduct, productUpdate);

    } catch (error) {
        console.error("Hubo un problema en el productService function updateProduct");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function deleteProduct (idProduct) {
    try {
        await productsData.deleteProduct(idProduct);

    } catch (error) {
        console.error("Hubo un problema en el productService function deleteProduct");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function getProductByFilter (filter, limit, offset, sortOptions) {
    try {
         return await productsData.getProductByFilter(filter, limit, offset, sortOptions);

    } catch (error) {
        console.error("Hubo un problema en el productService function getProductByFilter");
        throw new Error({message: "Hubo un problema en el productService"})
    }
}

async function totalProducts (){
    try {
        return await productsData.totalProducts();
    } catch (error) {
        console.error("Hubo un problema al obtener el total de productos");
        throw new Error({message: "Hubo un problema al obtener el total de productos"}) 
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByFilter,
    totalProducts
}