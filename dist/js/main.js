'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage'
])

.controller('mainController',function ($scope, $localStorage, $sessionStorage){
	$scope.save = function () {
		$localStorage.message = "Hello World";
	};

	$scope.load = function () {
		$localStorage.data = $localStorage.message;
	};

	$scope.sessionsave = function () {
		$sessionStorage.message = "Hello World";
	};

	$scope.sessionload = function () {
		$sessionStorage.data = $sessionStorage.message;
	};
});

var describe, it, expect;

describe('a simple test', function () {
	it('should run a test on true', function () {
		expect(true).toBe(true);
	});
});