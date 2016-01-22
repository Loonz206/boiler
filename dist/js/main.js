'use strict';

var angular, describe, it, expect;

var myApp = angular.module('myApp', [
    'ui.router',
    'ngStorage'
]);


describe('a simple test', function () {
	it('should run a test on true', function () {
		expect(true).toBe(true);
	});
});