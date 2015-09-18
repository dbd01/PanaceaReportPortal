'use strict';

app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            .state('lala', {
                url: "/",
				template: "<div ui-view></div> "	,
				controller: 'lalaController'								
                 })
			.state('lala.login', {
                url: "login",
                templateUrl: "app/auth/views/loginView.html",
				controller: 'authenticationController'                
                  })
			.state('lala.register', {
                url: "register",
                templateUrl: "app/auth/views/registerView.html",
                controller: 'registrationController'                
            });						
		}]);
						

