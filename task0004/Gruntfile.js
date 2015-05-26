module.exports = function (grunt) {
    grunt .initConfig ({
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: './static/less',
                    src: ['**/*.less'],
                    dest: 'static/css',
                    ext: '.css'
                }]
            }
        },
        less :{ main: { expand: true, cwd: './less/', src: ['**/*.less'], dest: './css/', ext: '.css' } },
        autoprefixer : {
            dist : {
                files : {
                    'css/global.css' : 'src/global.css',
                    'css/mobile.css' : 'src/mobile.css'
                }
            }
        },
        watch : {
            styles : {
                files : ['src/*.css'],
                tasks : ['autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer' );
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch' );
};