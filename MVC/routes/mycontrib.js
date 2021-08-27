const express = require('express');
const router = express.Router();

const mycontrib = require('../controllers/mycontrib');

// my contributions => GET
router.get('/mycontrib',mycontrib.getmycontrib );

module.exports = router;
