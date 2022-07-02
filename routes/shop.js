 const express = require('express');

 const router = express.Router()

 const shopsController = require('../controllers/shop')

 router.get('/', shopsController.getIndex)

 router.get('/products', shopsController.getProducts)

 router.get('/products/:productId', shopsController.getProduct)


 router.get('/cart', shopsController.getCart)
 router.post('/cart', shopsController.postCart)

 router.post('/cart-delete-item', shopsController.postCardDeleteProduct)

 //  router.get('/checkout', shopsController.getCheckout)
 router.get('/orders', shopsController.getOrders)

 router.post('/create-order', shopsController.postOrder)

 module.exports = router