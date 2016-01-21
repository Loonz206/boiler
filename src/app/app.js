'use strict';
var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage',
    'ngRoute'
])

.config('', function ($stateProvider,$urlRouterProvider) {
    //This is the config
})

.controller('MainController', function MainController ($scope, $localStorage, $sessionStorage) {
    //This is where the controller goes.
    $scope.$storage = $localStorage;
    $scope.$sessionStorage = $sessionStorage;
});