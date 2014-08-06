/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /projects              ->  index
 * POST    /projects              ->  create
 * GET     /projects/:id          ->  show
 * PUT     /projects/:id          ->  update
 * DELETE  /projects/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');
var Project = require('./project.model');
var User = require('../user/user.model');

var handleError = function(res, err) {
    return res.send(500, err);
}

// Get list of projects
exports.index = function(req, res) {
    User.findById(req.user._id).populate('projects').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, user.projects);
    })
};

// Get a single project
exports.show = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            return handleError(res, err);
        }
        if (!project) {
            return res.send(404);
        }
        return res.json(project);
    });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
    Project.create(req.body, function(err, project) {
        if (err) {
            return handleError(res, err);
        }

        var userId = req.user._id;

        User.findById(userId, function(err, user) {
            if (err) {
                return handleError(res, err);
            }

            user.projects.push(project._id);
            user.save()
        })

        return res.json(201, project);
    });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            return handleError(res, err);
        }
        if (!project) {
            return res.send(404);
        }
        var updated = _.merge(project, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, project);
        });
    });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            return handleError(res, err);
        }
        if (!project) {
            return res.send(404);
        }
        project.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};
