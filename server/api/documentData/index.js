'use strict';

var express = require('express'),
    controller = require('./documentData.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/:documentDataId', auth.isAuthenticated(), controller.find);
router.put('/:documentMetaId', auth.isAuthenticated(), controller.update);

module.exports = router;
