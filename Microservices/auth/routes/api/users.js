const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route    POST api/signup
// @desc     Register user
// @access   Public

router.post('/',
    [
        check('username','Username is required').not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({min : 6})
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        
        const {username,email,password} = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                username,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);

            // user takes the password and creates a hash to put the user password
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            //res.send('User registered');
            // payload
            const payload = {
                user:{
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'),{expiresIn:360000 },
                (err,token)=>{
                    if(err) throw err;
                    payload.token = token
                    res.json({payload});
                });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;
