'use strict';

angular.module('PanaceaReports', [])

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            
            .state('login', {
                url: "/login",
                templateUrl: "app/auth/views/loginView.html",
                controller: 'authenticationController',
                
            })
						.state('register', {
                url: "/register",
                templateUrl: "app/auth/views/registerView.html",
                controller: 'registerController',
                
            });						
		}]);
						

