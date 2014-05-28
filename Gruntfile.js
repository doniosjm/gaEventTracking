// ===========================================================================
// GRUNT CONFIGURATION FILE ==================================================
// ===========================================================================
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            src: {
                options: {
                    reporter: require('jshint-stylish')
                },
                src: ['<%= pkg.src %>/*.js']
            }
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '<%= pkg.dist %>/jquery.gaEventTracking.min.js': ['<%= pkg.src %>/jquery.gaEventTracking.js']
                }
            }
        },

        watch: {
            src: {
                files: ['<%= pkg.src %>/*.js'],
                tasks: ['src']
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('dist', ['jshint:src', 'uglify:dist']);
    grunt.registerTask('src',  ['jshint:src', 'watch:src']);
};