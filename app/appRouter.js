'use strict';

app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            .state('lala', {
                url: "/",
				template: "<div ui-view>Start</div> "	,
				controller: 'lalaController'								
                 })
			.state('lala.login', {
                url: "login",
                templateUrl: "app/auth/views/loginView.html",
				controller: 'authenticationController'                
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
            ;						
		}]);


						

