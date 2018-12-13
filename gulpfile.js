var gulp = require("gulp");
var mocha = require("gulp-mocha");
var del = require("del");
var merge = require("merge2");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var header = require("gulp-header");
var serverBridge = require("server-bridge");
var fs = require("fs");
var path = require("path");

var FOLDER_SCRIPTS = "./../web-app/src/scripts/";
var FOLDER_SRC     = "./src";
var FOLDER_DIST    = "./dist";
var FOLDER_TESTS   = "./dist/tests";

gulp.task("generate-client-side-code", function(cb) {
    var filesToGenerateCodeFrom = [
        "./src/routes/food-item-routes.ts",
        "./src/routes/order-routes.ts"
    ];
    var code = serverBridge.getGeneratedCode({
        classMapping: {
            "FoodItemRoutes": "ServerFoodItems",
            "OrderRoutes": "ServerOrders"
        },
        importMapping: {
            "FoodItem": "./food-item",
            "Order": "./order"
        },
        files: filesToGenerateCodeFrom
    });

    fs.writeFile(path.join(__dirname, FOLDER_SCRIPTS, "server.ts"), code, function(err) {
        if (err) throw err;
        cb();
    });
});

gulp.task("typescript", ["clean"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    var tsResult = gulp.src([FOLDER_SRC + "/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(FOLDER_DIST)),
        tsResult.js.pipe(sourcemaps.write("./")).pipe(gulp.dest(FOLDER_DIST))
    ]);
});

gulp.task("initialize-default-database-files", ["typescript"], function() {
    return gulp.src(["./resources/*.db"])
        .pipe(gulp.dest(FOLDER_DIST + "/storage/data"));
});

gulp.task("tslint", function() {
    return gulp.src([FOLDER_SRC + "/**/*.ts"])
        .pipe(tslint({ formatter: "verbose" }))
        .pipe(tslint.report());
});

gulp.task("test", ["typescript"], function() {
    return gulp.src(FOLDER_TESTS + "/**/*.js", { read: false })
        .pipe(mocha({
            reporter: "progress",
            env: { "NODE_ENV": "test" }
        }));
});

gulp.task("start-server", function(cb) {
    console.log("Deprecated. Run npm start.");
});

gulp.task("clean", function (cb) {
    return del([FOLDER_DIST + "/**/*"], cb);
});

gulp.task("default", ["typescript", "initialize-default-database-files"]);
