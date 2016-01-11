module.exports = function(grunt) {
	grunt.initConfig({
	  nggettext_extract: {
	    pot: {
	      files: {
	        'po/template.pot': ['*.html', 'ext-modules/polyphemus/*.html', 'ext-modules/dbdMenu/*.html']
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