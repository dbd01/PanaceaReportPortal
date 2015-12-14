'use strict';
 
app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  console.log("appRouter"); 
  $stateProvider
    .state('lala', {
      url: "/",
      template: "<div ui-view>Hallo!</div> ",
      controller: 'lalaController'
    })
    .state('casGetCreds', {
      url: "/:token/:expires/:user",
      template: "Hallo!"  ,
      controller: 'authenticationController'
     })                     
    .state('lala.login', {
      url: "login",
      templateUrl: "app/auth/views/loginView.html",
      controller: 'authenticationController'
    })
    .state('lala.logged_in', {
      url: "welcome",
      templateUrl: "app/auth/views/logged_inView.html"
    })
    .state('lala.logout', {
      url: "login",
      template: "<div> Bye bye </div>",
      controller: 'logoutController'
    })
    .state('lala.register', {
      url: "register",
      templateUrl: "app/auth/views/registerView.html",
      controller: 'registrationController'
    })
    .state('lala.reports', {
      url: "reports",
      templateUrl: "app/reports/views/reportsView.html",
      controller: 'reportsController'
    })
    .state('lala.users', {
      url: "users",
      templateUrl: "app/users/views/usersView.html",
      controller: 'usersController'
    })
    .state('lala.usersDeleted', {
      url: "usersDeleted",
      templateUrl: "app/users/views/usersView.html",
      controller: 'usersController'
    })
    .state('lala.userInfo', {
      url: "userInfo",
      templateUrl: "app/users/views/userInfoView.html",
      controller: 'userInfoController'
    })
    .state('lala.groups', {
      url: "groups",
      templateUrl: "app/groups/views/groupsView.html",
      controller:  'groupsController'
    })
    .state('lala.groupsDeleted', {
      url: "groupsDeleted",
      templateUrl: "app/groups/views/groupsView.html",
      controller:  'groupsController'
    })
    .state('lala.groupInfo', {
      url: "groupInfo",
      templateUrl: "app/groups/views/groupInfoView.html",
      controller:  'groupInfoController'                
    })
    .state('lala.applications', {
      url: "applications",
      templateUrl: "app/applications/views/applicationsView.html",
      controller:  'applicationsController'
    })
    .state('lala.applicationsDeleted', {
      url: "applicationsDeleted",
      templateUrl: "app/applications/views/applicationsView.html",
      controller:  'applicationsController'
    })
    .state('lala.applicationInfo', {
      url: "applicationInfo",
      templateUrl: "app/applications/views/applicationInfoView.html",
      controller:  'applicationInfoController'
    })
    .state('lala.permissions', {
      url: "permissions",
      templateUrl: "app/permissions/views/permissionsView.html",
      controller:  'permissionsController'
    })
    .state('lala.permissionsDeleted', {
      url: "permissionsDeleted",
      templateUrl: "app/permissions/views/permissionsView.html",
      controller:  'permissionsController'
    })
    .state('lala.permissionInfo', {
      url: "permissionInfo",
      templateUrl: "app/permissions/views/permissionInfoView.html",
      controller:  'permissionInfoController'
    })
    .state('lala.requestedPermissions', {
      url: "requestedPermissions",
      templateUrl: "app/requestedPermissions/views/requestedPermissionsView.html",
      controller:  'requestedPermissionsController'
    })
    .state('lala.requestedPermissionInfo', {
      url: "requestedPermissionInfo",
      templateUrl: "app/requestedPermissions/views/requestedPermissionInfoView.html",
      controller:  'requestedPermissionInfoController'
    });
  console.log("appRouter: OK");
}]);
