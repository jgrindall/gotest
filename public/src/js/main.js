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
				"minWidth":940, 
				"minHeight":620, 
				"maxWidth":1280,
				"maxHeight":960 
			};
			var app = new AppContext(options);
			app.start();
		});

	});

});


