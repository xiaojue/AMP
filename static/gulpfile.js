'use strict';
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minimist = require('minimist');
var gutil = require("gulp-util");
var rev = require('gulp-rev-hash');
var path = require('path');

var pwd = __dirname;

// gulp --env=pro 压缩代码，直接执行gulp，不压缩代码
var argv = require('minimist')(process.argv.slice(2));
var config = require('../config.json');

var vendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.min.js',
    minChunks: Infinity,
});
var webpackConfig = {
    entry: {
        amp: './src/js/app.js',
        vendor: ['vue', 'jquery', 'vuex', 'vue-router']
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0'],
            }
        }, {
            test: /.vue$/,
            loader: 'vue-loader'
        }, {
            test: /.css$/,
            loader: 'style-loader'
        }]
    },
    plugins: [vendorPlugin],
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {

        }
    },
};

// 公共头部
var banner = ['/**',
    ' * <%= config.name %> - <%= config.desc %>',
    ' */',
    ''
].join('\n');

gulp.task('clean', function() {
    return gulp
        .src(['./dist/*'], { read: false })
        .pipe(clean({ force: true }))
});

gulp.task('js', function() {
    return gulp
        .src('./src/js/app.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulpIf(argv.env == 'pro', uglify()))
        .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('all.js'))
        .pipe(gulpIf(argv.env == 'pro', minifyCss()))
        .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(rename('amp.min.css'))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function() {
    return gulp
        .src('./src/img/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('font', function() {
    return gulp
        .src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts/'))
})

gulp.task('rev', function() {
    return gulp
        .src('../views/index.html')
        .pipe(gulpIf(argv.env == 'pro', rev({
            assetsDir: path.join(pwd)
        })))
        .pipe(gulp.dest('../views/'));
})

gulp.task('watch', function() {
    webpackConfig.watch = argv.env != 'pro';
    gulp.start('js');
    gulp.watch('./src/css/*', ['css']);
    gulp.watch('./src/img/*', ['img']);
})

gulp.task('build', ['js', 'css', 'img', 'font']);

gulp.task('default', ['build'], function() {
    gulp.start('rev');
});
