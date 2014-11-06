'use strict';

require.config({
	paths: {
		'html2canvas': 					'lib/html2canvas',
		'phaser': 						'lib/phaser',
		'phaserstatetrans': 			'lib/phaser-state-transition.min',
		'phasercomponents':  			'lib/phasercomponents',
		'filesaver':  					'lib/filesaver'
	}
});

require(['phaser'], function(Phaser){
	
	require(['app/appcontext'], function(AppContext){
	
		$(document).ready(function(){
			var options = {
				"containerTagId":"game", 
				"paddingBottom":0, 
				"minHeight":620, 
				"minWidth":940, 
				"maxHeight":960, 
				"maxWidth":1280
			};
			var app = new AppContext(options);
			app.start();
		});

	});

});


