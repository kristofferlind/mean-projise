'use strict';

var express = require('express');
var controller = require('./team.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/:id/active', auth.isAuthenticated(), controller.active);
router.put('/:id/active', auth.isAuthenticated(), controller.activate);
router.get('/:id/users', auth.isAuthenticated(), controller.users);
router.put('/:id/users', auth.isAuthenticated(), controller.addUser);

module.exports = router;
