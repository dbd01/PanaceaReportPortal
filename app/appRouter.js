'use strict';

//angular.module('PanaceaReports', ['ui.router'])
app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            .state('lala', {
                url: "/",
								templateUrl: "app/layout/views/sidebarView.html"							
            })
						.state('lala.login', {
                url: "login",
                templateUrl: "app/auth/views/loginView.html",
                controller: 'authenticationController'                
            })
						.state('lala.register', {
                url: "register",
                templateUrl: "app/auth/views/registerView.html",
                controller: 'registerController'                
            });						
		}]);
						

