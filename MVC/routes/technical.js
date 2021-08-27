const express = require('express');
const router = express.Router();

const technicalController = require('../controllers/technical');

// /technical/about => GET
router.get('/about',technicalController.about );

// /technical/contact => GET
router.get('/contact',technicalController.contact );

// /technical/contact => POST
router.post('/',technicalController.contactpost );

// /technical/github => GET
router.get('/github',technicalController.github );

// /technical/course_materials => GET
router.get('/course_materials',technicalController.course_materials );

// /technical/documentation => GET
router.get('/documentation',technicalController.documentation );

module.exports = router;
