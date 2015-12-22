"use strict";

angular.module('PanaceaReports').directive('wwaApplication', 
  ['groupsService','applicationsService',
  function (groupsService, applicationsService) {
    return {
      templateUrl: 'app/applications/views/applicationInfoView.html',
      link: function ($scope, el, attrs) {
        var applicationTable ={
          "entity":null,
          "groups": [],
          "ready": false
        }
        var applicationId=$scope.item.widgetSettings.id;
        if (applicationId){
          var application=applicationsService.getOne({ "applicationId": applicationId}, function () {
            var groups=groupsService.query(function(){
              applicationTable.entity=application;
              applicationTable.groups=groups;
              $scope.applicationTable = applicationTable;
              $scope.applicationTable.detailView='applicationInfo';
              $scope.applicationTable.gridView='applications';
              $scope.applicationTable.detailViewTemplate='app/applications/views/applicationInfoTemplate.html';
              $scope.applicationTable.state='view';
              $scope.applicationTable.context='widget';
              $scope.applicationTable.ready = true;
            });
          });
        }
        else{
          $scope.applicationTable = applicationTable
          $scope.applicationTable.detailView='applicationInfo';
          $scope.applicationTable.gridView='applications';
          $scope.applicationTable.detailViewTemplate='app/applications/views/applicationInfoTemplate.html';
          $scope.applicationTable.state='view';
          $scope.applicationTable.context='widget';
          $scope.applicationTable.ready = true;
        }
      }
    };
  }]);