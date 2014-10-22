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
			var options = {"containerTagId":"game", "scaleType":"fill", "paddingBottom":45, "minHeight":570, "minWidth":880};
			new AppContext(options).start();
		});

	});

});


