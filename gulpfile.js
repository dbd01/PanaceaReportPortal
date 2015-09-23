var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat');

 var js_files =[
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',

    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    
    'app/*.js',        
   	'app/auth/controllers/*.js',
   	'app/layout/*.js',
    'app/reports/controllers/*.js',
    'app/common/*.js',    
    'app/services/*.js'    
 ]   

 var html_css_files =[
     'app/auth/views/*.html',
     'app/layout/views/*.html',
     'app/reports/views/*.html',
     'assets/img/*.*',
     'assets/bootstrap/css/*.*',
     'assets/bootstrap/fonts/*.*',
     'assets/bootstrap/js/*.*'
 ]

 
//javascript  files
gulp.task('js_files', function () {
   return gulp.src(js_files)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('dist'));
});

//views =  html files
gulp.task('html_css_files', function(){  
  gulp.src(html_css_files, { base: './' })
  .pipe(gulp.dest('dist'));
});

gulp.task('rename_index', function() {
    gulp.src("index.min.html")
  		.pipe(rename("index.html"))
  		.pipe(gulp.dest("./dist"));
});

gulp.task('default', ['js_files', 'html_css_files', 'rename_index']);


