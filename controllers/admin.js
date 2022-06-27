const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
  }).then(results => {
    console.log(results)
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  req.user.getProducts({
    where: {
      id: prodId
    }
  }).then(products => {
    // Product.findById(prodId, product => {
    const product = products[0]
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  }).catch(err => {
    console.log(err)
  })

}
exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId
  // const product = new Product(
  const id = prodId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  Product.findByPk(prodId).then(product => {
    product.title = title;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price
    return product.save()
  }).then(results => {
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.destroy({
    where: {
      id: prodId
    }
  }).then(results => {
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  });

}

exports.products = (req, res, next) => {
  req.user.getProducts().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err => {
    console.log(err)
  })
}