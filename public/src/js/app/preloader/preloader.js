
define(['app/game'], function(Game){
	
	"use strict";
	
	var Preloader = function(){
		this.numLoaded = 0;
		this.loadSignal = new Phaser.Signal();
	};

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
	Preloader.MENU_BUTTON0 = 			'menubutton0';
	Preloader.MENU_BUTTON1 = 			'menubutton1';
	Preloader.MENU_BUTTON2 = 			'menubutton2';
	Preloader.MENU_BUTTON3 = 			'menubutton3';
	Preloader.MENU_BUTTON4 = 			'menubutton4';
	Preloader.MENU_BUTTON5 = 			'menubutton5';
	Preloader.MENU_BUTTON6 = 			'menubutton6';
	Preloader.MENU_BUTTON7 = 			'menubutton7';
	Preloader.DIR_BUTTON0 = 			'dirbutton0';
	Preloader.SLIDERBG = 				'sliderbg';
	Preloader.SLIDERHANDLE = 			'sliderhandle';
	Preloader.DIR_BUTTON1 = 			'dirbutton1';
	Preloader.DIR_BUTTON2 = 			'dirbutton2';
	Preloader.DIR_BUTTON3 = 			'dirbutton3';
	Preloader.DIR_BUTTON4 = 			'dirbutton4';
	Preloader.DIR_BUTTON5 = 			'dirbutton5';
	Preloader.DIR_BUTTON6 = 			'dirbutton6';
	Preloader.DIR_BUTTON7 = 			'dirbutton7';
	Preloader.DIR_BUTTON8 = 			'dirbutton8';
	Preloader.KEY_BUTTON1 = 			'keybutton1';
	Preloader.KEY_BUTTON2 = 			'keybutton2';
	Preloader.KEY_BUTTON3 = 			'keybutton3';
	Preloader.KEY_BUTTON4 = 			'keybutton4';
	Preloader.KEY_BUTTON5 = 			'keybutton5';
	Preloader.KEY_BUTTON6 = 			'keybutton6';
	Preloader.KEY_BUTTON7 = 			'keybutton7';
	Preloader.KEY_BUTTON8 = 			'keybutton8';
	Preloader.KEY_BUTTON9 = 			'keybutton9';
	Preloader.TAB_BUTTON0 = 			'tabbutton0';
	Preloader.TAB_BUTTON1 = 			'tabbutton1';
	Preloader.TAB_BUTTON2 = 			'tabbutton2';
	Preloader.LEVEL_BUTTON = 			'levelbutton';
	Preloader.LEVEL_BUTTON_DONE = 		'levelbuttondone';
	Preloader.LEVEL_BUTTON_LOCKED = 	'levelbuttonlocked';
	Preloader.KILLAREA = 				'killarea';
	Preloader.PENS = 					'pens';
	
	Preloader.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButton.png", 			"key":Preloader.LEVEL_BUTTON, 				"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton0.png", 		"key":Preloader.DIR_BUTTON0, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton1.png", 		"key":Preloader.DIR_BUTTON1, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton2.png", 		"key":Preloader.DIR_BUTTON2, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton3.png", 		"key":Preloader.DIR_BUTTON3, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton4.png", 		"key":Preloader.DIR_BUTTON4, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton5.png", 		"key":Preloader.DIR_BUTTON5, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton6.png", 		"key":Preloader.DIR_BUTTON6, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton7.png", 		"key":Preloader.DIR_BUTTON7, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/dir/dirbutton8.png", 		"key":Preloader.DIR_BUTTON8, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton1.png", 		"key":Preloader.KEY_BUTTON1, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton2.png", 		"key":Preloader.KEY_BUTTON2, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton3.png", 		"key":Preloader.KEY_BUTTON3, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton4.png", 		"key":Preloader.KEY_BUTTON4, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton5.png", 		"key":Preloader.KEY_BUTTON5, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton6.png", 		"key":Preloader.KEY_BUTTON6, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton7.png", 		"key":Preloader.KEY_BUTTON7, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton8.png", 		"key":Preloader.KEY_BUTTON8, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/key/keybutton9.png", 		"key":Preloader.KEY_BUTTON9, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton0.png", 		"key":Preloader.MENU_BUTTON0, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton1.png", 		"key":Preloader.MENU_BUTTON1, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton2.png", 		"key":Preloader.MENU_BUTTON2, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton3.png", 		"key":Preloader.MENU_BUTTON3, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton4.png", 		"key":Preloader.MENU_BUTTON4, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton5.png", 		"key":Preloader.MENU_BUTTON5, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton6.png", 		"key":Preloader.MENU_BUTTON6, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/menu/menubutton7.png", 		"key":Preloader.MENU_BUTTON7, 				"w":52, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonDone.png", 		"key":Preloader.LEVEL_BUTTON_DONE, 			"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/levelButtonLocked.png", 		"key":Preloader.LEVEL_BUTTON_LOCKED, 		"w":150, 	"h":150},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton0.png", 			"key":Preloader.TAB_BUTTON0, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton1.png", 			"key":Preloader.TAB_BUTTON1, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tabbutton2.png", 			"key":Preloader.TAB_BUTTON2, 				"w":244, 	"h":52},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 					"key":Preloader.CLOSE_KEY, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tick.png", 					"key":Preloader.TICK_KEY, 					"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/okButton.png", 				"key":Preloader.OK_BUTTON_KEY, 				"w":250, 	"h":75},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/greenHome.png", 				"key":Preloader.HOME_KEY, 					"w":120, 	"h":120},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Preloader.MARKER_KEY, 				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/pens.png", 							"key":Preloader.PENS, 						"w":160, 	"h":80}
	];
	
	Preloader.SOUNDS = [
		{"type":"sound", 		"asset":"assets/sound/sound1.mp3", 						"key":Preloader.SOUND1_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound2.mp3", 						"key":Preloader.SOUND2_KEY},
		{"type":"sound", 		"asset":"assets/sound/sound3.mp3", 						"key":Preloader.SOUND3_KEY}
	];
	
	Preloader.IMAGES = [
		{"type":"image", 		"asset":"assets/images/slider/sliderbg.png", 			"key":Preloader.SLIDERBG},
		{"type":"image", 		"asset":"assets/images/slider/sliderhandle.png", 		"key":Preloader.SLIDERHANDLE},
		{"type":"image", 		"asset":"assets/images/bg/paris.jpg", 					"key":Preloader.MAP0_KEY},
		{"type":"image", 		"asset":"assets/images/bg/london.jpg", 					"key":Preloader.MAP1_KEY},
		{"type":"image", 		"asset":"assets/images/bg/paris.jpg", 					"key":Preloader.MAP2_KEY},
		{"type":"image", 		"asset":"assets/images/turtle.png", 					"key":Preloader.TURTLE_KEY},
		{"type":"image", 		"asset":"assets/images/other/panel.png",	 			"key":Preloader.PANEL_KEY},
		{"type":"image", 		"asset":"assets/images/other/smallpanel.png",	 		"key":Preloader.SMALL_PANEL_KEY},
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





