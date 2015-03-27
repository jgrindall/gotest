'use strict';

require.config({
	paths: {
		'base': 						'js/app',
		'html2canvas': 					'js/lib/html2canvas',
		'phaser': 						'js/lib/phaser',
		'phaserstatetrans': 			'js/lib/phaser-state-transition.min',
		'phasercomponents':  			'js/lib/phasercomponents',
		'filesaver':  					'js/lib/filesaver'
	}
});

require(['phaser'], function(Phaser){

	require(['base/appcontext'], function(AppContext){
	
		$(document).ready(function(){
			var options = {
				"containerTagId":"game", 
				"paddingBottom":0, 
				"minWidth":940, 
				"minHeight":620, 
				"maxWidth":1280,
				"maxHeight":970 
			};
			var app = new AppContext(options);
			app.start();
		});

	});

});

