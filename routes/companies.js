const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companies.controller');


router.get('/create', companiesController.create);
router.post('/docreate',companiesController.doCreate);
router.get('/edit/:id', companiesController.edit);
router.post('/:id/doedit', companiesController.doEdit);
router.get('/', companiesController.list);
router.get('/:id', companiesController.get);

module.exports = router;