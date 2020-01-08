const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const path_libs = './libs'
const path_page = '../blacktoolboxlaboratory.github.io/javascript';
var path_backup = '../codebase/homepage_js';

gulp.task('copyVendor', function(done) { 
  /* jQuery */
  gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(path_libs+'/jquery/'));

  /* fontawesome */
  gulp.src(['node_modules/@fortawesome/fontawesome-free/css/**/*'])
    .pipe(gulp.dest(path_libs+'/fontawesome/css'));
  gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**/*'])
    .pipe(gulp.dest(path_libs+'/fontawesome/webfonts'));
  
  done();
});

gulp.task('updateHomePage', function(done){
  /* html & ico*/
  gulp.src(['index.html', 'favicon.ico'])
    .pipe(gulp.dest(path_page));

  /* style */
  gulp.src(['style/index.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path_page+'/style'))
  gulp.src(['style/pages/*'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path_page+'/style/pages'))
  
  /* font */
  gulp.src(['style/google-fonts/*'])
    .pipe(gulp.dest(path_page+'/style/google-fonts/'))

  /* libs */
  gulp.src(['libs/**/*'])
    .pipe(gulp.dest(path_page+'/libs/'))
  
  /* img */
  gulp.src(['img/**/*'])
    .pipe(gulp.dest(path_page+'/img/'))

  /* pages */
  gulp.src(['pages/**/*'])
    .pipe(gulp.dest(path_page+'/pages/'))

  done();
});

gulp.task('backupCodebase', function(done) {  
  /* src */
  gulp.src(['img/*'])
    .pipe(gulp.dest(path_backup + '/img/'));
  gulp.src(['style/**/*'])
    .pipe(gulp.dest(path_backup + '/style/'));
  /* pages */
  gulp.src(['pages/**/*'])
    .pipe(gulp.dest(path_backup+'/pages/'));
  /* others */        
  gulp.src([
      'LICENSE',
      'README.md',
      'package.json',
      'package-lock.json',
      'gulpfile.js',
      'index.html',
      'favicon.ico',
    ])
    .pipe(gulp.dest(path_backup));
  done();
});