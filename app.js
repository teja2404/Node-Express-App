const path = require('path')
const rootDir = require('./utils/path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const MONGODB_URI = 'mongodb+srv://arunTeja:McJ5BfmvwARrpCur@cluster0.e6mns.mongodb.net/shop?retryWrites=true&w=majority'
const csrf = require('csurf')
const flash = require('connect-flash')

const app = express()
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

const csrfProtection = csrf()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')



const errorController = require('./controllers/error')
const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')
const user = require('./models/user')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(csrfProtection)

app.use(flash())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next();
})
app.use('/admin', adminRoutes)

app.use(shopRoutes)
app.use(authRoutes)


app.use(errorController.get404Page)

mongoose.connect(MONGODB_URI).then(results => {
  app.listen(3000)
}).catch(err => console.log(err))