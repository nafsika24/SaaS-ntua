const express = require('express');
const router = express.Router();

const newanswerController = require('../controllers/newanswer');

// add a new answer => GET
router.get('/',newanswerController.getnewans );
// add a new answer => POST
router.post('/',newanswerController.postnewans);

module.exports = router;
