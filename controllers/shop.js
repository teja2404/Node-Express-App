const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/products-list', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/products'
    })
  }).catch(err => {
    console.log(err)
  })

}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then(product => {
    console.log(product)
    res.render('shop/product-details', {
      product: product,
      pageTitle: 'Product',
      path: '/product-details'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Index',
      path: '/'
    })
  }).catch(err => {
    console.log(err)
  })
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Index',
  //     path: '/'
  //   })
  // })
}

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then(products => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: products
      })
    })
  }).catch(err => {

  })
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = []
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id)
  //       if (cartProductData) {
  //         cartProducts.push({
  //           productData: product,
  //           qty: cartProductData.qty
  //         })

  //       }
  //     }
  //     
  //   })

  // })

}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: prodId
        }
      });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCardDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({
        where: {
          id: prodId
        }
      });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({
      include: ['products']
    }).then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders
      })
    })
    .catch(err => {
      console.log(err)
    })

}

exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user.getCart().then(cart => {
    fetchedCart = cart
    return cart.getProducts()
  }).then(products => {
    return req.user.createOrder().then(order => {
      order.addProducts(products.map(product => {
        product.orderItem = {
          quantity: product.cartItem.quantity
        }
        return product
      }))
    }).then(result => {
      return fetchedCart.setProducts(null)
      res.redirect('/orders')
    })
    console.log(products)
  })
}
exports.products = Product