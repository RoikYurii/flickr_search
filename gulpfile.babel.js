import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import pug from 'gulp-pug';
import uglify from 'gulp-uglify';
import csso from 'gulp-csso';
import concat from 'gulp-concat';
import prefix from 'gulp-autoprefixer';
import sass from 'gulp-sass';



const prodRoot = 'docs/';
const pugFiles = {
  src: 'src/pug/pages/*.pug',
  watch: 'src/pug/**/*.pug'
}
const cssFiles = {
  src: 'src/sass/main.sass',
  prod: prodRoot+'css/',
  watch: 'src/sass/**/*.sass'
}

const jsFiles = {
  root: 'src/js/',
  entry: 'main.js',
  src: 'src/js/main.js',
  prod: prodRoot+'js/',
  watch: 'src/js/**/*.js',
  vendors: ['plugins/jquery/dist/jquery.min.js',]
}

function server(done) {
  connect.server({
    root: prodRoot,
    livereload: true
  });
  done();
};

function html(done) {
	return gulp.src(pugFiles.src)
    // .pipe(plumber())
    // .pipe(watch(P.pages + '/*.pug'))
		.pipe(pug({pretty: true}))
    .pipe(gulp.dest(prodRoot))
    .pipe(connect.reload());
    done();
};

function styles() {
	return gulp.src(cssFiles.src)
		// .pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 10 versions'],
			cascade: true
    }))
    .pipe(csso())
    .pipe(gulp.dest(cssFiles.prod))
    .pipe(connect.reload())
};

function js() { 
  return browserify({
    entries: [jsFiles.root + jsFiles.entry]
  })
  .transform(babelify)
  .bundle()
    .pipe(source(jsFiles.entry))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsFiles.prod))
    .pipe(connect.reload());
};

function vendorsJs(done){
  gulp.src(jsFiles.vendors)
  .pipe(uglify())
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(jsFiles.prod));
  done();
};

function watch(done){
    gulp.watch(pugFiles.watch, html);
    gulp.watch(cssFiles.watch, styles);
    gulp.watch(jsFiles.watch, js);
    done();
};

module.exports.default = gulp.task('default', gulp.parallel(server, html, styles, js, vendorsJs, watch));




