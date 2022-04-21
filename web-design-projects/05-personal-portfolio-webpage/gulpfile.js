// css
const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('autoprefixer')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

// img
const resizer = require('gulp-images-resizer')
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

/* Compiles SCSS files to CSS file */
function css(done) {
	src('src/scss/**/*.scss') //Identifies the .scss file to compile.
		.pipe(sourcemaps.init())
		.pipe(plumber()) //Avoid gulp execution interruption when a compilation error ocurrs.
		.pipe(sass()) // Compile the file.
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

function resizeImages(done) {
	const options = {
		width: 800,
		heigth: 400
	}

	src('src/img/**/*.{jpg,png}')
		.pipe(resizer(options))
		.pipe(dest('build/img/'))
	done()
}

function minifyImages(done) {
	const options = {
		optimizationLevel: 3,
	}

	src('src/img/**/*.{jpg,png}')
		.pipe(cache(imagemin(options)))
		.pipe(dest('build/img/'))
	done()
}

function webpFormat(done) {
	const options = {
		quality: 75
	}

	src('src/img/**/*.{jpg,png}')
		.pipe(webp(options))
		.pipe(dest('build/img/'))
	done()
}

function avifFormat(done) {
	const options = {
		quality: 75
	}

	src('src/img/**/*.{jpg,png}')
		.pipe(avif(options))
		.pipe(dest('build/img/'))
	done()
}

// run the functions with gulp + functionName
exports.css = css
exports.dev = dev
exports.resizeImages = resizeImages
exports.img = parallel(minifyImages, webpFormat, avifFormat)
