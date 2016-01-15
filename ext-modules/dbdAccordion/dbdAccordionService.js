(function(){
	"use strict";

	angular.module('dbdAccordionModule').factory('dbdAccordionService', dbdAccordionService);
	dbdAccordionService.$inject= ['$q', '$timeout'];
	function dbdAccordionService($q, $timeout) {
	      var deferred = $q.defer();
	      var data = [{
	        title: 'Section 1',
	        data: 'Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum        a velit eu ante scelerisque vulputate.'
	      }, {
	        title: 'Section 2',
	        data: 'Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum        a velit eu ante scelerisque vulputate.'
	      }];

	      $timeout(function() {
	        deferred.resolve(data);
	      }, 1000);

	      return deferred.promise;
	};
})();