'use strict';

var _ = require('lodash'),
    DocumentData = require('./documentData.model'),
    User = require('../user/user.model'),
    handleError = function(res, err) {
        return res.send(500, err);
    };

exports.find = function(req, res) {
    DocumentData.findOne({documentId: req.params.documentDataId}, function(err, documentData) {
        if (err) {
            return handleError(res, err);
        }

        return res.json(200, documentData);
    });
};

exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    DocumentData.findById(req.params.documentDataId, function(err, documentData) {
        if (err) {
            return handleError(res, err);
        }

        if (!documentData) {
            return res.send(404);
        }

        documentData.data = req.body.data;

        documentData.save(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(201, documentData);
        });
    });
};
