/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function(err, user) {
        Project.find({}).remove(function() {
            Project.create({
                name: 'Project 1',
                description: 'This is a description of the project',
                users: [user._id]
            }, function(err, project) {
                if (err) {
                    console.log(err);
                }
                User.update({
                    _id: user._id
                }, {
                    $push: {
                        projects: project._id
                    }
                }, function(err, data) {})
            })

            Project.create({
                name: 'Project 2',
                description: 'This is a description of the project',
                users: [user._id]
            }, function(err, project) {
                if (err) {
                    console.log(err);
                }
                User.update({
                    _id: user._id
                }, {
                    $push: {
                        projects: project._id
                    }
                }, function(err, data) {})
            })

            Project.create({
                name: 'Project 3',
                description: 'This is a description of the project',
                users: [user._id]
            }, function(err, project) {
                if (err) {
                    console.log(err);
                }
                User.update({
                    _id: user._id
                }, {
                    $push: {
                        projects: project._id
                    }
                }, function(err, data) {})
            })
        })
    });
});
