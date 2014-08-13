/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sprints              ->  index
 * POST    /sprints              ->  create
 * PUT     /sprints/:id          ->  update
 * DELETE  /sprints/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');
var Story = require('./story.model');
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

        Story.find({ projectId: user.activeProject}, function(err, story) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, story);
        });

    });
};

exports.sprintIndex = function(req, res) {
    Story.find({ sprintId: req.params.sprintId}, function(err, story) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, story);
    });

};

// Creates a new project in the DB.
exports.create = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        req.body.projectId = user.activeProject;

        Story.create(req.body, function(err, story) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(201, story);
        });
    });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Story.findById(req.params.storyId, function(err, story) {
        if (err) {
            return handleError(res, err);
        }
        if (!story) {
            return res.send(404);
        }

        story.sprintId = undefined;
        story.userId = undefined;

        var updated = _.merge(story, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, story);
        });
    });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
    Story.findById(req.params.storyId, function(err, story) {
        if (err) {
            return handleError(res, err);
        }
        if (!story) {
            return res.send(404);
        }
        story.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};
