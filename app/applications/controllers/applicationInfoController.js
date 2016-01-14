(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationInfoController", applicationInfoController);

  applicationInfoController.$inject=['$state', 'applicationsService', 'groupsService','$scope', 'scopeComService', '$stateParams', 'exceptionService', '$rootScope'];

  function applicationInfoController($state, applicationsService, groupsService, $scope , scopeComService, $stateParams, exceptionService, $rootScope) {
    var applicationTable ={
      "entity":null,
      "groups": [],
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;
    var newData=scopeComService.list[0]
    scopeComService.flush();

    var customMessages={
      invalidModeError:{
        en:"Non valid mode: "+mode+".",
        el:"Μη έγκυρη κατάσταση φόρμας: "+mode+"."
      },
      removeSuccess:{
        en:"Application "+_id+" deleted.",
        el:"Η εφαρμογή "+_id+" διαγράφηκε."
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
        assignGroups(function(){
          addOne();
        });
      }
    }
    else if (mode.indexOf('update')>-1){
      if (newData){
        assignGroups(function(){
          updateOne();
        });
      }
    }
    else{
      exceptionService.catcher(customMessages.invalidModeError[$rootScope.lang])(error);
    }
    
    function configApplicationTable(groups, cb){
      applicationTable.groups=groups;
      applicationTable.detailView='applicationInfo';
      applicationTable.gridView='applications';
      applicationTable.entityC='Application';
      applicationTable.entityCP='Applications';
      applicationTable.detailViewTemplate='app/applications/views/applicationInfoTemplate.html';
      applicationTable.context='forms';
      applicationTable.ready = true;
      cb();
    };
    function assignGroups(cb){
      var groupzIDz =[];
      for (var i=0; i< newData.groups.length; i++){
        groupzIDz[i] = newData.groups[i]._id; 
      }
      newData.groups=groupzIDz;
      cb();
    };
    function removeOne(){
      applicationsService.remove({ id:_id }).$promise.then(
        function (response){
          console.log(response);
          alert(customMessages.removeSuccess[$rootScope.lang]);
          $state.go('applications.allApplications')
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('ApplicationsService','removeOne'))(error);
        });
    };
    function newOne(){
      applicationTable.entity={
        "_id":'',
        "name":'',
        "description":'',
        "url":'',
        "groups": []
      };
      groupsService.query().$promise.then(
        function (groups){
          configApplicationTable(groups, function(){
            $scope.applicationTable = applicationTable;
          });
        }, 
        function (error){
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('GroupsService','query'))(error);
        });
    };
    function getOne(){
      applicationsService.get({id:_id}).$promise.then(
        function (application){
          applicationTable.entity=application;
          groupsService.query().$promise.then(
            function (groups){
              configApplicationTable(groups, function(){
                $scope.applicationTable = applicationTable;
              });
            },
            function (error){
              exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('GroupsService','query'))(error);
            });
        },
        function (error){
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('ApplicationsService','query'))(error);
        });
    };
    function addOne(){
      applicationsService.save(newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('applications.allApplications');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('ApplicationsService','addOne'))(error);
        });
    };
    function updateOne(){
      applicationsService.update({id: _id }, newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('applications.allApplications');
        },
        function (error) {
          exceptionService.catcher(customMessages.actionFailedError[$rootScope.lang]('ApplicationsService','updateOne'))(error);
        });
    };

  };
})();