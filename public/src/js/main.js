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
			var app = new AppContext({"containerTagId":"game", "scaleType":"fill", "minHeight":0, "minWidth":0});
			app.start();
		});

	});

});
