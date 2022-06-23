const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/products-list', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/products'
    })
  })
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: 'Product',
      path: '/product-details'
    })
  })

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Index',
      path: '/'
    })
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty
          })

        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cartProducts
      })
    })

  })

}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
    // res.render('shop/product-details', {
    //   ,product: product,
    //   pageTitle: 'Product',
    //   path: '/product-details'
    // })
    // res.render('shop/cart', {
    //   pageTitle: 'Cart',
    //   path: '/cart'
    // })
    res.redirect('/cart')

  })
}

exports.postCardDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')

  })

}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
}
exports.products = Product