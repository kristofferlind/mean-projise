angular.module('projiSeApp').factory('Sprint', function($http, $modal, SprintProvider) {
    'use strict';

    var _sprints = SprintProvider.sprints,
        Sprint = {
            activeSprint: function() {
                var now = new Date().getTime();

                _sprints.forEach(function(sprint) {
                    var start = new Date(sprint.start),
                        end = new Date(sprint.end),
                        found = false;

                    //Set starting time to 00:00:00
                    start.setHours(0);
                    start.setMinutes(0);
                    start.setSeconds(0);

                    //Set ending time to 23:59:59
                    end.setHours(23);
                    end.setMinutes(59);
                    end.setSeconds(59);

                    //Convert dates to ms since 1970
                    start = start.getTime();
                    end = end.getTime();

                    if (now > start && now < end) {
                        found = true;
                        return sprint;
                    }
                });

                //NOTIFY no active sprint,
            },
            all: function() {
                return _sprints;
            },
            create: function() {
                var createModal = $modal.open({
                    templateUrl: 'app/project/sprint/create/create.html',
                    controller: 'sprintCreateController'
                });

                createModal.result.then(function(sprint) {
                    $http.post('/api/sprints', sprint);
                });
            },
            delete: function(sprint) {
                $http.delete('/api/sprints/' + sprint._id);
            },
            // find: function() {},
            update: function(sprint) {
                var editModal = $modal.open({
                    templateUrl: 'app/project/sprint/edit/edit.html',
                    controller: 'sprintEditController',
                    resolve: {
                        sprint: function() {
                            return sprint;
                        }
                    }
                });

                editModal.result.then(function(sprint) {
                    $http.put('/api/sprints/' + sprint._id, sprint);
                });
            }
        };

    return Sprint;
});
