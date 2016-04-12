(function(){
"use strict";

  angular.module('PanaceaReports').controller("usersController", usersController);
  usersController.$inject= ['localStorageService', 'usersService', '$scope', '$state', '$stateParams', 'exceptionService', '$rootScope'];
  function usersController(localStorageService, usersService , $scope, $state, $stateParams, exceptionService, $rootScope) {
    var customMessages={
      actionFailedError:{
        en:function(serviceName, actionName){
          return serviceName+" failed on action: "+actionName+".";
        },
        el:function(serviceName, actionName){
          return "H υπηρεσία "+ serviceName+" απέτυχε να εκτελέσει τη δράση: "+actionName+".";
        },
      }
    };

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
    };
    
    usersService.query().$promise.then(
      function (users) {
        populateUsersTable(users, function (){
          configUsersTable(function(){
            $scope.usersTable = usersTable;
          });
        });
      },
      function (error){
        exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]("UsersService", "query"))(error);
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
    }

    function configUsersTable(cb){
      if ($state.includes('users.deletedUsers'))
        usersTable.mode='deleted';
      else
        usersTable.mode='editable';
      usersTable.detailView='userInfo';
      usersTable.entity='user';
      usersTable.entityC='User';
      usersTable.entityCP='Users';
      usersTable.ready = true;
      cb();
    }
  }
})();