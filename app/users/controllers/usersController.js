"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope', '$state', '$stateParams',
  function (localStorageService, usersService , $scope, $state, $stateParams) {
    console.log("usersController");
    var usersTable ={
      "header": [
        {"title": {en:"Id", el:"Αναγνωριστικό"}, "showIt": true },
        {"title": {en:"Username", el:"Όνομα χρήστη"}, "showIt": true },
        {"title": {en: "Email", el: "Ηλεκτρονική διεύθυνση"}, "showIt": true },
        {"title": {en: "Confirmed", el: "Επιβεβαιωμένος"}, "showIt": true },
        {"title": {en: "Active", el: "Ενεργός"}, "showIt": true },
      ],
      "headers": [
        {"title": "", "showIt": true },
        {"title": "", "showIt": true },
        {"title": "", "showIt": true },
        {"title": "", "showIt": true },
        {"title": "", "showIt": true },
      ],
      "data": [],
      "ready": false
    }
    usersService.query().$promise.then(
      function (users) {
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
      if ($state.includes('users.deletedUsers'))
        $scope.usersTable.mode='deleted';
      else
        $scope.usersTable.mode='editable';
      $scope.usersTable.detailView='userInfo';
      $scope.usersTable.entity='user';
      $scope.usersTable.entityC='User';
      $scope.usersTable.entityCP='Users';
    });
}]);

