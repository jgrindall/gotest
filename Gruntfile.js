module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        amdcheck: {
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/src/scripts/2go/js/app/',
                        src: ['**/*.js'],
                        dest: 'minimised/'
                    }
                ]
            }
        },

        jshint: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
                ]
            }
        },

        clean: {
            'pre':      ["public/build"],
            'post':     ["minimised"]
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                strict:true,
                freeze:true,
                immed:true,
                indent:4,
                latedef:true,
                newcap:true,
                nonbsp:true,
                undef:true,
                unused:true,
                maxdepth:4,
                globals: {
                    require:true,
                    define:true,
                    Phaser:true,
                    console:true,
                    PIXI:true,
                    $:true,
                    _:true
                 }
            },
            all: ['public/src/scrips/2go/js/app/**/*.js']
        },


        requirejs: {
            compile: {
                options: {
                    baseUrl:    'public/src/scripts/2go',
                    out:        'public/build/scripts/2go/main.js',
                    removeCombined: true,
                    include: ['main'],
                    findNestedDependencies: true,
                    optimize: "uglify",
                    paths: {
                        'base':                         'js/app',
                        'html2canvas':                  'js/lib/html2canvas',
                        'phaser': 			            'js/lib/phaser',
                        'phaserstatetrans': 	        'js/lib/phaser-state-transition.min',
                        'phasercomponents':             'js/lib/phasercomponents',
                        'filesaver':                    'js/lib/filesaver'
                    }
                }
            },
            css: {
                options: {
                    optimizeCss: 'standard',
                    cssIn:  'public/src/scripts/2go/assets/css/main.css',
                    out:    'public/build/scripts/2go/assets/css/main.css'
                }
            }
        },


        copy: {
            index:{
                expand:true,
                cwd: 'public/src/', 
                src: 'index.html',
                dest: 'public/build/',
                options: {
                    process: function (content, srcpath) {
                        var now = "build version " + new Date();
                        return content.replace(/Viewing src/g, now);
                    }           
                }
            },
            main: {
                expand:true,
                cwd: 'public/src/scripts/2go/assets', 
                src: ['**/*.png','**/*.jpg','**/*.gif','**/*.mp3','**/*.wav','**/*.ogg','**/*.ttf','**/*.eot','**/*.woff','**/*.json'],
                dest: 'public/build/scripts/2go/assets'
            }
        }

    });

    grunt.loadNpmTasks('grunt-amdcheck');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['amdcheck:src','clean:pre', 'jshint', 'requirejs', 'copy', 'clean:post']);

};



