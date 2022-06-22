 const express = require('express');

 const router = express.Router()

 const shopsController = require('../controllers/shop')

 router.get('/', shopsController.getIndex)

 router.get('/products', shopsController.getProducts)

 router.get('/cart', shopsController.getCart)

 router.get('/checkout', shopsController.getCheckout)
 router.get('/orders', shopsController.getOrders)

 module.exports = router