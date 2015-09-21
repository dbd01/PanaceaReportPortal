var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

 var js_files =[
    'app/*.js',
   	'app/auth/controllers/*.js',
   	'app/layout/*.js',
    'app/reports/controllers/*.js' 
 ]   

 var html_css_files =[
     'index.html',
     'app/auth/views/*.html',
     'app/layout/views/*.html',
     'app/reports/views/*.html',
     'assets/img/*.*',
     'assets/bootstrap/css/*.*',
     'assets/bootstrap/fonts/*.*',
     'assets/bootstrap/js/*.*'
 ]

 
//javascript files
gulp.task('js_files', function () {
   return gulp.src(js_files)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('dist'));
});

//views = html files
gulp.task('html_css_files', function(){  
  gulp.src(html_css_files, { base: './' })
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js_files', 'html_css_files']);


