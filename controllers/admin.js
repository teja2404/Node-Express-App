const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Product',
    path: '/admin/add-product'
  })
}

exports.postAddProducts = (req, res, next) => {
  const product = new Product(
    title = req.body.title,
    imageUrl = req.body.imageUrl,
    description = req.body.description,
    price = req.body.price
  )
  product.save()
  res.redirect('/')
}

exports.products = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
}