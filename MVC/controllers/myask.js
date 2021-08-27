exports.getmyask = (req, res, next) => {
    const checkauth = req.session.isLoggedIn;

    if (checkauth) {
        const user = req.session.user.username
        res.render('myask', {
            pageTitle: 'MyAskMeAnything',
            username: user,
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