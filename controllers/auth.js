const User = require('../models/user')
var bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
  res.render('auth/Login', {
    path: '/login',
    pageTitle: 'Login',
    errMessage: req.flash('error')
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly')
  // req.isLoggedIn = true
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email: email
    })
    .then(user => {
      if (!user) {
        req.flash('error', 'invalid email or password')
        return res.redirect('/login')
      }
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            res.redirect('/')
          })
        }
        res.redirect('/login')
      }).catch(err => {
        console.log(err)
        return res.redirect('/login');
      });

    })
    .catch(err => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({
      email: email
    })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect('/')
  })
}