app.directive('user-info',  function ($scope) {
    return {
        restrict: 'E',
        templateUrl: 'app/layout/views/dropDownTemplate.html',
        scope: { 
            tableid: '@',          
            tabledata: '=',
            ready: '@',
            showIt: '@'          
        },
        link: function ($scope) {
          console.log("eeezzzzzzz", $scope.tabledata.data);  
            $scope.$watch('ready', function (newvalue, oldvalue) {                
                                       
                        var table = $('#' + $scope.tableid);                  
                        var oTable = table.dataTable(); 

                        console.log("eeeeeeeeeeeeeeeee", $scope.tabledata.data);                   
                
            });
        }
    }
});