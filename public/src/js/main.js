'use strict';

require.config({
	paths: {
		'jquery': 						'lib/zepto',
		'phaser': 						'lib/phaser',
		'phaserstatetrans': 			'lib/phaser-state-transition.min',
		'phasercomponents':  			'lib/phasercomponents'
	}
});

require(['phaser'], function(Phaser){
	
	require(['jquery', 'app/appcontext'], function($, AppContext){
	
		$(document).ready(function(){
			var options, app;
			options = {"containerTagId":"game", "scaleType":"fill", "paddingBottom":45, "minHeight":550};
			app = new AppContext(options);
			app.start();
		});

	});

});


