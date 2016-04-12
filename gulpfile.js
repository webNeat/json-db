var gulp = require('gulp')
var babel = require('gulp-babel')
var dox = require('gulp-dox')

gulp.task('babel-lib', function() {
    return gulp.src('src/lib/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib'))
})

gulp.task('babel-test', function() {
    return gulp.src('src/test/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('test'))
})

gulp.task('babel', ['babel-lib', 'babel-test'])

gulp.task('docs', function() {
    return gulp.src('src/lib/**/*.js')
        .pipe(dox())
        .pipe(gulp.dest('doc-db'))
})

gulp.task('default', ['babel'], function() {
    return gulp.watch('src/**/*', ['babel-lib', 'babel-test'])
})
