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

  self.assignNotes = function(notes, note) {
    $scope.notes = notes;
    $scope.note = JSON.parse(JSON.stringify(note));
  };

  self.findNoteById = function(noteId) {
    for (var i = 0; i < $scope.notes.length; i++) {
      if ($scope.notes[i].id === noteId) {
        return $scope.notes[i];
      }
    }
  };

  self.cloneNote = function(note) {
    return JSON.parse(JSON.stringify(note));
  };

  $scope.buttonText = function() {
    if ($scope.note.id) {
      return "Update Note";
    }
    else {
      return "Create Note";
    }
  };

  $scope.commit = function() {
    if ($scope.note.id) {
        NotesBackend.putNote($scope.note, self.assignNotes);
    }
    else {
      NotesBackend.postNote($scope.note, self.assignNotes);
    }
  };

  $scope.deleteNote = function() {
    NotesBackend.deleteNote($scope.note, function(notes, note) {
      self.assignNotes(notes,note);
      $scope.clearNote();
    });
  };

  $scope.hasNotes = function() {
    return $scope.notes.length > 0;
  };

  $scope.loadNote = function(note) {
    $scope.note = self.cloneNote(note);
    $scope.$broadcast('noteLoaded');
  };

  $scope.clearNote = function() {
    $scope.note = {};
    $scope.$broadcast('noteCleared');
  };

  NotesBackend.fetchNotes(self.assignNotes);
}]);
