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
                        $.extend(true, $.fn.DataTable.TableTools.classes, {
                            "container": "btn-group tabletools-dropdown-on-portlet",
                            "buttons": {
                                "normal": "btn btn-sm default",
                                "disabled": "btn btn-sm default disabled"
                            },
                            "collection": {
                                "container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"
                            }
                        });

                        var init = {
                            "language": {
                                "aria": {
                                    "sortAscending": ": activate to sort column ascending",
                                    "sortDescending": ": activate to sort column descending"
                                },
                                "emptyTable": "No data available in table!",
                                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                                "infoEmpty": "No entries found",
                                "infoFiltered": "(filtered from _MAX_ total entries)",
                                "lengthMenu": "Show _MENU_ entries",
                                "search": "Search:",
                                "zeroRecords": "No matching records found"
                            },
                            "order": [
                                [0, 'asc']
                            ],
                            "lengthMenu": [
                                [5, 15, 20, -1],
                                [5, 15, 20, "All"]
                            ],
                            "pageLength": 20,

                            "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                           
                            
                        }


                        var oTable = table.dataTable(init);
                                              
                        //////////////////////////////////////////////////////////////
/*
                        table.on('click', '.edit', function (e2) {
                            e2.preventDefault();

                            var nRow = $(this).parents('tr')[0];
                            var editline = oTable.fnGetPosition(nRow);

                            $scope.idT = $scope.tabledata.data[editline][0].value;
                            $scope.domainT = $scope.tabledata.data[editline][1].value;
                            $scope.portT = $scope.tabledata.data[editline][2].value;
                            $scope.visibleT = $scope.tabledata.data[editline][3].value;

                            //write data to registered service scopeCommService     
                            scopeComService.add($scope.idT);
                            scopeComService.add($scope.domainT);
                            scopeComService.add($scope.portT);
                            scopeComService.add($scope.visibleT);
                           
                            //console.log($scope.domainT); console.log($scope.portT); console.log($scope.visibleT);

                            $location.path('/portal/edit');
                            $scope.$apply();
                        });
                                              
*/
                      
                    }, 0);
                }
            })
        }
    }
}]);