'use strict';

require.config({
	paths: {
		jquery: 					'lib/jquery.min',
		phaser: 					'lib/phaser',
		phaserstatetrans: 			'lib/phaser-state-transition.min',
		phasercomponents:  			'lib/phasercomponents',
		underscore:  				'lib/underscore'
	}
});

requirejs.onResourceLoad = function (context, map, depArray) {
	
};

require(['phaser'], function(Phaser){
	
	require(['phasercomponents', 'app/boot/boot', 'app/utils/implementations'], function(PhaserComponents, Boot){
		
		alert(PhaserComponents.Test);

		(new Boot()).start();
	
	});

});
