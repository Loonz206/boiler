'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage'
])

.controller('mainController',function ($scope, $http, $localStorage, $sessionStorage){
	//controller
});

var describe, it, expect;

describe('a simple test', function () {
	it('should run a test on true', function () {
		expect(true).toBe(true);
	});
});