const nodemailer = require('nodemailer');

exports.about = (req, res, next) => {
    res.render('technical/about',
        {
            pageTitle: 'About',
            path: '/about',
            isAuthenticated: req.session.isLoggedIn
        });
};

exports.contact = (req, res, next) => {
    res.render('technical/contact',
        {
            pageTitle: 'Contact',
            path: '/contact',
            isAuthenticated: req.session.isLoggedIn
        });
};

exports.contactpost = async (req,res,next) => {
    try {
        const output = ` <p>You have a new contact request</p>
        <h3>Contact Details </h3>
        <ul>
        <li>First Name: ${req.body.first}</li>
        <li>Last Name: ${req.body.last}</li>
        <li>Email: ${req.body.email}</li>
        <li>Comments: ${req.body.comments}</li>
</ul>
`;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:'Hotmail',
            auth: {
                user: 'AskMeAnything2021@outlook.com.gr', // generated ethereal user
                pass: 'askme2021', // generated ethereal password
            },
            tls:
                {rejectUnauthorised: false}
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"AskMeAnything Contact Form"',
            to: "AskMeAnything2021@outlook.com.gr", // list of receivers
            subject: "AskMeAnything",
            text: "Message:",
            html: output
        });
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}
exports.github = (req, res, next) => {
    res.render('technical/github',
        {
            pageTitle: 'Github',
            path: '/github',
            isAuthenticated: req.session.isLoggedIn
        });
};


exports.course_materials = (req, res, next) => {
    res.render('technical/course_materials',
        {
            pageTitle: 'Course Materials',
            path: '/technical/course_materials',
            isAuthenticated: req.session.isLoggedIn
        });
};

exports.documentation = (req, res, next) => {
    res.render('technical/documentation',
        {
            pageTitle: 'Documentation',
            path: '/technical/documentation',
            isAuthenticated: req.session.isLoggedIn
        });
};