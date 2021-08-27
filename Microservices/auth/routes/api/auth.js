const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.get('/', async (req, res) => {
    // call to database
    try {
        // take user model no password back
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route      POST api/login
// @desc       Authenticate user and get token
// @access     Public

router.post('/',
[       // only email check if password exists
    check('email','Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req,res) =>{ 
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array() });
   }

   const {email,password} = req.body;
   try {
     let user = await User.findOne({ email });
    // check if there is no user registered
     if (!user) {
       return res
         .status(400)
         .json({ errors: [{ msg: 'Invalid credentials' }] });
     }

     // match the user with an email and password
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid credentials' }] });
     }

      // payload
      const payload = {
        user:{
            id: user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret'),{expiresIn:360000 },
      (err,token)=>{
          payload.token = token
          if(err) throw err;
          res.json({payload});
    });

}catch(err){
       console.error(err.message);
       res.status(500).send('Server error');
   }
});

module.exports = router;