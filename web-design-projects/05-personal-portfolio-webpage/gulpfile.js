const autoprefixer = require('autoprefixer')
const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

/* Compiles SCSS files to CSS file */
function css(done) {
	src('src/scss/**/*.scss') //Identifies the .scss file to compile.
		.pipe(sourcemaps.init())
		.pipe(sass()) // Compile the file.
		.pipe(plumber()) //Avoid gulp execution interruption when a compilation error ocurrs.
		.pipe(postcss([autoprefixer, cssnano()]))
		.pipe(sourcemaps.write('.')) //Write the sourcemap file.
		.pipe(dest('build/css')) // Stores the compiled files.
	done()
}

/* Add the --watch flag */
function dev(done) {
	watch('src/scss/**/*.scss', css)
	done()
}

// run the functions with gulp + functionName
exports.css = css
exports.dev = dev
