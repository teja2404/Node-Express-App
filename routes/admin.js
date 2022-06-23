const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()


router.get('/add-product', adminController.getAddProducts)

router.get('/products', adminController.products)

router.post('/add-product', adminController.postAddProducts)
router.get('/edit-product/:productId', adminController.getEditProducts)

router.post('/edit-product', adminController.postEditProducts)
router.post('/delete-product', adminController.postDeleteProduct)


module.exports = router