const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Answer = require('../../models/Answer');
//const User = require('../../models/User');

const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// @route GET api/allanswers
// @desc  Show all answers
// @access Private

router.get('/', async (req, res) => {
    try {
        const quest = await Answer.find().sort({ date: -1 });
        res.json(quest);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;