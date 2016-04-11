const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('babel', () => {
    return gulp.src('src/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib'))
})

gulp.task('default', () => {
    return gulp.watch('src/**/*', ['babel'])
})
