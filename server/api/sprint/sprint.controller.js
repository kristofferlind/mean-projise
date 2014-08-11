/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sprints              ->  index
 * POST    /sprints              ->  create
 * PUT     /sprints/:id          ->  update
 * DELETE  /sprints/:id          ->  destroy
 */

'use strict';
// var _ = require('lodash');
var Sprint = require('./sprint.model');
var User = require('../user/user.model');
var handleError = function(res, err) {
    return res.send(500, err);
}

// Get list of projects
exports.index = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        Sprint.find({projectId: user.activeProject}, function(err, sprints) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, sprints);
        })
    });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        req.body.projectId = user.activeProject;

        Sprint.create(req.body, function(err, sprint) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(201, sprint);
        });
    });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Sprint.findById(req.params.id, function(err, sprint) {
        if (err) {
            return handleError(res, err);
        }
        if (!sprint) {
            return res.send(404);
        }

        var updated = _.merge(sprint, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, sprint);
        });
    });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
    Sprint.findById(req.params.id, function(err, sprint) {
        if (err) {
            return handleError(res, err);
        }
        if (!sprint) {
            return res.send(404);
        }
        sprint.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};
