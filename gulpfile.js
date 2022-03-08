const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(['dev','prod'])
}

const fonts = () => {
  return src('src/fonts/**')
  .pipe(dest('dev/fonts'))
  .pipe(gulpif(argv.prod, dest('prod')))
}

const stylesScss = () => {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
    .pipe(browserSync.stream())
};

// const styles = () => {
//   return src('src/styles/**/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.css'))
//     .pipe(autoprefixer({
//       cascade: false,
//     }))
//     .pipe(gulpif(argv.prod,cleanCSS({
//       level: 2
//     })))
//     .pipe(sourcemaps.write())
//     .pipe(dest('dev'))
//     .pipe(gulpif(argv.prod, dest('prod')))
//     .pipe(browserSync.stream())
// }


const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(argv.prod, htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(dest('dev'))
    .pipe(gulpif(argv.prod, dest('prod')))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dev/images'))
    .pipe(gulpif(argv.prod, dest('prod/images')))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(gulpif(argv.prod, uglify({
    toplevel: true
  }).on('error', notify.onError())))
  .pipe(sourcemaps.write())
  .pipe(dest('dev'))
  .pipe(gulpif(argv.prod, dest('prod')))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dev/images'))
  .pipe(gulpif(argv.prod, dest('prod/images')))
}

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', stylesScss);
// watch('src/styles/**/*.css', styles);
watch([
  'src/images/**/*.jpg',
  'src/images/**/*.png',
  'src/images/*.svg',
  'src/images/**/*.jpeg',
], images);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/fonts/**', fonts);

exports.stylesScss = stylesScss;
exports.clean = clean;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.default = series(clean, fonts, htmlMinify, scripts, stylesScss, images, svgSprites, watchFiles);
