'use strict';

require.config({
	paths: {
		jquery: 					'lib/jquery.min',
		phaser: 					'lib/phaser.min',
		phaserstatetrans: 			'lib/phaser-state-transition.min'
	}
});



require(['phaser'], function(){

	require(['app/boot/boot', 'app/utils/implementations'], function(Boot){
	
		Boot.start();
	
	});

});
