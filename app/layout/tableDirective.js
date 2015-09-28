app.directive('myTable', ['$timeout', '$log', '$location', 'scopeComService', function ($timeout, $log, $location, scopeComService) {
    return {
        restrict: 'E',
        templateUrl: 'app/layout/views/tableTemplate.html',
        scope: {
            tableid: '@',
            tabletitle: '@',
            tabledata: '=',
            ready: '@',
            tableresult: '=',          
            tableeditable: '=' // it was '@' but didn't work with the views
        },
        link: function ($scope, element, attrs) {
            $scope.$watch('ready', function (newvalue, oldvalue) {
                if (newvalue=="true") {
                    $timeout(function () {
                        if ($scope.tableeditable == "true") 
                            $scope.toolbar_width = "col-md-6";
                        else
                            $scope.toolbar_width = "col-md-12";

                        var table = $('#' + $scope.tableid);
                  
                        var oTable = table.dataTable(); 

                      //click event
                        table.on('click', '.edit', function (e2) {
                            e2.preventDefault();

                            var nRow = $(this).parents('tr')[0];
                            var editline = oTable.fnGetPosition(nRow);
                            
                            //write data to registered service scopeCommService     
                            scopeComService.add($scope.tabledata.data[editline]);
                           
                            $location.path('/userInfo');
                            $scope.$apply();
                        });
                                              

                      
                    }, 0);
                }
            })
        }
    }
}]);