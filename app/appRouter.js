"use strict";
var $routeProviderReference;
angular.module('PanaceaReports').config(['$stateProvider', '$urlRouterProvider', 'dbdMenuServiceProvider',  function ($stateProvider, $urlRouterProvider, dbdMenuServiceProvider) {
  /*
  var states=dbdMenuServiceProvider.list;
  //var states=[];
  console.log(states);
  states.forEach(function (state) {
    $stateProvider.state(state.name, state.config);
  });

  $urlRouterProvider.otherwise("/");*/
  $routeProviderReference = $stateProvider;
  $urlRouterProvider.otherwise("/");
}]);