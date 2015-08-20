'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
var api_key = '$2a$10$HteIxwc8DtPD2T86ZKE7Ku9pPPnhlveQstLiCv6mgqh4RyPrk/2Ri';

angular.module('notely.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', ['$scope', '$http', function($scope, $http) {
  $http.get(nevernoteBasePath + 'notes?api_key=' + api_key)
  .success(function(notesData) {
    $scope.notes = notesData;
  });
}]);
