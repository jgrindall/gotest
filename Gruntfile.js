module.exports = function(grunt) {

	grunt.initConfig({
    	
        pkg: grunt.file.readJSON('package.json'),
		

        amdcheck: {
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/src/js/app/',
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
                maxdepth:3,
      			globals: {
        			require:true,
        			define:true,
                    Phaser:true,
                    console:true,
                    PIXI:true
      			}
    		},
    		all: ['public/src/js/app/**/*.js']
    	},
  
		
		requirejs: {
  			compile: {
    			options: {
      				baseUrl: 'public/src/js',
                    out: 'public/build/js/main.js',
					removeCombined: true,
					include: ['main'],
					findNestedDependencies: true,
					paths: {
						jquery:                        'lib/zepto',
						phaser: 			           'lib/phaser',
						phaserstatetrans: 	           'lib/phaser-state-transition.min',
                        phasercomponents:              'lib/phasercomponents'
					}
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
  				cwd: 'public/src/', 
    			src: ['assets/**/*.png','assets/**/*.jpg','assets/**/*.css','assets/**/*.mp3','assets/**/*.ttf','assets/**/*.json'],
    			dest: 'public/build/'
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



