angular.module('myApp.modules.directives.footer', [
//
])

.directive('footerDirective', function factory(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'modules/directives/footer/footer.tpl.html'
    };
});
