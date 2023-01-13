const express = require('express');
const router = express.Router();

const startController = require('../controllers/startController')
const clientController = require('../controllers/clientController')
const rieltorController = require('../controllers/rieltorController')
const searchController = require('../controllers/searchController')

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

//Rieltor view
router.get('/rieltor', rieltorController.rieltorView)

//Add Rieltor
router.get('/addRieltor', rieltorController.addRieltorView)
router.post('/addRieltorAction', rieltorController.addRieltor)

//Delete Rieltor
router.post('/deleteRieltorAction/:id', rieltorController.deleteRieltor)

//Change Rieltor
router.get('/editRieltorView/:id', rieltorController.editRieltorView)
router.post('/editRieltor/:id', rieltorController.editRieltor)

router.get('/search', searchController.ClientAndRieltor)

module.exports = router