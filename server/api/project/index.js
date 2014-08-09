'use strict';

var express = require('express');
var controller = require('./project.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.put('/:id/active', auth.isAuthenticated(), controller.activate);
router.put('/:id/users', auth.isAuthenticated(), controller.addUser);
router.put('/:projectId/users/:teamId', auth.isAuthenticated(), controller.addTeam);
router.delete('/:projectId/users/:userId', auth.isAuthenticated(), controller.removeUser);

module.exports = router;
