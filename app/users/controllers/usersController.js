(function(){
"use strict";

  angular.module('PanaceaReports').controller("usersController", usersController);
  usersController.$inject= ['localStorageService', 'usersService', '$scope', '$state', '$stateParams', 'exceptionService'];
  function usersController(localStorageService, usersService , $scope, $state, $stateParams, exceptionService) {
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

    if ($state.includes('users.deletedUsers'))
      usersTable.mode='deleted';
    else
      usersTable.mode='editable';
    
    usersService.query().$promise.then(
      function (users) {
        populateUsersTable(users, function (){
          configUsersTable(function(){
            $scope.usersTable = usersTable;
          })
        });
      },
      function (error){
        exceptionService.catcher("UsersService query failed")(error);
      });

    function populateUsersTable(users, cb){
      users.forEach(function (user) {
        var userData = [];
        userData.push({"value": user._id, "showIt": true});
        userData.push({"value": user.username, "showIt": true});
        userData.push({"value": user.email, "showIt": true});
        userData.push({"value": user.confirmed, "showIt": true});
        userData.push({"value": user.active, "showIt": true});
        usersTable.data.push(userData);
      });
      cb();
    };

    function configUsersTable(cb){
      usersTable.detailView='userInfo';
      usersTable.entity='user';
      usersTable.entityC='User';
      usersTable.entityCP='Users';
      usersTable.ready = true;
      cb();
    }
  };
})();