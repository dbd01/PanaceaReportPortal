'use strict';

angular.module('PanaceaReports', [])

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            
						state('dashboard', {
                url: "/dashboard",
                templateUrl: "welcome"              
            })
            .state('dashboard.login', {
                url: "/dashboard/login",
                templateUrl: "app/auth/views/loginView.html",
                controller: 'authenticationController',
                
            })
						.state('dashboard.register', {
                url: "/dashboard/register",
                templateUrl: "app/auth/views/registerView.html",
                controller: 'registerController',
                
            });						
		}]);
						

