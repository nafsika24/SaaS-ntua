  exports.landingPage = (req, res, next) => {
      const checkauth = req.session.isLoggedIn;
      if (checkauth) {
          const user = req.session.user.username
          res.render('landing', {
              pageTitle: 'AskMeAnything',
              username: user,
              islogged:true,
              isAuthenticated: req.session.isLoggedIn
          })
      } else {
          res.render('landing',
              {
                  pageTitle: 'Landing Page',
                  path: '/',
                  islogged: false,
                  isAuthenticated: req.session.isLoggedIn
              });
      }
    };