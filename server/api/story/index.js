'use strict';

var express = require('express');
var controller = require('./story.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);                            //backlog
router.get('/:sprintId', auth.isAuthenticated(), controller.sprintIndex);             //sprint backlog
router.post('/', auth.isAuthenticated(), controller.create);                          //create story
router.put('/:storyId', auth.isAuthenticated(), controller.update);
router.patch('/:storyId', auth.isAuthenticated(), controller.update);
router.delete('/:storyId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
