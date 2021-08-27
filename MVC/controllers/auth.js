const User = require('../models/user');
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

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
      .then(user => {
        if (!user) {
            req.flash('error','Invalid email or password.');
          return res.redirect('/login');
        }
        bcrypt
            .compare(password, user.password)
            .then(doMatch => {
              if (doMatch) {
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  islogged = true;
                return req.session.save(err => {
                  console.log(err);
                    islogged = true
                  res.redirect('/');
                });
              }

              res.redirect('/login');
            })
            .catch(err => {
              console.log(err);
              res.redirect('/login');
            });
      })
      .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email})
  .then(userDoc =>{
    if(userDoc){
        req.flash('error2','E-mail exists already, please pick a different one.');
      return res.redirect('/signup');
    }
      if(password.length < 6){
          req.flash('error3','Please enter a valid password.');
          return res.redirect('/signup');

      }
   if(password !== confirmPassword){
        req.flash('error','Passwords do not match, please try again.');
        return res.redirect('/signup');
    }
    return bcrypt.hash(password,12 ).then(hashedPassword => {
      const user = new User({
          username: username,
        email: email,
        password: hashedPassword,
        contributions: {quests: []}
      });
      return user.save();
    })
        .then(result => {
            req.session.isLoggedIn = true;

          res.redirect('/');
        });
  })
      .catch(err => {
    console.log(err);
  });

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
