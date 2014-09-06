
define('app/assets',[], function(){
	
	"use strict";
	
	var Assets = function(){
		
	};

	Assets.LOADER_BAR = 			'loaderBar';
	Assets.GRIDS = 					['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];
	Assets.MAPS = 					['map0', 'map1', 'map2'];
	Assets.TURTLE = 				'turtle';
	Assets.SOUNDS = 				['sound1', 'sound2', 'sound3', 'sound4', 'sound5'];
	Assets.CLOSE = 					'close';
	Assets.TICK = 					'tick';
	Assets.MARKER = 				'marker';
	Assets.PANEL = 					'panel';
	Assets.SMALL_PANEL = 			'smallpanel';
	Assets.ALERT = 					'alert';
	Assets.LEFT = 					'left';
	Assets.RIGHT = 					'right';
	Assets.OK_BUTTON = 				'okbutton';
	Assets.BUTTON = 				'button';
	Assets.MARKERS = 				'markers';
	Assets.SLIDERBG = 				'sliderbg';
	Assets.SLIDERHANDLE = 			'sliderhandle';
	Assets.PENS = 					'pens';
	Assets.WIDTH = 					'width';
	Assets.TOGGLE = 				'toggle';
	Assets.RADIO = 					'radio';
	Assets.BG = 					'bg';
	
	Assets.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/other/smallpanel.png",	 			"key":Assets.SMALL_PANEL,				"w":225, 	"h":250},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/markers.png", 				"key":Assets.MARKERS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/buttons.png", 				"key":Assets.BUTTON, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 					"key":Assets.CLOSE, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tick.png", 					"key":Assets.TICK, 						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/okButton.png", 				"key":Assets.OK_BUTTON, 				"w":250, 	"h":75},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Assets.MARKER, 					"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/pens/pens.png", 						"key":Assets.PENS, 						"w":160, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/pens/width.png", 					"key":Assets.WIDTH, 					"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/toggle.png", 				"key":Assets.TOGGLE, 					"w":120, 	"h":60},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/radiobutton.png", 			"key":Assets.RADIO, 					"w":120, 	"h":60}
	];
	
	Assets.SOUNDFX = [
		{"type":"sound", 		"asset":["assets/sound/sound0.mp3", "assets/sound/sound0.wav"], 			"key":Assets.SOUNDS[0]},
		{"type":"sound", 		"asset":["assets/sound/sound1.mp3", "assets/sound/sound1.wav"], 			"key":Assets.SOUNDS[1]},
		{"type":"sound", 		"asset":["assets/sound/sound2.mp3", "assets/sound/sound2.wav"], 			"key":Assets.SOUNDS[2]}
	];
	
	Assets.IMAGES = [
		{"type":"image", 		"asset":"assets/images/grids/grid0.png", 				"key":Assets.GRIDS[0]},
		{"type":"image", 		"asset":"assets/images/grids/grid1.png", 				"key":Assets.GRIDS[1]},
		{"type":"image", 		"asset":"assets/images/grids/grid2.png", 				"key":Assets.GRIDS[2]},
		{"type":"image", 		"asset":"assets/images/grids/grid3.png", 				"key":Assets.GRIDS[3]},
		{"type":"image", 		"asset":"assets/images/grids/grid4.png", 				"key":Assets.GRIDS[4]},
		{"type":"image", 		"asset":"assets/images/slider/sliderbg.png", 			"key":Assets.SLIDERBG},
		{"type":"image", 		"asset":"assets/images/slider/sliderhandle.png", 		"key":Assets.SLIDERHANDLE},
		{"type":"image", 		"asset":"assets/images/maps/map0.jpg", 					"key":Assets.MAPS[0]},
		{"type":"image", 		"asset":"assets/images/maps/map1.jpg", 					"key":Assets.MAPS[1]},
		{"type":"image", 		"asset":"assets/images/maps/map2.jpg", 					"key":Assets.MAPS[2]},
		{"type":"image", 		"asset":"assets/images/turtle/turtle.png", 				"key":Assets.TURTLE},
		{"type":"image", 		"asset":"assets/images/other/panel.png",	 			"key":Assets.PANEL},
		{"type":"image", 		"asset":"assets/images/other/alert.png",	 			"key":Assets.ALERT}
	];
	
	
	Assets.DATA = Assets.SPRITESHEETS.concat(Assets.SOUNDFX).concat(Assets.IMAGES);
	
	return Assets;

});





