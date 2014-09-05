
define('app/assets',[], function(){
	
	"use strict";
	
	var Assets = function(){
		
	};

	Assets.GRID0 = 					'grid0';
	Assets.GRID1 = 					'grid1';
	Assets.GRID2 = 					'grid2';
	Assets.GRID3 = 					'grid3';
	Assets.GRID4 = 					'grid4';
	Assets.MAP0_KEY = 				'map0';
	Assets.MAP1_KEY = 				'map1';
	Assets.MAP2_KEY = 				'map2';
	Assets.TURTLE_KEY = 			'turtle';
	Assets.LIST_KEY = 				'list';
	Assets.SOUND1_KEY = 			'sound1';
	Assets.SOUND2_KEY = 			'sound2';
	Assets.SOUND3_KEY = 			'sound3';
	Assets.SOUND4_KEY = 			'sound4';
	Assets.SOUND5_KEY = 			'sound5';
	Assets.CLOSE_KEY = 				'close';
	Assets.TICK_KEY = 				'tick';
	Assets.HOME_KEY = 				'home';
	Assets.MARKER_KEY = 			'marker';
	Assets.BLOCK_KEY0 = 			'block0';
	Assets.BLOCK_KEY1 = 			'block1';
	Assets.BLOCK_KEY2 = 			'block2';
	Assets.BLOCK_KEY3 = 			'block3';
	Assets.HERO_KEY = 				'hero';
	Assets.STAR_KEY = 				'star';
	Assets.ENEMY_KEY = 				'enemy';
	Assets.PANEL_KEY = 				'panel';
	Assets.SMALL_PANEL_KEY = 		'smallpanel';
	Assets.ALERT_KEY = 				'alert';
	Assets.LEFT_KEY = 				'left';
	Assets.RIGHT_KEY = 				'right';
	Assets.UP_KEY = 				'up';
	Assets.OK_BUTTON_KEY = 			'okbutton';
	Assets.DOWN_KEY = 				'down';
	Assets.BUTTON = 				'button';
	Assets.MARKERS = 				'markers';
	Assets.SLIDERBG = 				'sliderbg';
	Assets.SLIDERHANDLE = 			'sliderhandle';
	Assets.TAB_BUTTON0 = 			'tabbutton0';
	Assets.TAB_BUTTON1 = 			'tabbutton1';
	Assets.TAB_BUTTON2 = 			'tabbutton2';
	Assets.PENS = 					'pens';
	Assets.WIDTH = 					'width';
	Assets.TOGGLE = 				'toggle';
	Assets.RADIO = 					'radio';
	
	Assets.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/other/smallpanel.png",	 			"key":Assets.SMALL_PANEL_KEY,				"w":225, 	"h":250},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/markers.png", 				"key":Assets.MARKERS, 						"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/buttons.png", 				"key":Assets.BUTTON, 						"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton0.png", 			"key":Assets.TAB_BUTTON0, 					"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton1.png", 			"key":Assets.TAB_BUTTON1, 					"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 					"key":Assets.CLOSE_KEY, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tick.png", 					"key":Assets.TICK_KEY, 						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/okButton.png", 				"key":Assets.OK_BUTTON_KEY, 				"w":250, 	"h":75},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Assets.MARKER_KEY, 					"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/pens/pens.png", 						"key":Assets.PENS, 							"w":160, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/pens/width.png", 					"key":Assets.WIDTH, 						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/toggle.png", 				"key":Assets.TOGGLE, 						"w":120, 	"h":60},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/radiobutton.png", 			"key":Assets.RADIO, 						"w":120, 	"h":60}
	];
	
	Assets.SOUNDS = [
		{"type":"sound", 		"asset":"assets/sound/sound1.mp3", 						"key":Assets.SOUND1_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound2.mp3", 						"key":Assets.SOUND2_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound3.mp3", 						"key":Assets.SOUND3_KEY}
	];
	
	Assets.IMAGES = [
		{"type":"image", 		"asset":"assets/images/grids/grid0.png", 				"key":Assets.GRID0},
		{"type":"image", 		"asset":"assets/images/grids/grid1.png", 				"key":Assets.GRID1},
		{"type":"image", 		"asset":"assets/images/grids/grid2.png", 				"key":Assets.GRID2},
		{"type":"image", 		"asset":"assets/images/grids/grid3.png", 				"key":Assets.GRID3},
		{"type":"image", 		"asset":"assets/images/grids/grid4.png", 				"key":Assets.GRID4},
		{"type":"image", 		"asset":"assets/images/slider/sliderbg.png", 			"key":Assets.SLIDERBG},
		{"type":"image", 		"asset":"assets/images/slider/sliderhandle.png", 		"key":Assets.SLIDERHANDLE},
		{"type":"image", 		"asset":"assets/images/bg/bg0.jpg", 					"key":Assets.MAP0_KEY},
		{"type":"image", 		"asset":"assets/images/bg/bg1.jpg", 					"key":Assets.MAP1_KEY},
		{"type":"image", 		"asset":"assets/images/bg/bg2.jpg", 					"key":Assets.MAP2_KEY},
		{"type":"image", 		"asset":"assets/images/turtle/turtle.png", 				"key":Assets.TURTLE_KEY},
		{"type":"image", 		"asset":"assets/images/other/panel.png",	 			"key":Assets.PANEL_KEY},
		{"type":"image", 		"asset":"assets/images/other/alert.png",	 			"key":Assets.ALERT_KEY}
	];
	
	
	Assets.DATA = Assets.SPRITESHEETS.concat(Assets.SOUNDS).concat(Assets.IMAGES);
	
	return Assets;

});





