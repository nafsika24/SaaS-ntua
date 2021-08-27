exports.getmyask = (req, res, next) => {
    const checkauth = req.session.isLoggedIn;
    if (checkauth) {
        res.render('myask', {
            pageTitle: 'MyAskMeAnything',
            isAuthenticated: req.session.isLoggedIn
        })
    } else {
        res.render('landing',
            {
                pageTitle: 'Landing Page',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
    }
};