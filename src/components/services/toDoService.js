//toDoService

angular.module('todDoService', [])

.factory('Todos', function ($http) {
	return {
		get: function () {
			return $http.get('/api/toDos/');
		},
		create: function () {
			return $http.post('/api/toDos/');
		},
		delete: function () {
			return $http.delete('/api/toDos/' + id);
		}
	};
});