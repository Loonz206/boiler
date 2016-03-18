'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	$urlRouterProvider.otherwise("/home");
	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "index.html"
		});

	//Needed this to remove the # in the urls
	$locationProvider.html5Mode(true);
})

.run( function run () {
})

.controller('MainController', function ($scope, $http, $localStorage, $sessionStorage){
	$http.get('js/data.json').success(function (data) {
		$scope.data = data;
	});
	$scope.$storage = $localStorage;
	$scope.$sessionStorage = $sessionStorage;
});

var describe, it, expect;

describe('a simple test', function () {
	it('should run a test on true', function () {
		expect(true).toBe(true);
	});
});