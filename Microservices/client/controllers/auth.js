const axios = require('axios')
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
      errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false,
      errorMessage: req.flash('error'),
      errorMessage2: req.flash('error2'),
      errorMessage3: req.flash('error3')
  });
};

exports.postLogin = (req, res ,next) => {
  const config = {
      method:"post",
      url:"https://ms-auth-askmeanything.herokuapp.com/api/login",
      data: req.body
  }
  axios(config)
      .then(result =>{
          req.session.isLoggedIn = true
          req.session.user = result.data.payload.user.id
          req.session.token = result.data.payload.token;
          res.redirect('/')
      })
      .catch(err =>{
          console.log(err.response.data)
          return res.redirect('/login')
      })


};
exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password.length < 6){
        req.flash('error3','Please enter a valid password.');
        return res.redirect('/signup');
    }

    if(password !== confirmPassword){
        req.flash('error','Passwords do not match, please try again.');
        return res.redirect('/signup');
    }
    const config = {
        method:"post",
        url:"https://ms-auth-askmeanything.herokuapp.com/api/signup",
        data: req.body
    }
    axios(config)
        .then(result =>{
            req.session.isLoggedIn = true
            req.session.user = result.data.payload.user.id
            req.session.token = result.data.payload.token;
            res.redirect('/')
        })
        .catch(err =>{
            req.flash('error2','E-mail exists already, please pick a different one.');
            return res.redirect('/signup')
        })

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) console.log(err);
    res.redirect('/');
  });
};
