'use strict';

var _ = require('lodash'),
    DocumentMeta = require('./documentMeta.model'),
    DocumentData = require('../documentData/documentData.model'),
    User = require('../user/user.model'),
    handleError = function(res, err) {
        return res.send(500, err);
    };

exports.index = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        DocumentMeta.find({projectId: user.activeProject}, function(err, documentMeta) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, documentMeta);
        });
    });
};

exports.create = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }

        req.body.projectId = user.activeProject;

        DocumentMeta.create(req.body, function(err, documentMeta) {
            if (err) {
                return handleError(res, err);
            }


            var newDocumentData = {};
            newDocumentData.documentId = documentMeta._id;

            DocumentData.create(newDocumentData, function(err, documentData) {
                if (err) {
                    return handleError(res, err);
                }

                return res.json(201, documentData);
            });
        });
    });
};

exports.update = function(req, res) {
    DocumentMeta.findById(req.params.documentMetaId, function(err, documentMeta) {
        if (err) {
            return handleError(res, err);
        }

        if(req.body._id) {
            delete req.body.id;
        }

        if(!documentMeta) {
            return res.send(404);
        }

        var updated = _.merge(documentMeta, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, updated);
        });
    });
};

exports.destroy = function(req, res) {
    DocumentMeta.findById(req.params.documentMetaId, function(err, documentMeta) {
        if (err) {
            return handleError(res, err);
        }

        if (!documentMeta) {
            return res.send(404);
        }

        DocumentData.find({documentId: documentMeta._id}, function(err, documentData) {
            if (err) {
                return handleError(res, err);
            }

            documentMeta.remove(function(err) {
                if (err) {
                    return handleError(res, err);
                }

                documentData.remove(function(err) {
                    if (err) {
                        return handleError(res, err);
                    }

                    return res.send(204);
                });
            });
        });
    });
};
