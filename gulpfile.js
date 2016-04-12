var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    del = require('del'),
    concat = require('gulp-concat');

 var js_lib_files =[
    'bower_components/jquery/dist/jquery.js',    
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/lodash/lodash.js',
    'bower_components/jquery/dist/jquery.js',    
    'bower_components/datatables/media/js/jquery.dataTables.js',
    'bower_components/datatables/media/js/dataTables.bootstrap.js',
    'bower_components/angular-datatables/dist/angular-datatables.js',    
    'bower_components/datatables-tabletools/js/dataTables.tableTools.js',
    'bower_components/bootbox/bootbox.js',
    'bower_components/checklist-model/checklist-model.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-gettext/dist/angular-gettext.min.js',
    'bower_components/angular-gridster/dist/angular-gridster.min.js',
    'ext-modules/widgets/widgetUser/widgetUserModule.js',
    'ext-modules/widgets/widgetUser/widgetUserDirective.js',
    'ext-modules/widgets/widgetUser/dialogs/widgetSelectUserController.js',
    'ext-modules/dbdDashboard/dbdDashboardModule.js',
    'ext-modules/dbdDashboard/dbdDashboardDirective.js',
    'ext-modules/dbdDashboard/dbdWidgetBodyDirective.js',
    'ext-modules/dbdDetailView/dbdDetailViewModule.js',
    'ext-modules/dbdDetailView/dbdDetailViewDirective.js',
    'ext-modules/dbdGridView/dbdGridViewModule.js',
    'ext-modules/dbdGridView/dbdGridViewCommServiceIn.js',
    'ext-modules/dbdGridView/dbdGridViewController.js',
    'ext-modules/dbdGridView/dbdGridViewDirective.js',
    'ext-modules/dbdMenu/dbdMenuModule.js',
    'ext-modules/dbdMenu/dbdMenuCommServiceIn.js',
    'ext-modules/dbdMenu/dbdMenuController.js',
    'ext-modules/dbdMenu/dbdMenuDirective.js',
    'ext-modules/dbdMenu/dbdMenuDirective.js',
    'ext-modules/polyphemus/polyphemusModule.js',
    'ext-modules/polyphemus/polyphemusCommServiceOut.js',
    'ext-modules/polyphemus/polyphemusController.js',
    'ext-modules/polyphemus/polyphemusDirective.js',
    'ext-modules/polyphemus/polyphemusService.js',
    'ext-modules/polyphemus/polyphemusSettingsModule.js'
 ];
    
var app_files = [
    'app/_appModule.js',
    'app/appConfig.js', 
    'app/appRouter.js',       
   	'app/auth/controllers/*.js',
   	'app/layout/*.js',
    'app/reports/controllers/*.js',
    'app/users/controllers/*.js',
    'app/users/*.js',
    'app/applications/controllers/*.js',
    'app/applications/*.js',
    'app/permissions/controllers/*.js',
    'app/groups/controllers/*.js',
    'app/groups/*.js',
    'app/common/*.json',
    'app/common/*.js', 
    'app/services/*.js'
 ];   

 var html_css_files =[
     'app/auth/views/*.html',
     'app/layout/views/*.html',
     'app/reports/views/*.html',
     'app/users/views/*.html',
     'app/applications/views/*.html',
     'app/permissions/views/*.html',
     'app/groups/views/*.html',
     'app/common/*.json',
     'assets/img/*.*',
     'assets/bootstrap/css/*.*',
     'assets/bootstrap/fonts/*.*',
     'assets/bootstrap/js/*.*',
     'bower_components/datatables/media/css/*.*',
     'ext-modules/dbdDashboard/dbdDashboard.css',
     'bower_components/angular-gridster/dist/angular-gridster.min.css',
 ]

 //views =  html files
gulp.task('html_css_files', function(){  
  gulp.src(html_css_files, { base: './' })
  .pipe(gulp.dest('dist'));
});

//javascript  files
gulp.task('js_lib_files', function() {
  return gulp.src(js_lib_files)
    .pipe(uglify())
    .pipe(concat('js_lib.min.js'))
    .pipe(gulp.dest("."));
});

gulp.task('app_files', function() {
  return gulp.src(app_files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app_files.min.js'))
    .pipe(gulp.dest("."));
});

gulp.task('js_all_files', function() {
  return gulp.src(['js_lib.min.js', 'app_files.min.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest("./dist"));
});

gulp.task('clean:.', function() {
  return del(['js_lib.min.js', 'app_files.min.js']);
});

gulp.task('rename_index', function() {
    gulp.src("index.min.html")
  		.pipe(rename("index.html"))
  		.pipe(gulp.dest("./dist"));
});

//gulp.task('default', [ 'html_css_files','js_files', 'rename_index']);
gulp.task('phase1', ['html_css_files', 'js_lib_files', 'app_files', 'rename_index']);
gulp.task('phase2', ['js_all_files']);
gulp.task('phase3', ['clean:.']);

