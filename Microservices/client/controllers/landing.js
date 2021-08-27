  exports.landingPage = (req, res, next) => {
      res.render('landing',{
          pageTitle:'AskmeAnything',
          isAuthenticated: req.session.isLoggedIn
      });
    };