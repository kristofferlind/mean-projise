'use strict';

var express = require('express'),
    controller = require('./task.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/:storyId', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:taskId', auth.isAuthenticated(), controller.update);
router.patch('/:taskId', auth.isAuthenticated(), controller.update);
router.delete('/:taskId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
