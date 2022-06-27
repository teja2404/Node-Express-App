const path = require('path')
const rootDir = require('./utils/path')
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./utils/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')



const errorController = require('./controllers/error')
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch(err => {
    console.log(err)
  })
})

app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404Page)

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
})


User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Order.belongsTo(User)
User.hasMany(Order)
Cart.belongsToMany(Product, {
  through: CartItem
})
Product.belongsToMany(Cart, {
  through: CartItem
})
Order.belongsToMany(Product, {
  through: OrderItem
})




sequelize.sync({
  // force: true
}).then(result => {
  return User.findByPk(1)
}).then(user => {
  if (!user) {
    return User.create({
      name: "ArunSoumya",
      email: "test@test.com"
    })
  }
  return user

}).then(user => {
  return user.createCart()
}).then(cart => {
  // console.log(user)
  app.listen(3000)

}).catch(err => {
  console.log(err)
})