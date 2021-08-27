const express = require('express');
const router = express.Router();

const questperkeyword = require('../controllers/perkeyword');

// /questions per keyword => GET
router.get('/perkeyword',questperkeyword.getperkeyword );

module.exports = router;
