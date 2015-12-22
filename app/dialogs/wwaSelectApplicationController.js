"use strict";

angular.module('PanaceaReports').controller('wwaSelectApplicationController',
  ['$scope', 'applicationsService',
  function ($scope, applicationsService) {
    $scope.isLoaded = false;
    var applications=applicationsService.query(function () {
      $scope.applications = applications;
      $scope.isLoaded = true;

      for (var i = 0; i < applications.length; i++) {
        if (applications[i]._id == $scope.item.widgetSettings.id)
          $scope.selectedApplication = applications[i];
      }
    });

    $scope.saveSettings = function () {
      $scope.item.widgetSettings.id = $scope.selectedApplication._id;
      $scope.$parent.applicationTable.entity = $scope.selectedApplication;
      $scope.$close();
    };
  }]);