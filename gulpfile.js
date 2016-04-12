const gulp = require('gulp')
const babel = require('gulp-babel')
const dox = require('gulp-dox')

gulp.task('babel', () => {
    return gulp.src('src/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib'))
})

gulp.task('dox', () => {
    return gulp.src('src/**/*.js')
        .pipe(dox())
        .pipe(gulp.dest('doc-db'))
})

gulp.task('default', () => {
    return gulp.watch('src/**/*', ['babel','dox'])
})
