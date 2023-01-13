const express = require('express');
const router = express.Router();

const startController = require('../controllers/startController')
const clientController = require('../controllers/clientController')

router.get('/', startController.start)

//Client view
router.get('/client', clientController.clientView)

//Add client
router.get('/addClient', clientController.addClientView)
router.post('/addClientAction', clientController.addClient)

//Delete client
router.post('/deleteClientAction/:id', clientController.deleteClient)

//Change client
router.get('/editClientView/:id', clientController.editClientView)
router.post('/editClient/:id', clientController.editClient)

module.exports = router