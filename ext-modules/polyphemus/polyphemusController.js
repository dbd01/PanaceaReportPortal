﻿(function(){
  'use strict';

  angular.module("polyphemusModule").controller("polyphemusController",
    ['$scope', 'polyphemusService' , '$rootScope', 'polyphemusCommServiceOut', polyphemusController]);
  
  function polyphemusController($scope, polyphemusService, $rootScope, polyphemusCommServiceOut) {
    $scope.authData = {
      username: $scope.username,
      password: $scope.password,
      application: "polyphemus"
    };
    console.log("polyphemusController : ", $scope.authData);
    $scope.closeAlert = function() {
      $scope.authData.username="";
      $scope.authData.password = "";
      $scope.alert=null;
      //$location.path('/login');
    }
    $scope.login = function () {
      console.log("polyphemusController: login: authData: ", $scope.authData);
      polyphemusService.send($scope.authData, 
        //success
        function (response) {
          //set the token
          console.log("polyphemusController: login: response: ", response);
          console.log("polyphemusController: login: authData: ", $scope.authData);
          var authorizationData={
            token: response.token,
            userName: $scope.authData.username, 
            expires: response.expires
          };
          //$rootScope.authorizationData=authorizationData;
          //$rootScope.$broadcast("authData");
          console.log("polyphemusController: login: $broadcast");
          //$rootscope.broadcast(authorizationData);
          polyphemusCommServiceOut.setValue(authorizationData);
        },
        //error
        function (response) {
          console.log("data..>",$scope.authData);
          if (response.data == null){
            console.log("response data is null!");
            $scope.message = "Server error";
          }
          else{
            console.log("response error: ", response);
            $scope.alert = { 
              type: 'danger', 
              msg: 'Wrong Username or password' 
            };
          }
        }
      );
    };
  };
})();
