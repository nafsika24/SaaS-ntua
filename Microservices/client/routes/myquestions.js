const express = require('express');
const router = express.Router();

const myquestions = require('../controllers/myquestions');

// my Questions=> GET
router.get('/myquestions',myquestions.getmyquestions );

module.exports = router;
