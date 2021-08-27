const path = require('path');
const express = require('express');
const allquestionsController = require('../controllers/newquestion');
const router = express.Router();

// view Questions per keyword => GET
router.get('/allquestions', allquestionsController.allquests);

module.exports = router;
