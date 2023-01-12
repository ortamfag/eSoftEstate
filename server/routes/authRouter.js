const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController')

//Login
router.get('/', testController.test)

module.exports = router