import gulp from "gulp";
import nunjucksRender from "gulp-nunjucks-render";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import { deleteAsync } from "del";

const path_src = "./src/";
const path_dist = "./dist/";

const path_libs = "./src/libs/";
const path_files = "./src/files/";

const path_page = "../blacktoolboxlaboratory.github.io/javascript";

const { src, dest, task } = gulp;

task("copyVendor", async function (done) {
  /* clean files */
  await deleteAsync([path_libs, path_files], { force: true });

  /* jQuery */
  src(["node_modules/jquery/dist/jquery.min.js"]).pipe(
    dest(path_libs + "jquery/")
  );

  /* fontawesome */
  src(["node_modules/@fortawesome/fontawesome-free/css/**/*"]).pipe(
    dest(path_libs + "fontawesome/css")
  );
  src(["node_modules/@fortawesome/fontawesome-free/webfonts/**/*"]).pipe(
    dest(path_libs + "fontawesome/webfonts")
  );

  /* @blacktoolbox/prototype-languages */
  src(["node_modules/@blacktoolbox/prototype-languages/umd/index.min.js"]).pipe(
    dest(path_libs + "prototype-languages/")
  );

  /* @blacktoolbox/prototype-validator */
  src(["node_modules/@blacktoolbox/prototype-validator/umd/index.min.js"]).pipe(
    dest(path_libs + "prototype-validator/")
  );

  /* axios */
  src(["node_modules/axios/dist/axios.min.js"]).pipe(
    dest(path_libs + "axios/")
  );

  /* apexcharts */
  src(["node_modules/apexcharts/dist/apexcharts.css"]).pipe(
    dest(path_libs + "apexcharts/")
  );
  src(["node_modules/apexcharts/dist/apexcharts.min.js"]).pipe(
    dest(path_libs + "apexcharts/")
  );

  /* google fonts */
  src(["node_modules/@fontsource/ubuntu/files/*-400-normal.*"]).pipe(
    dest(path_files + "ubuntu")
  );
  src(["node_modules/@fontsource/varela-round/files/*-400-normal.*"]).pipe(
    dest(path_files + "varela-round")
  );

  done();
});

task("build", async function (done) {
  /* clean files */
  await deleteAsync([path_dist], { force: true });

  /* ico */
  src([path_src + "favicon.ico"]).pipe(dest(path_dist));

  /* html */
  src(path_src + "pages/**/*.njk")
    .pipe(
      nunjucksRender({
        path: [
          path_src + "pages",
          path_src + "locales",
          path_src + "components",
        ],
      })
    )
    .pipe(dest(path_dist));

  /* style */
  src([path_src + "style/index.css", path_src + "style/pages/**/*"])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(dest(path_dist + "/style"));

  /* font */
  src([path_src + "files/**/*"]).pipe(dest(path_dist + "/files/"));

  /* images */
  src([path_src + "images/*"]).pipe(dest(path_dist + "/images/"));

  /* libs */
  src([path_src + "libs/**/*"]).pipe(gulp.dest(path_dist + "/libs/"));

  /* plugins */
  src([path_src + "plugins/*"]).pipe(dest(path_dist + "/plugins/"));

  /* locales */
  src([path_src + "locales/*"]).pipe(dest(path_dist + "/locales/"));

  /* plugins */
  src([path_src + "utils/*"]).pipe(dest(path_dist + "/utils/"));

  /* sitemap */
  src([path_src + "sitemap.xml"]).pipe(dest(path_dist));

  done();
});

gulp.task("updateHomePage", async function (done) {
  // /* clean files */
  await deleteAsync([path_page + "/"], { force: true });

  /* sitemap */
  gulp.src([path_dist + "**/*"]).pipe(gulp.dest(path_page));

  done();
});
