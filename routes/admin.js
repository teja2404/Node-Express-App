const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()


router.get('/add-product', adminController.getAddProducts)

router.get('/products', adminController.products)

router.post('/add-product', adminController.postAddProducts)

module.exports = router