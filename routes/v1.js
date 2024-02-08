const express = require('express');
const router = express.Router();
const WelcomeController = require('../app/controllers/WelcomeController');

router.get('/',WelcomeController.index);
router.get('/user/list',WelcomeController.listusers);

module.exports = router;