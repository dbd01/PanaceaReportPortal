﻿(function(){
  "use strict";

  angular.module('widgetUserModule').directive('widgetUser', ['groupsService', 'usersService', widgetUser]);
  
  function widgetUser(groupsService, usersService) {
    return {
      templateUrl: 'app/users/views/userInfoView.html',
      link: function ($scope, el, attrs) {
        var userTable ={
          "entity":null,
          "groups": [],
          "ready": false
        }
        var userId=$scope.item.widgetSettings.id;
        if (userId){
          var user=usersService.get({ "id": userId}, function () {
            var groups=groupsService.query(function(){
              userTable.entity=user;
              userTable.groups=groups;
              $scope.userTable = userTable
              $scope.userTable.detailView='userInfo';
              $scope.userTable.gridView='users';
              $scope.userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
              $scope.userTable.state='view';
              $scope.userTable.context='widget';
              $scope.userTable.ready = true;
            });
          });
        }
        else{
          $scope.userTable = userTable
          $scope.userTable.detailView='userInfo';
          $scope.userTable.gridView='users';
          $scope.userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
          $scope.userTable.state='view';
          $scope.userTable.context='widget';
          $scope.userTable.ready = true;
        }
      }
    };
  }
})();