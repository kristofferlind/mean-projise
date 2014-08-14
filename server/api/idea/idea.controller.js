'use strict';

var _ = require('lodash'),
    Idea = require('./idea.model'),
    User = require('../user/user.model'),
    handleError = function(res, err) {
        return res.send(500, err);
    };

exports.index = function(req, res) {
    User.find({_id: req.user._id}, function(err, user) {
        if (err) {
            handleError(res, err);
        }

        Idea.find({projectId: user.activeProject}, function(err, idea) {
            if (err) {
                handleError(res, err);
            }

            return res.json(200, idea);
        })
    })
};
exports.create = function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
        if (err) {
            handleError(res, err);
        }

        req.body.projetId = user.activeProject;
        req.body.usersUp = [user._id];
        req.body.usersDown = [user._id];
        req.body.score = 0;

        Idea.create(req.body, function(err, idea) {
            console.error(err);
            if (err) {
                handleError(res, err);
            }

            return res.json(201, idea);
        });
    });
};
exports.voteUp = function(req, res) {
    Idea.findById(req.params.ideaId, function(err, idea) {
        if (err) {
            handleError(res, err);
        }

        idea.usersDown.pull(req.user._id);
        idea.usersUp.addToSet(req.user._id);

        idea.score = idea.usersUp.length - idea.usersDown.length;

        idea.save(function(err, idea) {
            if (err) {
                handleError(res, err);
            }

            return res.json(201, idea);
        });
    });
};
exports.voteDown = function(req, res) {
    Idea.findById(req.params.ideaId, function(err, idea) {
        if (err) {
            handleError(res, err);
        }

        idea.usersUp.pull(req.user._id);
        idea.usersDown.addToSet(req.user._id);

        idea.score = idea.usersUp.length - idea.usersDown.length;


        console.log(idea.score);

        idea.save(function(err, idea) {
            if (err) {
                handleError(res, err);
            }

            return res.json(201, idea);
        });
    });
};

exports.destroy = function(req, res) {
    Idea.findById(req.params.ideaId, function(err, idea) {
        if (err) {
            handleError(res, err);
        }

        if (!idea) {
            return res.send(404);
        }

        idea.remove(function(err) {
            if (err) {
                handleError(res, err);
            }

            res.send(204);
        });
    });
};
