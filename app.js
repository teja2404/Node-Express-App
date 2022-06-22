const path = require('path')
const rootDir = require('./utils/path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.router)

app.use(shopRoutes)


app.use((req, res, next) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page Not Found'
  })
})

app.listen(3000)