 const path = require('path')
 const rootDir = require('../utils/path')
 const express = require('express');

 const router = express.Router()

 const adminData = require('./admin')

 router.get('/', (req, res, next) => {
   const products = adminData.products
   res.render('shop', {
     prods: products,
     pageTitle: 'My Shop',
     path: '/'
   })
   //  res.sendFile(path.join(rootDir, 'views', 'shop.html'))
   //  res.send('<h2>welcome to Express.js</h2>')
   console.log(adminData.products)
 })

 module.exports = router