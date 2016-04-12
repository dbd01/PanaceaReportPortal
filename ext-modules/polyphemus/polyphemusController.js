(function(){
  'use strict';

  angular.module("polyphemusModule").controller("polyphemusController", polyphemusController);
  polyphemusController.$inject= ['$scope', 'polyphemusService' , '$rootScope'];
  
  function polyphemusController($scope, polyphemusService, $rootScope) {
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
          console.log("polyphemusController: login: $broadcast");
          $rootScope.authData = authorizationData;
        },
        //error
        function (error) {
          if (error.data == null){
            console.log("response data is null!");
            $scope.message = "Server error";
          }
          else{
            console.log("response error: ", error);
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
