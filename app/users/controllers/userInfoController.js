(function(){
"use strict";

  angular.module('PanaceaReports').controller("userInfoController", userInfoController);
  userInfoController.$inject= ['$state', 'usersService', 'groupsService', '$scope','scopeComService', '$timeout', '$stateParams', 'exceptionService', '$rootScope'];
  function userInfoController($state, usersService, groupsService, $scope, scopeComService, $timeout, $stateParams, exceptionService, $rootScope ) {
    var userTable ={
      "entity":null,
      "groups": [],
      "ready": false
    }
    var mode=$state.current.name;
    var _id=$stateParams.id;//scopeComService.list[0];
    var newData=scopeComService.list[0];
    scopeComService.flush();
    
    var customMessages={
      invalidModeError:{
        en:"Non valid mode: "+mode+".",
        el:"Μη έγκυρη κατάσταση φόρμας: "+mode+"."
      },
      removeSuccess:{
        en:"User "+_id+" deleted.",
        el:"Ο χρήστης "+_id+" διαγράφηκε."
      },
      actionFailedError:{
        en:function(serviceName, actionName){
          return serviceName+" failed on action: "+actionName+".";
        },
        el:function(serviceName, actionName){
          return "H υπηρεσία "+ serviceName+" απέτυχε να εκτελέσει τη δράση: "+actionName+".";
        },
      }
    }

    if (mode.indexOf('remove')>-1){
      removeOne();
    }
    else if (mode.indexOf('new')>-1){
      newOne();
    }
    else if (mode.indexOf('edit')>-1 || mode.indexOf('view')>-1 || mode.indexOf('deleted')>-1){
      getOne();
    }
    else if (mode.indexOf('add')>-1){
      if (newData){
        newData.password=newData.hashedPassword;
        assignGroups(function(){
          addOne();
        });
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        assignGroups(function(){
          updatePartiallyOne();
        });
      }
    }
    else{
      exceptionService.catcher(customMessages.invalidModeError[$rootScope.lang])(error);
    }

    function configUserTable(groups, cb){
      userTable.groups=groups;
      userTable.detailView='userInfo';
      userTable.gridView='users';
      userTable.entityC='User';
      userTable.entityCP='Users';
      userTable.detailViewTemplate='app/users/views/userInfoTemplate.html';
      userTable.context='forms';
      userTable.ready = true;
      cb();
    }
    function assignGroups(cb){
      var groupzIDz =[];
      for (var i=0; i< newData.groups.length; i++){
        groupzIDz[i] = newData.groups[i]._id; 
      }
      newData.groups=groupzIDz;
      cb();
    }
    function removeOne(){
      usersService.remove({ id:_id }).$promise.then(
        function (response){
          console.log(response);
          alert(customMessages.removeSuccess[$rootScope.lang]);
          $state.go('users.allUsers')
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('UsersService','removeOne'))(error);
        });
    }
    function newOne(){
      userTable.entity={
        "_id":'',
        "username":'',
        "email":'',
        "confirmed":'',
        "active":'',
        "groups": []
      };
      groupsService.query().$promise.then(
        function (groups){
          configUserTable(groups, function(){
            $scope.userTable = userTable;
          });
        }, 
        function (error){
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('GroupsService','query'))(error);
        });
    }
    function getOne(){
      usersService.get({id:_id}).$promise.then(
        function (user){
          userTable.entity=user;
          groupsService.query().$promise.then(
            function (groups){
              configUserTable(groups, function(){
                $scope.userTable = userTable;
              });
            },
            function (error){
              exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('GroupsService','query'))(error);
            });
        },
        function (error){
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('UsersService','query'))(error);
        });
    }
    function addOne(){
      usersService.save(newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('users.allUsers');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('UsersService','addOne'))(error);
        });
    }
    function updatePartiallyOne(){
      usersService.partialUpdate({id: _id }, newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('users.allUsers');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('UsersService','updateOne'))(error);
        });
    }
  };
})();