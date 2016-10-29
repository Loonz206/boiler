'use strict';

angular.module('myApp.components.directives.footer', [
//
])

.directive('footerDirective', function factory(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'components/directives/footer/footer.tpl.html'
    };
});
