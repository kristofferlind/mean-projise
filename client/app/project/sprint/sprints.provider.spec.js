describe('Service: SprintProvider', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var SprintProvider, $httpBackend,
        sprint = 'sprint',
        sprints = ['sprint1', 'sprint2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_SprintProvider_, _$httpBackend_) {
        SprintProvider = _SprintProvider_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/sprints').respond(sprints);
    }));

    it('should be defined', function() {
        expect(SprintProvider).toBeDefined();
    });

    it('should populate sprints', function() {
        SprintProvider.promise.then(function() {
            expect(SprintProvider.sprints).toEqual(sprints);
        });
    });
});
