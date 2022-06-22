const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Product',
    path: '/admin/add-product'
  })
}

exports.postAddProducts = (req, res, next) => {
  const product = new Product(
    title = req.body.title
  )
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/'
    })
  })
}

exports.products = Product