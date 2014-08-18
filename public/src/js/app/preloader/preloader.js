
define(['app/consts/leveldata', 'app/game'], function(LevelData, Game){
	
	"use strict";
	
	var Preloader = function(){
		this.numLoaded = 0;
		this.loadSignal = new Phaser.Signal();
	};

	Preloader.BG_KEY = 					'background';
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
	Preloader.LEVEL1_JSON_KEY = 		'level1';
	Preloader.LEVEL1_TILES_KEY = 		'tiles1';
	Preloader.PANEL_KEY = 				'panel';
	Preloader.ALERT_KEY = 				'alert';
	Preloader.LEFT_KEY = 				'left';
	Preloader.RIGHT_KEY = 				'right';
	Preloader.UP_KEY = 					'up';
	Preloader.DOWN_KEY = 				'down';
	Preloader.TAB_BUTTON0 = 			'tabbutton0';
	Preloader.TAB_BUTTON1 = 			'tabbutton1';
	Preloader.TAB_BUTTON2 = 			'tabbutton2';
	Preloader.LEVEL_BUTTON = 			'levelbutton';
	Preloader.LEVEL_BUTTON_DONE = 		'levelbuttondone';
	Preloader.LEVEL_BUTTON_LOCKED = 	'levelbuttonlocked';
	Preloader.KILLAREA = 				'killarea';
	
	Preloader.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButton.png", 			"key":Preloader.LEVEL_BUTTON, 				"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonDone.png", 		"key":Preloader.LEVEL_BUTTON_DONE, 			"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonLocked.png", 		"key":Preloader.LEVEL_BUTTON_LOCKED, 		"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton0.png", 			"key":Preloader.TAB_BUTTON0, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton1.png", 			"key":Preloader.TAB_BUTTON1, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton2.png", 			"key":Preloader.TAB_BUTTON2, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yellowLeft.png", 			"key":Preloader.LEFT_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yellowRight.png", 			"key":Preloader.RIGHT_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yellowUp.png", 				"key":Preloader.UP_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yellowDown.png", 			"key":Preloader.DOWN_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 					"key":Preloader.CLOSE_KEY, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tick.png", 					"key":Preloader.TICK_KEY, 					"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yellowList.png", 			"key":Preloader.LIST_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/greenHome.png", 				"key":Preloader.HOME_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/game/dude.png", 						"key":Preloader.HERO_KEY, 					"w":32, 	"h":48},
		{"type":"spritesheet", 	"asset":"assets/images/game/enemy.png", 					"key":Preloader.ENEMY_KEY, 					"w":32, 	"h":32},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Preloader.MARKER_KEY, 				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/game/firstaid.png", 					"key":Preloader.KILLAREA, 					"w":32, 	"h":32},
		
	];
	
	Preloader.SOUNDS = [
		{"type":"sound", 		"asset":"assets/sound/sound1.mp3", 						"key":Preloader.SOUND1_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound2.mp3", 						"key":Preloader.SOUND2_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound3.mp3", 						"key":Preloader.SOUND3_KEY}
	];
	
	Preloader.IMAGES = [
		{"type":"image", 		"asset":"assets/images/bg/background2.png", 			"key":Preloader.BG_KEY},
		{"type":"image", 		"asset":LevelData.BLOCK0, 								"key":Preloader.BLOCK_KEY0},
		{"type":"image", 		"asset":LevelData.BLOCK1, 								"key":Preloader.BLOCK_KEY1},
		{"type":"image", 		"asset":LevelData.BLOCK2, 								"key":Preloader.BLOCK_KEY2},
		{"type":"image", 		"asset":LevelData.BLOCK3, 								"key":Preloader.BLOCK_KEY3},
		{"type":"image", 		"asset":"assets/images/game/star2.png", 				"key":Preloader.STAR_KEY},
		{"type":"image", 		"asset":"assets/levels/tiles1.png",	 					"key":Preloader.LEVEL1_TILES_KEY},
		{"type":"image", 		"asset":"assets/images/other/panel.png",	 			"key":Preloader.PANEL_KEY},
		{"type":"image", 		"asset":"assets/images/other/alert.png",	 			"key":Preloader.ALERT_KEY}
	];
	
	Preloader.TILES = [
		{"type":"tilemap", 		"asset":"assets/levels/level1.json", 					"key":Preloader.LEVEL1_JSON_KEY}
	];
	
	Preloader.DATA = Preloader.SPRITESHEETS.concat(Preloader.SOUNDS).concat(Preloader.IMAGES).concat(Preloader.TILES);
	
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
		game.load.onFileComplete.add($.proxy(this.fileLoaded, this));
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





