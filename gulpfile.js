const gulp = require('gulp')
const babel = require('gulp-babel')
const dox = require('gulp-dox')

gulp.task('babel-lib', () => {
    return gulp.src('src/lib/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib'))
})

gulp.task('babel-test', () => {
    return gulp.src('src/test/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('test'))
})

gulp.task('babel', ['babel-lib', 'babel-test'])

gulp.task('docs', () => {
    return gulp.src('src/lib/**/*.js')
        .pipe(dox())
        .pipe(gulp.dest('doc-db'))
})

gulp.task('default', ['babel'], () => {
    return gulp.watch('src/**/*', ['babel-lib', 'babel-test'])
})
