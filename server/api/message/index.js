'use strict';

var express = require('express'),
    controller = require('./message.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
