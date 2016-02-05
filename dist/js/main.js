'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage'
])

<<<<<<< HEAD
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
	$scope.$storage = $localStorage;
=======
.controller('mainController',function ($scope, $http, $localStorage, $sessionStorage){
	//controller
>>>>>>> 00fcbfd450b1c91e7cd68723e3c2789953b9f833
});

var describe, it, expect;

describe('a simple test', function () {
	it('should run a test on true', function () {
		expect(true).toBe(true);
	});
});