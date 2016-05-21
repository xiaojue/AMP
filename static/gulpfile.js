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
var less = require('gulp-less');
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
        amp: ['./src/js/app.js', './src/js/debug.js'],
        vendor: [
            'vue',
            'vuex',
            'vue-router',
            'vue-form',
            'vue-resource',
            'jquery',
            'codemirror/lib/codemirror.js',
            'codemirror/mode/javascript/javascript.js',
            'js-beautify',
            './src/js/lib/wangeditor.js'
        ]
    },
    watch: true,
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
    vue: {
        less: 'css!less'
    },
    plugins: [vendorPlugin],
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            utils: path.join(pwd, './src/js/util/index.js'),
            store: path.join(pwd, './src/js/store/index.js'),
            actions: path.join(pwd, './src/js/store/actions/index.js'),
            wangeditor: path.join(pwd, './src/js/lib/wangeditor.js'),
        }
    }
};

// 公共头部
var banner = ['/*',
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
    if (process.env.NODE_ENV === 'production') {
        webpackConfig.entry.amp.pop();
        webpackConfig.watch = false;
    }
    return gulp
        .src('./src/js/app.js')
        .pipe(gulpWebpack(webpackConfig))
        .on('error', function(err) { })
        .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify()))
        .pipe(gulpIf(process.env.NODE_ENV === 'production', header(banner, { config: config })))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', function() {
    return gulp
        .src('./src/css/app.less')
        .pipe(less({
            paths: [path.join(pwd, './src/css')]
        }))
        .pipe(gulpIf(process.env.NODE_ENV === 'production', minifyCss()))
        .pipe(gulpIf(process.env.NODE_ENV === 'production', header(banner, { config: config })))
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
        .src('./src/font/*')
        .pipe(gulp.dest('./dist/font/'))
})

gulp.task('rev', function() {
    return gulp
        .src('../views/index.html')
        .pipe(gulpIf(process.env.NODE_ENV === 'production', rev({
            assetsDir: path.join(pwd)
        })))
        .pipe(gulp.dest('../views/'));
})

gulp.task('watch', function() {
    gulp.start(['js', 'img', 'css', 'font']);
    gulp.watch('./src/css/*', ['css']);
    gulp.watch('./src/img/*', ['img']);
    gulp.watch('./src/font/*', ['font']);
})

gulp.task('build', ['js', 'css', 'img', 'font']);

gulp.task('default', ['build'], function() {
    gulp.start('rev');
});
