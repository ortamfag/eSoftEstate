const express = require('express');
const router = express.Router();

const startController = require('../controllers/startController')
const clientController = require('../controllers/clientController')

router.get('/', startController.start)

//Client view
router.get('/client', clientController.clientView)

//Add Client
router.get('/addClient', clientController.addClientView)
router.post('/addClientAction', clientController.addClient)

module.exports = router