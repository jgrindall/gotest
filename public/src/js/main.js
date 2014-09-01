'use strict';

require.config({
	paths: {
		jquery: 					'lib/jquery.min',
		phaser: 					'lib/phaser',
		phaserstatetrans: 			'lib/phaser-state-transition.min'
	}
});

requirejs.onResourceLoad = function (context, map, depArray) {
	
};

require(['phaser'], function(Phaser){
	
	require(['app/boot/boot', 'app/utils/implementations'], function(Boot){
	
		(new Boot()).start();
	
	});

});
