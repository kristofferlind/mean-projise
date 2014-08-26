describe('Filter: lineBreak', function () {
    'use strict';

    var $filter;

    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    beforeEach(function () {
        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should replace linky lineBreak with html lineBreak', function () {
        var string = 'test&#10;message', result;

        result = $filter('lineBreak')(string);

        expect(result).toEqual('test<br />message');
    });
});
