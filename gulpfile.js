// Include gulp
var gulp = require('gulp'),

// Include Our Plugins
    sass = require('gulp-sass'),
    watch  = require('gulp-watch'),
    notify = require('gulp-notify'),
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    plumber = require('gulp-plumber');

var paths = {
    sass: 'scss/*.scss'
};

// Compile Our Sass
gulp.task('sass', function() {

    var onError = function(err) {
        notify.onError({
          title: 'Error',
          message:  'Someting is wrong... Look there : <%= error.message %>'
        })(err);
        this.emit('end');
    };

    return gulp.src('scss/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(notify({
          title: 'Sucess',
          message: 'sass task complete' 
	}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    var server = refresh();
    gulp.watch(paths.sass, ['sass']).on('change', function(file) {
        server.changed(file.path);
    });
});


// Default Task
gulp.task('default', ['watch', 'sass']);