/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/teams', require('./api/team'));
    app.use('/api/projects', require('./api/project'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/sprints', require('./api/sprint'));
    app.use('/api/stories', require('./api/story'));
    app.use('/api/tasks', require('./api/task'));
    app.use('/api/ideas', require('./api/idea'));
    app.use('/api/documentsMeta', require('./api/documentMeta'));
    app.use('/api/documentsData', require('./api/documentData'));
    app.use('/api/messages', require('./api/message'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
