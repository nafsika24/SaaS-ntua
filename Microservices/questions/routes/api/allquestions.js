const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Question = require('../../models/Question');
//const User = require('../../models/User');

const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// @route GET api/allquestions
// @desc  Show all questions
// @access Private

router.get('/', async (req, res) => {
        try {
            const quest = await Question.find().sort({ date: -1 });
            res.json(quest);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

// @route GET api/allquestions
// @desc  Show all questions
// @access Public
router.get('/visitor', async (req, res) => {
    try {
        const quest = await Question.find().sort({ date: -1 }).limit(10);

        res.json(quest);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;