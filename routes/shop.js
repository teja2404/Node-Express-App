 const express = require('express');

 const router = express.Router()

 const shopsController = require('../controllers/shop')
 const isAuth = require('../middleware/is-auth')

 router.get('/', shopsController.getIndex)

 router.get('/products', shopsController.getProducts)

 router.get('/products/:productId', shopsController.getProduct)


 router.get('/cart', isAuth, shopsController.getCart)
 router.post('/cart', isAuth, shopsController.postCart)

 router.post('/cart-delete-item', isAuth, shopsController.postCartDeleteProduct)

 //  router.get('/checkout', shopsController.getCheckout)
 router.get('/orders', isAuth, shopsController.getOrders)

 router.post('/create-order', isAuth, shopsController.postOrder)

 module.exports = router