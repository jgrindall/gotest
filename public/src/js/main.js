'use strict';

require.NUM_SCRIPTS = 0;

require.config({
	paths: {
		jquery: 					'lib/jquery.min',
		phaser: 					'lib/phaser',
		phaserstatetrans: 			'lib/phaser-state-transition.min'
	}
});

requirejs.onResourceLoad = function (context, map, depArray) {
	console.log("loaded script "+map.name+" \t\t\t\t\t\t\t\t\t\t\t#dep = "+depArray.length);
	require.NUM_SCRIPTS++;
};

require(['phaser'], function(Phaser){
	
	require(['app/boot/boot', 'app/utils/implementations'], function(Boot){
	
		console.log("require.NUM_SCRIPTS "+require.NUM_SCRIPTS);
		
		(new Boot()).start();


	
	});

});
