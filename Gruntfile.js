module.exports = function(grunt) {
	grunt.initConfig({
	  nggettext_extract: {
	    pot: {
	      files: {
	        'po/template.pot': ['*.html',
	        'app/applications/views/*.html',
	        'app/auth/views/*.html',
	        'app/groups/views/*.html',
	        'app/permissions/views/*.html',
	        'app/reports/views/*.html',
	        'app/requestedPermissions/views/*.html',
	        'app/users/views/*.html',
	        'ext-modules/polyphemus/*.html', 
	        'ext-modules/dbdMenu/*.html', 
	        'ext-modules/dbdDashboard/*.html',
	        'ext-modules/dbdGridView/*.html', 
	        'ext-modules/widgets/widgetUser/dialogs/*.html']
	      }
	    },
	  },
	  nggettext_compile: {
	    all: {
	      files: {
	        'app/translations.js': ['po/*.po']
	      }
	    },
	  },
	});
	grunt.loadNpmTasks('grunt-angular-gettext');
	grunt.registerTask('default', ['nggettext_compile']);
}