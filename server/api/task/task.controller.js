'use strict';

var _ = require('lodash'),
    Task = require('./task.model'),
    User = require('../user/user.model'),
    handleError = function(res, err) {
        return res.send(500, err);
    };

exports.index = function(req, res) {
    Task.find({ storyId: req.params.storyId }, function(err, task) {
        if (err) {
            return handleError(res, err);
        }

        return res.json(200, task);
    });
};

exports.create = function(req, res) {
    Task.create(req.body, function(err, task) {
        if (err) {
            return handleError(res, err);
        }

        return res.json(201, task);
    });
};

exports.update = function(req, res) {
    if(req.body._id) {
        delete req.body.id;
    }

    Task.findById(req.params.taskId, function(err, task) {
        if (err) {
            return handleError(res, err);
        }

        var updated = _.merge(task, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, task);
        });
    });
};

exports.destroy = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err) {
            return handleError(res, err);
        }

        if(!task) {
            return res.send(404);
        }

        task.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }

            res.send(204);
        });
    });
};
