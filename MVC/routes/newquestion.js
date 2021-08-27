const express = require('express');
const router = express.Router();

const newquestionController = require('../controllers/newquestion');

// /add question => GET
router.get('/',newquestionController.newquest );

// /add question => POST
router.post('/',newquestionController.postnewquest);

module.exports = router;
