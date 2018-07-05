const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

router.post('/create/:id', commentsController.doCreate);


module.exports = router;