'use strict';

require.config({
	paths: {
		'jquery': 						'lib/zepto',
		'html2canvas': 					'lib/html2canvas',
		'phaser': 						'lib/phaser',
		'phaserstatetrans': 			'lib/phaser-state-transition.min',
		'phasercomponents':  			'lib/phasercomponents',
		'filesaver':  					'lib/filesaver',
		'canvastoblob':  				'lib/canvastoblob'
	}
});

require(['phaser'], function(Phaser){
	
	require(['jquery', 'app/appcontext'], function($, AppContext){
	
		$(document).ready(function(){
			var options = {"containerTagId":"game", "scaleType":"fill", "paddingBottom":45, "minHeight":568, "minWidth":854};
			new AppContext(options).start();
		});

	});

});


