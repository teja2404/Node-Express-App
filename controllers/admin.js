const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProducts = (req, res, next) => {
  const product = new Product(
    id = null,
    title = req.body.title,
    imageUrl = req.body.imageUrl,
    description = req.body.description,
    price = req.body.price
  )
  product.save()
  res.redirect('/')
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })

}
exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId
  const product = new Product(
    id = prodId,
    title = req.body.title,
    imageUrl = req.body.imageUrl,
    description = req.body.description,
    price = req.body.price
  )
  product.save()
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
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