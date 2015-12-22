"use strict";

angular.module('PanaceaReports').directive('wwaUser', 
  ['groupsService','usersService',
  function (groupsService, usersService) {
    return {
      templateUrl: 'app/users/views/userInfoView.html',
      link: function ($scope, el, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          console.log("ready: ", newvalue);
          if(newvalue==true){
            var userTable ={
              "entity":null,
              "groups": [],
              "ready": false
            }
            var user=usersService.getOne({ "userId": $scope.item.widgetSettings.id}, function () {
              var groups=groupsService.query(function(){
                userTable.entity=user;
                userTable.groups=groups;
                $scope.userTable = userTable
                $scope.userTable.detailView='userInfo';
                $scope.userTable.gridView='users';
                $scope.userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
                $scope.userTable.state='view';
                $scope.userTable.ready = true;
              });
            });
          }
        });
      }
    };
  }]);