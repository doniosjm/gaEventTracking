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
            production: {
                options: {
                    reporter: require('jshint-stylish')
                },
                src: ['<%= pkg.lib %>/js/*.js']
            }
        },

        uglify: {
            production: {
                options: {
                    sourceMap: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '<%= pkg.lib %>/jquery.gaEventTracking.min.js': ['<%= pkg.lib %>/jquery.gaEventTracking.js']
                }
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('production', ['jshint:production', 'uglify:production']);
};