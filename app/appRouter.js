'use strict';

app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        // Now set up the states 
        $stateProvider
            .state('lala', {
                url: "/",
				template: "<div ui-view>Hallo! Please login first</div> "	,
				controller: 'lalaController'								
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
            .state('lala.userInfo', {
                url: "userInfo",
                templateUrl: "app/users/views/userInfoView.html",
                controller: 'userInfoController'                
            })
            ;						
		}]);


						

