const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const ExpiredToken = require("../../models/ExpiredToken");


router.post('/' ,  auth , async (req,res) =>{
    try{
        const tok = req.header('x-auth-token');
        let expiredToken = new ExpiredToken({"tokenID" : tok});
        await expiredToken.save();
        res.status(200).json(({ msg: "Token deleted. Successfully Logged out"}))
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error") ;
    }
});

module.exports = router;