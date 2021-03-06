module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    optimize: "none", // requirejs has own copy of uglifyjs that breaks the build
                    baseUrl: "source/js/",
                    mainConfigFile: "source/js/main.js",
                    out: "build/js/main-src.js"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/partials/',
                        src: ['**/*'],
                        dest: 'build/partials'
                    },
                    {
                        expand: true,
                        cwd: 'source/',
                        src: ['index.html'],
                        dest: 'build/'
                     },
                    {
                        expand: true,
                        cwd: 'source/js/libs/',
                        src: ['**/*'],
                        dest: 'build/js/libs/'
                     }
                ]
            }
        },
        uglify: {
            main: {
                options: {
                    sourceMap: 'build/js/source-map.js',
                    mangle: false
                },
                files: {
                    'build/js/main.js': ['build/js/main-src.js']
                }
            }
        },
        compass: {
            main: {
              options: {
                  config: 'config.rb'
              }
            }
        },
        karma: {
            ci: { // runs tests one time in PhantomJS, good for continuous integration
                configFile: 'tests/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
            unit: { // start testing server that listens for code updates
                configFile: 'tests/karma.conf.js',
                singleRun: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['copy', 'requirejs', 'uglify', 'compass']);

    grunt.registerTask('default', ['build']);

};