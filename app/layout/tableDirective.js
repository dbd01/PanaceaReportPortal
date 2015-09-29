app.directive('myTable', ['$timeout', '$log', '$location', 'scopeComService', 'usersService', 
  function ($timeout, $log, $location, scopeComService, usersService) {
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

                        //add user btn
                        $scope.addNewEntity = function(){
                            if($location.path()=="/users"){
                                scopeComService.add("add_new_user");                           
                                $location.path('/userInfo');
                                //$scope.$apply();  
                            
                            }
                        }                         

                      //click edit event
                       // table.on('click', '.edit', function (e2) {
                        $('button[name="edit_entity"]').on('click', function(e2){
                            e2.preventDefault();

                            var nRow =  $('button[name="edit_entity"]').parents('tr')[0];
                            var editline = oTable.fnGetPosition(nRow);
                            
                            //write data to registered service scopeCommService     
                            scopeComService.add($scope.tabledata.data[editline]);
                           
                            $location.path('/userInfo');
                            $scope.$apply();
                        });
                         
                         ///// click delete event
                         $('button[name="remove_entity"]').on('click', function(e){
                            e.preventDefault(); 
                            var nRow2 =  $('button[name="remove_entity"]').parents('tr')[0];
                            var editline2 = oTable.fnGetPosition(nRow2);
                            var entityName = $scope.tabledata.data[editline2][1].value;
                            var _id = $scope.tabledata.data[editline2][0].value;
                            var entity="";

                            if($location.path()=="/users")
                                entity = "user";


                            bootbox.confirm("Are you sure you want to delete " + entity + " " + entityName +" ?", function(ok) {
                               if (ok){
                                  //delete user 
                                  usersService.remove({ userId: _id }, function (response) {          
                
                                    console.log("User has been deleted successfully.");                                    
                                },
                                 function (response) {
                                     console.log($scope.userData);
                                     if (response.data == null){
                                         console.log("response data is null!!!!!");                                          
                                     }
                                     else{
                                       console.log("response ->", response);                                      
                                     }
                                 });
                               }                                
                            }); 
                               
                          }); 
                          //////////////////////                    

                      
                    }, 0);
                }
            })
        }
    }
}]);