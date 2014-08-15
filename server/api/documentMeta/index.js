'use strict';

var express = require('express'),
    controller = require('./documentMeta.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:documentMetaId', auth.isAuthenticated(), controller.update);
router.delete('/:documentMetaId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
