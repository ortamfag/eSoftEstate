const express = require('express');
const router = express.Router();

const startController = require('../controllers/startController')
const clientController = require('../controllers/clientController')
const rieltorController = require('../controllers/rieltorController')
const searchController = require('../controllers/searchController')
const estateController = require('../controllers/estateController')
const offerController = require('../controllers/offerController')
const requirementController = require('../controllers/requirementController')

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

//Search
router.get('/search', searchController.search)
router.get('/searchCR', searchController.ClientAndRieltor)
router.get('/searchEstate', searchController.estate)

//Offer

router.get('/offer', offerController.offerView)

router.get('/addOffer', offerController.addOfferView)
router.post('/addOfferAction', offerController.addOffer)

router.post('/deleteOfferAction/:id', offerController.deleteOffer)

router.get('/editOfferView/:id', offerController.editOfferView)
router.post('/editOffer/:id', offerController.editOffer)

module.exports = router

//Requirement
router.get('/requirement', requirementController.requirementView)

//Add requirement
router.get('/addRequirement', requirementController.addRequirementView)
router.post('/addRequirementAction', requirementController.addRequirement)

// //Delete requirement
// router.post('/deleteRequirementAction/flat/:id', requirementController.deleteRequirementFlat)
// router.post('/deleteRequirementAction/house/:id', requirementController.deleteRequirementHouse)
// router.post('/deleteRequirementAction/territory/:id', requirementController.deleteRequirementTerritory)

// //Change requirement
// router.get('/editRequirementView/flat/:id', requirementController.editRequirementFlatView)
// router.post('/editRequirement/flat/:id', requirementController.editRequirementFlat)

// router.get('/editRequirementView/house/:id', requirementController.editRequirementHouseView)
// router.post('/editRequirement/house/:id', requirementController.editRequirementHouse)

// router.get('/editRequirementView/territory/:id', requirementController.editRequirementTerritoryView)
// router.post('/editRequirement/territory/:id', requirementController.editRequirementTerritory)