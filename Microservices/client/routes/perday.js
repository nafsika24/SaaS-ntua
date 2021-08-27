const express = require('express');
const router = express.Router();

const questperday = require('../controllers/perday');

// /questions per day => GET
router.get('/perday',questperday.getperday );

module.exports = router;
