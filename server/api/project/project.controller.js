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
var Team = require('../team/team.model');

var handleError = function(res, err) {
    return res.send(500, err);
}

// Get list of projects
exports.index = function(req, res) {
    User.findById(req.user._id).populate('projects').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        var populateQuery = [{path: 'users', select: '-salt -hashedPassword'}]

        User.populate(user.projects, populateQuery, function(err, projects) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, projects);
        });
    });
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
        delete req.body.users;
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

exports.activate = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.set('activeProject', req.params.id);
        user.save();

        return res.send(204);
    })
};

exports.addUser = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, newUser) {
        if (err) {
            return handleError(res, err);
        }
        User.findById(req.user._id, function(err, user) {
            if (err) {
                return handleError(res, err);
            }
            Project.findById(user.activeProject, function(err, project) {
                if (err) {
                    return handleError(res, err);
                }
                console.log(project.users);
                project.users.addToSet(newUser._id);
                project.save(function(err, _project) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(_project);
                    newUser.projects.addToSet(_project._id);
                    newUser.save(function(err, user) {
                        if (err) {
                            console.log(err);
                        }

                        return res.send(201, project.users);
                    });
                });
            });
        });
    });
};
exports.addTeam = function(req, res) {
    Team.findById(req.params.teamId, function(err, team) {
        Project.findById(req.params.projectId, function(err, project) {

            team.users.forEach(function(element, index, array) {
                project.users.addToSet(element);
            });

            project.save();

            team.users.forEach(function(element, index, array) {
                User.findById(element, function(err, user) {
                    user.projects.addToSet(project._id);
                    user.save();
                })
                return res.send(201, project.users);
            })
        })
    })
};
exports.removeUser = function(req, res) {
    Project.findById(req.params.projectId, function(err, project) {
        project.users.pull(req.params.userId);
        project.save();
        User.findById(req.params.userId, function(err, user) {
            user.projects.pull(req.params.projectId);
            user.save();
            return res.send(204);
        });
    });
};
