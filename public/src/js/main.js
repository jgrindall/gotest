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
	
	require(['app/boot/boot'], function(Boot){

		(new Boot()).start();
	
	});

});
