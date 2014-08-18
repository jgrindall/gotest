module.exports = function(grunt) {

	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
  			main: {
    			files: [
      				{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
    			]
  			}
		},
		
		clean: ["public/build"],
		
		jshint: {
    		options: {
      			curly: true,
      			eqeqeq: true,
      			eqnull: true,
     			browser: true,
     			strict:false,
      			globals: {
        			jQuery: true,
        			require:true,
        			define:true,
        			$:true,
        			Phaser:true
      			}
    		},
    		all: ['public/src/js/app/scenemanager.js', 'public/src/js/app/**/*.js']
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
						jquery: 			'lib/jquery.min',
						phaser: 			'lib/phaser.min',
						phaserstatetrans: 	'lib/phaser-state-transition.min'
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
    			src: ['assets/**/*.png','assets/**/*.css','assets/**/*.mp3','assets/**/*.ttf','assets/**/*.json'],
    			dest: 'public/build/'
  			}
		}
		
		
		  	
  	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-requirejs');
 	grunt.loadNpmTasks('grunt-contrib-copy');
  	
  	grunt.registerTask('default', ['clean', 'jshint', 'requirejs', 'copy']);

};



