const gulp = require('gulp');
const del = require('del');

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const path_libs = './libs'
const path_page = '../blacktoolboxlaboratory.github.io/javascript';
var path_backup = '../codebase/homepage_js';

gulp.task('copyVendor', function (done) {
  /* jQuery */
  gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(path_libs + '/jquery/'));

  /* fontawesome */
  gulp.src(['node_modules/@fortawesome/fontawesome-free/css/**/*'])
    .pipe(gulp.dest(path_libs + '/fontawesome/css'));
  gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**/*'])
    .pipe(gulp.dest(path_libs + '/fontawesome/webfonts'));

  /* @blacktoolbox/prototype-languages */
  gulp.src(['node_modules/@blacktoolbox/prototype-languages/umd/index.min.js'])
    .pipe(gulp.dest(path_libs + '/prototype-languages/'));

  /* @blacktoolbox/prototype-validator */
  gulp.src(['node_modules/@blacktoolbox/prototype-validator/umd/index.min.js'])
    .pipe(gulp.dest(path_libs + '/prototype-validator/'));

  /* axios */
  gulp.src(['node_modules/axios/dist/axios.min.js'])
    .pipe(gulp.dest(path_libs + '/axios/'));

  /* apexcharts */
  gulp.src(['node_modules/apexcharts/dist/apexcharts.css'])
    .pipe(gulp.dest(path_libs + '/apexcharts/'));
  gulp.src(['node_modules/apexcharts/dist/apexcharts.min.js'])
    .pipe(gulp.dest(path_libs + '/apexcharts/'));

  done();
});

gulp.task('updateHomePage', async function (done) {
  /* clean files */
  await del([path_page + '/'], { force: true })

  /* html & ico*/
  gulp.src(['index.html', 'favicon.ico'])
    .pipe(gulp.dest(path_page));

  /* style */
  gulp.src(['style/index.css'])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path_page + '/style'))
  gulp.src(['style/pages/*'])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path_page + '/style/pages'))

  /* font */
  gulp.src(['style/google-fonts/*'])
    .pipe(gulp.dest(path_page + '/style/google-fonts/'))

  /* libs */
  gulp.src(['libs/**/*'])
    .pipe(gulp.dest(path_page + '/libs/'))

  /* plugins */
  gulp.src(['plugins/*'])
    .pipe(gulp.dest(path_page + '/plugins/'))

  /* languages */
  gulp.src(['languages/*'])
    .pipe(gulp.dest(path_page + '/languages/'))

  /* images */
  gulp.src(['images/*'])
    .pipe(gulp.dest(path_page + '/images/'))

  /* pages */
  gulp.src(['pages/*'])
    .pipe(gulp.dest(path_page + '/pages/'))

  /* plugins */
  gulp.src(['utils/*'])
    .pipe(gulp.dest(path_page + '/utils/'))

  /* sitemap */
  gulp.src(['sitemap.xml'])
    .pipe(gulp.dest(path_page))

  done();
});

gulp.task('backupCodebase', async function (done) {
  /* clean files */
  await del([path_backup + '/'], { force: true })

  /* src */
  gulp.src(['style/**/*'])
    .pipe(gulp.dest(path_backup + '/style/'));
  gulp.src(['style/google-fonts/*'])
    .pipe(gulp.dest(path_backup + '/style/google-fonts/'));
  gulp.src(['plugins/*'])
    .pipe(gulp.dest(path_backup + '/plugins/'));
  gulp.src(['languages/*'])
    .pipe(gulp.dest(path_backup + '/languages/'));
  gulp.src(['images/*'])
    .pipe(gulp.dest(path_backup + '/images/'));
  gulp.src(['pages/*'])
    .pipe(gulp.dest(path_backup + '/pages/'));
  /* others */
  gulp.src([
    'LICENSE',
    'README.md',
    'package.json',
    'package-lock.json',
    'gulpfile.js',
    'index.html',
    'favicon.ico',
    'sitemap.xml'
  ])
    .pipe(gulp.dest(path_backup));
  done();
});