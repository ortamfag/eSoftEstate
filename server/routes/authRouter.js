const express = require('express');
const router = express.Router();

const startController = require('../controllers/startController')
const clientController = require('../controllers/clientController')
const rieltorController = require('../controllers/rieltorController')
const searchController = require('../controllers/searchController')
const estateController = require('../controllers/estateController')

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

//Estate view
router.get('/estate', estateController.estateView)

//Add Estate
router.get('/addEstate', estateController.addEstateView)
router.post('/addEstateAction', estateController.addEstate)

//Delete estate
router.post('/deleteEstateAction/flat/:id', estateController.deleteEstateFlat)
router.post('/deleteEstateAction/house/:id', estateController.deleteEstateHouse)
router.post('/deleteEstateAction/territory/:id', estateController.deleteEstateTerritory)

//Change client
router.get('/editEstateView/flat/:id', estateController.editEstateFlatView)
router.post('/editEstate/flat/:id', estateController.editEstateFlat)

router.get('/editEstateView/house/:id', estateController.editEstateHouseView)
router.post('/editEstate/house/:id', estateController.editEstateHouse)

router.get('/editEstateView/territory/:id', estateController.editEstateTerritoryView)
router.post('/editEstate/territory/:id', estateController.editEstateTerritory)

router.get('/search', searchController.ClientAndRieltor)

module.exports = router