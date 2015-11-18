// gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var apidoc = require('gulp-apidoc');
var argv = require('yargs').argv;
var child = require('child_process');

// gulp frisby -p apitests
// running the test suite from gulp (not used most of the time)
gulp.task('frisby', function() {
    var execCommand = 'jasmine-node ';
    execCommand += argv.p ? argv.p : 'spec/';
    child.exec(execCommand, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

// $ gulp apidoc
// description: creates the documentation files.
gulp.task('apidoc', function(done) {
    apidoc({
        src: ".",
        dest: "public/_apidoc/",
        includeFilters: [".*\\.js$", "routes/.*\\.js$"],
        excludeFilters: ["node_modules/", "public/_apidoc/"]
    }, done);
});

// gulp
// starts the server using nodemon
gulp.task('default', function() {
    nodemon({
            script: 'prpservercas.js',
            legacyWatch: 'true',
            ext: 'html js',
            ignore: ['ignored.js']
        })
        .on('restart', function() {
            console.log('restarted!');
        });
});
