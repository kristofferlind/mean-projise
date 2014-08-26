ddescribe('Service: DocumentManager', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    beforeEach(module('uiRouterMock'));

    var DocumentManager, $httpBackend,
        doc = 'document',
        docs = ['document1', 'document2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_DocumentManager_, _$httpBackend_) {
        DocumentManager = _DocumentManager_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/documentsMeta').respond(docs);
    }));

    it('should be defined', function() {
        expect(DocumentManager).toBeDefined();
    });

    it('should fetch documents on load', function() {
        $httpBackend.flush();
        expect(DocumentManager.all).toEqual(docs);
    });
});
