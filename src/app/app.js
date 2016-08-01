'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $compileProvider ) {

	$compileProvider.debugInfoEnabled(false);
	$urlRouterProvider.otherwise("/home");
	$stateProvider
		.state('home', {
	      url: "/home",
	      templateUrl: "app/home/home.tpl.html"
	    })
	    .state('about', {
	      url: "/about",
	      templateUrl: "app/about/about.tpl.html"
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
