'use strict';

var express = require('express'),
    controller = require('./idea.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:ideaId/up', auth.isAuthenticated(), controller.voteUp);
router.put('/:ideaId/down', auth.isAuthenticated(), controller.voteDown);
router.delete('/:ideaId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
