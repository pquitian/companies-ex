const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');


router.get('/create', usersController.create);
router.post('/create',usersController.doCreate);

module.exports = router;