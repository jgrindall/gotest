'use strict';

require.config({
	paths: {
		'jquery': 						'lib/zepto',
		'html2canvas': 					'lib/html2canvas',
		'phaser': 						'lib/phaser',
		'phaserstatetrans': 			'lib/phaser-state-transition.min',
		'phasercomponents':  			'lib/phasercomponents',
		'filesaver':  					'lib/filesaver'
	}
});

require(['phaser'], function(Phaser){
	
	alert("before app loaded, window.$ is ", window.$);

	alert("window.jquery is ", window.jquery);

	require(['jquery', 'app/appcontext'], function($, AppContext){
	
		$(document).ready(function(){
			var options = {"containerTagId":"game", "scaleType":"fill", "paddingBottom":45, "minHeight":570, "minWidth":860};
			new AppContext(options).start();
		});

	});

});


