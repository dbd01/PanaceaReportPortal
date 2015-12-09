"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope', '$state', 'consoleService',
  function (localStorageService, usersService , $scope, $state, consoleService ) {
    var authData = localStorageService.get('authorizationData');
    consoleService.printIt("auth data--uu>", authData);
    var usersTable ={
      "header": [
        {"title": "_id", "showIt": true },
        {"title": "username", "showIt": true },
        {"title": "email", "showIt": true },
        {"title": "confirmed", "showIt": true },
        {"title": "active", "showIt": true },
      ],
      "data": [],
      "ready": false,
      "mode": ""
    }
    usersService.query().$promise.then(
      function (users) {
        console.log("users:=>",users);
        users.forEach(function (user) {
          var userData = [];
          userData.push({"value": user._id, "showIt": true});
          userData.push({"value": user.username, "showIt": true});
          userData.push({"value": user.email, "showIt": true});
          userData.push({"value": user.confirmed, "showIt": true});
          userData.push({"value": user.active, "showIt": true}); 
          usersTable.data.push(userData);
        });
      })
    .then(function () {
      $scope.usersTable = usersTable;
      $scope.usersTable.ready = true;
      if ($state.includes('lala.usersDeleted'))
        $scope.usersTable.mode='deleted';
      else
        $scope.usersTable.mode='editable';
    });
}]);

