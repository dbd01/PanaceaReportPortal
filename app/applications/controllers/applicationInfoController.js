(function(){
  "use strict";

  angular.module('PanaceaReports').controller("applicationInfoController", applicationInfoController);

  applicationInfoController.$inject=['$state', 'applicationsService', 'groupsService','$scope', 'scopeComService', '$stateParams', 'exceptionService'];

  function applicationInfoController($state, applicationsService, groupsService, $scope , scopeComService, $stateParams, exceptionService) {
    var applicationTable ={
      "entity":null,
      "groups": [],
      "ready": false
    };
    var mode=$state.current.name;
    var _id=$stateParams.id;
    var newData=scopeComService.list[0]
    scopeComService.flush();

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
      exceptionService.catcher("Non valid mode: "+mode+".")(error);
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
      applicationsService.remove({ id:_id }).$promise.then(
        function (response){
          console.log(response);
          alert('Application '+_id+" deleted.");
          $state.go('applications.allApplications')
        },
        function (error) {
          exceptionService.catcher("ApplicationsService remove failed")(error);
        });
    }
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
          exceptionService.catcher("GroupsService query failed")(error);
        });
    }
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
              exceptionService.catcher("GroupsService query failed")(error);
            });
        },
        function (error){
          exceptionService.catcher("ApplicationsService query failed")(error);
        });
    }
    function addOne(){
      applicationsService.save(newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('applications.allApplications');
        },
        function (error) {
          exceptionService.catcher("ApplicationsService save failed.")(error);
        });
    }
    function updateOne(){
      applicationsService.update({id: _id }, newData).$promise.then(
        function (response) {
          alert(response.message);
          $state.go('applications.allApplications');
        },
        function (error) {
          exceptionService.catcher("ApplicationsService update failed.")(error);
        });
    }

  };
})();