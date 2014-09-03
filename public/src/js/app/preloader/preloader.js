
define('app/preloader/preloader',['phaser', 'app/game'], function(Phaser, Game){
	
	"use strict";
	
	var Preloader = function(){
		this.numLoaded = 0;
		this.loadSignal = new Phaser.Signal();
	};

	Preloader.GRID0 = 					'grid0';
	Preloader.GRID1 = 					'grid1';
	Preloader.MAP0_KEY = 				'map0';
	Preloader.MAP1_KEY = 				'map1';
	Preloader.MAP2_KEY = 				'map2';
	Preloader.TURTLE_KEY = 				'turtle';
	Preloader.LIST_KEY = 				'list';
	Preloader.SOUND1_KEY = 				'sound1';
	Preloader.SOUND2_KEY = 				'sound2';
	Preloader.SOUND3_KEY = 				'sound3';
	Preloader.SOUND4_KEY = 				'sound4';
	Preloader.SOUND5_KEY = 				'sound5';
	Preloader.CLOSE_KEY = 				'close';
	Preloader.TICK_KEY = 				'tick';
	Preloader.HOME_KEY = 				'home';
	Preloader.MARKER_KEY = 				'marker';
	Preloader.BLOCK_KEY0 = 				'block0';
	Preloader.BLOCK_KEY1 = 				'block1';
	Preloader.BLOCK_KEY2 = 				'block2';
	Preloader.BLOCK_KEY3 = 				'block3';
	Preloader.HERO_KEY = 				'hero';
	Preloader.STAR_KEY = 				'star';
	Preloader.ENEMY_KEY = 				'enemy';
	Preloader.PANEL_KEY = 				'panel';
	Preloader.SMALL_PANEL_KEY = 		'smallpanel';
	Preloader.ALERT_KEY = 				'alert';
	Preloader.LEFT_KEY = 				'left';
	Preloader.RIGHT_KEY = 				'right';
	Preloader.UP_KEY = 					'up';
	Preloader.OK_BUTTON_KEY = 			'okbutton';
	Preloader.DOWN_KEY = 				'down';
	Preloader.BUTTON = 					'button';
	Preloader.MARKERS = 				'markers';
	Preloader.SLIDERBG = 				'sliderbg';
	Preloader.SLIDERHANDLE = 			'sliderhandle';
	Preloader.TAB_BUTTON0 = 			'tabbutton0';
	Preloader.TAB_BUTTON1 = 			'tabbutton1';
	Preloader.TAB_BUTTON2 = 			'tabbutton2';
	Preloader.LEVEL_BUTTON = 			'levelbutton';
	Preloader.LEVEL_BUTTON_DONE = 		'levelbuttondone';
	Preloader.LEVEL_BUTTON_LOCKED = 		'levelbuttonlocked';
	Preloader.KILLAREA = 				'killarea';
	Preloader.PENS = 					'pens';
	Preloader.WIDTH = 					'width';
	Preloader.TOGGLE = 					'toggle';
	
	Preloader.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/other/smallpanel.png",	 			"key":Preloader.SMALL_PANEL_KEY,				"w":225, 	"h":250},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/markers.png", 				"key":Preloader.MARKERS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButton.png", 			"key":Preloader.LEVEL_BUTTON, 				"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/buttons.png", 				"key":Preloader.BUTTON, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonDone.png", 			"key":Preloader.LEVEL_BUTTON_DONE, 				"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonLocked.png", 		"key":Preloader.LEVEL_BUTTON_LOCKED, 			"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton0.png", 			"key":Preloader.TAB_BUTTON0, 					"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton1.png", 			"key":Preloader.TAB_BUTTON1, 					"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 				"key":Preloader.CLOSE_KEY, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tick.png", 				"key":Preloader.TICK_KEY, 					"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/okButton.png", 				"key":Preloader.OK_BUTTON_KEY, 				"w":250, 	"h":75},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Preloader.MARKER_KEY, 					"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/pens/pens.png", 					"key":Preloader.PENS, 						"w":160, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/pens/width.png", 					"key":Preloader.WIDTH, 						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/toggle.png", 					"key":Preloader.TOGGLE, 						"w":120, 	"h":60}
	];
	
	Preloader.SOUNDS = [
		{"type":"sound", 		"asset":"assets/sound/sound1.mp3", 						"key":Preloader.SOUND1_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound2.mp3", 						"key":Preloader.SOUND2_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound3.mp3", 						"key":Preloader.SOUND3_KEY}
	];
	
	Preloader.IMAGES = [
		{"type":"image", 		"asset":"assets/images/grids/grid0.png", 			"key":Preloader.GRID0},
		{"type":"image", 		"asset":"assets/images/grids/grid1.png", 			"key":Preloader.GRID1},
		{"type":"image", 		"asset":"assets/images/slider/sliderbg.png", 			"key":Preloader.SLIDERBG},
		{"type":"image", 		"asset":"assets/images/slider/sliderhandle.png", 		"key":Preloader.SLIDERHANDLE},
		{"type":"image", 		"asset":"assets/images/bg/bg0.jpg", 				"key":Preloader.MAP0_KEY},
		{"type":"image", 		"asset":"assets/images/bg/bg1.jpg", 				"key":Preloader.MAP1_KEY},
		{"type":"image", 		"asset":"assets/images/bg/bg2.jpg", 				"key":Preloader.MAP2_KEY},
		{"type":"image", 		"asset":"assets/images/turtle/turtle.png", 			"key":Preloader.TURTLE_KEY},
		{"type":"image", 		"asset":"assets/images/other/panel.png",	 			"key":Preloader.PANEL_KEY},
		{"type":"image", 		"asset":"assets/images/other/alert.png",	 			"key":Preloader.ALERT_KEY}
	];
	
	
	Preloader.DATA = Preloader.SPRITESHEETS.concat(Preloader.SOUNDS).concat(Preloader.IMAGES);
	
	Preloader.prototype.loadNext = function(){
		var obj, type, game;
		game = Game.getInstance();
		obj = Preloader.DATA[this.numLoaded];
		type = obj.type;
		if(type === "image"){
			game.load.image(obj.key, obj.asset);
		}
		else if(type === "spritesheet"){
			game.load.spritesheet(obj.key, obj.asset, obj.w, obj.h);
		}
		else if(type === "tilemap"){
			game.load.tilemap(obj.key, obj.asset, null, Phaser.Tilemap.TILED_JSON);
		}
		else if(type === "sound"){
			game.load.audio(obj.key, [obj.asset]);
		}
	};
	
	Preloader.prototype.start = function(){
		var game = Game.getInstance();
		game.load.onFileComplete.add(this.fileLoaded.bind(this));
		this.loadNext();
	};

	Preloader.prototype.fileLoaded = function() {
		this.numLoaded++;
		this.loadSignal.dispatch({"numLoaded":this.numLoaded, "total":Preloader.DATA.length});
		if(this.numLoaded < Preloader.DATA.length){
			this.loadNext();
		}
	};

	Preloader.prototype.destroy = function() {
		this.loadSignal = null;
	};
	
	return Preloader;

});





