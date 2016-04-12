(function (ng) {
	'use strict';

	ng.module('PanaceaReports', [
		'gettext',
		'widgetUserModule',
		'dbdDashboardModule',
		'dbdDetailViewModule',
		'dbdGridViewModule',
		'dbdMenuModule',
		'polyphemusModule',
		'ui.router',
		'settingsModule',
		'LocalStorageModule',
		'ui.bootstrap',
		'ngResource',
		'ngRoute',
		'checklist-model'
	]);
})(angular);