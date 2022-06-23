const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path')
const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {
  static addProduct(id, prodPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      }
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      const existingProductindex = cart.products.findIndex(prod => prod.id == id)
      const existingProduct = cart.products[existingProductindex]
      let updateProduct

      if (existingProduct) {
        updateProduct = {
          ...existingProduct
        }
        updateProduct.qty = updateProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductindex] = updateProduct
      } else {
        updateProduct = {
          id: id,
          qty: 1
        }
        cart.products = [...cart.products, updateProduct]

      }
      cart.totalPrice = cart.totalPrice + +prodPrice
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }

  static deleteProduct(id, productPrice) {

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return
      }

      const updatedCart = {
        ...JSON.parse(fileContent)
      }
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err)
      })
    })

  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        cb(null)
      } else {
        cb(cart)

      }
    })

  }
}