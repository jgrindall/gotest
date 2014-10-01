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
			options = {"containerTagId":"game", "scaleType":"fill", "minWidth":800, "minHeight":620, "paddingBottom":45};
			app = new AppContext(options);
			app.start();
		});

	});

});


/**
1360x768	2
1920x1200	3
1680x1050	5
1600x900	6
1024x768	6
1440x900	7
1280x800	7
1280x1024	8
1920x1080	13
1366x768	31
**/


// Smallest: 1024 x 768

// Largest: 1920 x 1200



