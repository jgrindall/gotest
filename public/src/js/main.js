'use strict';

require.config({
	paths: {
		'zepto': 						'lib/zepto',
		'phaser': 						'lib/phaser',
		'phaserstatetrans': 			'lib/phaser-state-transition.min',
		'phasercomponents':  			'lib/phasercomponents'
	}
});

require(['phaser'], function(Phaser){
	
	require(['phasercomponents', 'app/boot/boot', 'app/utils/implementations'], function(PhaserComponents, Boot){

		(new Boot()).start();
	
	});

});
