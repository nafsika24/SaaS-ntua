const express = require('express');
const router = express.Router();

const myask = require('../controllers/myask');

// My AskMeAnything =>GET
router.get('/myask',myask.getmyask );

module.exports = router;
