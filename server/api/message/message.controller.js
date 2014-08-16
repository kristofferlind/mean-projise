'use strict';

var _ = require('lodash'),
    Message = require('./message.model'),
    User = require('../user/user.model'),
    handleError = function(res, err) {
        return res.send(500, err);
    };

exports.index = function(req, res) {
    Message.find({projectId: req.user.activeProject}, function(err, messages) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, messages);
    });
};

exports.create = function(req, res) {
    req.body.username = req.user.name;
    req.body.projectId = req.user.activeProject;
    req.body.userId = req.user._id;
    Message.create(req.body, function(err, message) {
        if (err) {
            return handleError(res, err);
        }

        return res.json(201, message);
    });
};
