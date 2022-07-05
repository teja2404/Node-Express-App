const path = require('path')
const rootDir = require('./utils/path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')



const errorController = require('./controllers/error')
const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')
const user = require('./models/user')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('62c46aee04f8f64d3ee31f09')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404Page)

mongoose.connect('mongodb+srv://arunTeja:McJ5BfmvwARrpCur@cluster0.e6mns.mongodb.net/shop?retryWrites=true&w=majority').then(results => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'test',
        email: 'test@test.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })

  app.listen(3000)
}).catch(err => console.log(err))