angular.module('projiSeApp').factory('Idea', function($http, $modal, socket) {
    'use strict';

    $http.get('/api/ideas/').success(function(ideas) {
        Idea.all = angular.copy(ideas);
        socket.syncUpdates('idea', Idea.all);
    });

    var Idea = {
        all: [],
        create: function() {
            var createModal = $modal.open({
                templateUrl: 'app/project/idea/create/create.html',
                controller: 'ideaCreateController'
            });

            createModal.result.then(function(idea) {
                $http.post('/api/ideas', idea);
            });
        },
        delete: function(idea) {
            $http.delete('/api/ideas/' + idea._id);
        },
        voteUp: function(idea) {
            $http.put('/api/ideas/' + idea._id + '/up');
        },
        voteDown: function(idea) {
            $http.put('/api/ideas/' + idea._id + '/down');
        }
    };

    return Idea;
});
