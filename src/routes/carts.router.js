const express = require('express');
const cartsController = require('../controllers/cartsControllers.js')

const router = express.Router()

router.post('/', cartsController.addCart)


router.get('/', cartsController.getAllCarts);


router.get('/:cid', )


router.post('/:cid/product/:pid', )


router.delete('/:cid/product/:pid', )


router.put('/:cid/product/:pid', );


router.delete('/:cid',)



module.exports = router;