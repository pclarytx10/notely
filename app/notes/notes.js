'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$HteIxwc8DtPD2T86ZKE7Ku9pPPnhlveQstLiCv6mgqh4RyPrk/2Ri';

var noteApp = angular.module('notely.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  });
}]);

noteApp.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {
  var self = this;
  $scope.note = {};
  $scope.notes = [];

  self.assignNotes = function(notes) {
    $scope.notes = notes;
  };

  $scope.hasNotes = function() {
    return $scope.notes.length > 0;
  };

  $scope.commit = function() {
    NotesBackend.postNote($scope.note, self.assignNotes);
  };

  NotesBackend.fetchNotes(self.assignNotes);
}]);
