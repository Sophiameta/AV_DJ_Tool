module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    livereload: true
                }
            }
        },
        watch: {
            server: {
                files: [
                    '**/*.js',
                    '**/*.css',
                    'index.html'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', [ 'connect', 'watch' ]);

};
