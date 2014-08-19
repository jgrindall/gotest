'use strict';

require.config({
	paths: {
		jquery: 					'lib/jquery.min',
		phaser: 					'lib/phaser',
		phaserstatetrans: 			'lib/phaser-state-transition.min'
	}
});



require(['phaser'], function(Phaser){
	
	require(['app/boot/boot', 'app/utils/implementations'], function(Boot){
	
		(new Boot()).start();
	
	});

});
