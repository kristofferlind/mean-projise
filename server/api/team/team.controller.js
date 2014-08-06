/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /teams              ->  index
 * POST    /teams              ->  create
 * GET     /teams/:id          ->  show
 * PUT     /teams/:id          ->  update
 * DELETE  /teams/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');
var Team = require('./team.model');
var User = require('../user/user.model');

var handleError = function(res, err) {
    return res.send(500, err);
}

// Get list of teams
exports.index = function(req, res) {
    User.findById(req.user._id).populate('teams').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, user.teams);
    })
};

// Get a single team
exports.show = function(req, res) {
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        return res.json(team);
    });
};

// Creates a new team in the DB.
exports.create = function(req, res) {
    Team.create(req.body, function(err, team) {
        if (err) {
            return handleError(res, err);
        }

        var userId = req.user._id;


        User.findById(userId, function(err, user) {
            if (err) {
                return handleError(res, err);
            }

            user.teams.push(team._id);
            user.save()
        })

        return res.json(201, team);
    });
};

// Updates an existing team in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        var updated = _.merge(team, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, team);
        });
    });
};

// Deletes a team from the DB.
exports.destroy = function(req, res) {
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        team.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

exports.active = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, user.activeTeam);
    });
};

exports.activate = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        user.set('activeTeam', req.body._id);
        user.save();

        return res.json(204, user.activeTeam);
    });
};

exports.users = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        Team.findById(user.activeTeam).populate('users').exec(function(err, team) {
            if (err) {
                return handleError(res, err);
            }
            if (!team) {
                return res.send(404);
            }
            return res.json(200, team.users)
        });
    });
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
            Team.findById(user.activeTeam, function(err, team) {
                if (err) {
                    return handleError(res, err);
                }

                team.users.push(newUser._id);
                team.save(function(err, _team) {
                    if (err) {
                        console.log(err);
                    }

                    newUser.teams.push(_team._id);
                    newUser.save(function(err, user) {
                        if (err) {
                            console.log(err);
                        }

                        return res.send(201, team.users);
                    });
                });
            });
        });
    });
};
