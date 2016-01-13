(function(){
  "use strict";

  angular.module('widgetUserModule').controller('widgetSelectUserController',['$scope', 'usersService', widgetSelectUserController]);
  
  function widgetSelectUserController($scope, usersService) {
    $scope.isLoaded = false;
    var users=usersService.query(function () {
      $scope.users = users;
      $scope.isLoaded = true;

      for (var i = 0; i < users.length; i++) {
        if (users[i]._id == $scope.item.widgetSettings.id)
          $scope.selectedUser = users[i];
      }
    });
    $scope.saveSettings = function () {
      $scope.item.widgetSettings.id = $scope.selectedUser._id;
      $scope.$parent.userTable.entity = $scope.selectedUser;
      $scope.$close();
    };
  }
})();