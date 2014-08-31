describe('Service: StoryProvider', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var StoryProvider, $httpBackend,
        stories = ['story1', 'story2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_StoryProvider_, _$httpBackend_) {
        StoryProvider = _StoryProvider_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/stories').respond(stories);
    }));

    it('should be defined', function() {
        expect(StoryProvider).toBeDefined();
    });

    it('should populate backlog', function() {
        StoryProvider.promiseBacklog.then(function() {
            expect(StoryProvider.stories).toEqual(stories);
        });
    });
});
