
define(['app/consts/turtles'], function(Turtles){
	
	"use strict";
	
	var Assets = function(){
		
	};

	Assets.LOADER_BAR = 			'loaderBar';
	Assets.GRIDS = 					['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];
	Assets.MAPS = 					['map0', 'map1', 'map2', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8', 'map9', 'map10', 'map11'];
	Assets.TURTLES = 				['turtle0', 'turtle1', 'turtle2', 'turtle3', 'turtle4', 'turtle5', 'turtle6', 'turtle7', 'turtle8', 'turtle9'];
	Assets.TURTLE_CHOICE = 			'turtleChoice';
	Assets.MOVER = 					'mover';
	Assets.TOPBAR = 				'topBar';
	Assets.CORNERS = 				'corners';
	Assets.CORNERSX = 				'cornersx';
	Assets.SOUNDS = 				['clickdown', 'clickup', 'swooshdown', 'swooshup'];
	Assets.CLOSE = 					'close';
	Assets.CLEAR = 					'clear';
	Assets.MARKER = 				'marker';
	Assets.CHALLENGES = 			'challenges';
	Assets.PANEL = 					'panel';
	Assets.SPEEDDECOR = 			'speeddecor';
	Assets.GAME_SCREEN = 			'gamescreen';
	Assets.TOOLTIPS = 				['tooltip0', 'tooltip1', 'tooltip2', 'tooltip3', 'tooltip4', 'tooltip5'];
	Assets.TOOLTIP_IMAGES = 		['tooltipImage0'];
	Assets.ALERT = 					'alert';
	Assets.IPAD = 					'ipad';
	Assets.VSCROLLBAR =				'vscrollbar';
	Assets.LEFT = 					'left';
	Assets.RIGHT = 					'right';
	Assets.OK_BUTTON = 				'okbutton';
	Assets.ADD_BUTTON = 			'addbutton';
	Assets.NEXT_BUTTON = 			'nextbutton';
	Assets.START_BUTTON = 			'startbutton';
	Assets.SKIP_BUTTON = 			'skipbutton';
	Assets.PLAY_BUTTON =			'playButton';
	Assets.STOP_BUTTON =			'stopButton';
	Assets.CHALLENGE_BUTTON =		'challengeButton';
	Assets.DRAG_ARROW = 			'dragarrow';
	Assets.BUTTON = 				'button';
	Assets.CONTROL_BAR =			'controlbar';
	Assets.DRAG_DOMAIN =			'dragDomain';
	Assets.PROG_NUM =				'progNum';
	Assets.ARROWS = 				'arrows';
	Assets.LEFTRIGHT = 				'leftright';
	Assets.SETTINGS1 = 				'settings1';
	Assets.SETTINGS2 = 				'settings2';
	Assets.SETTINGS3 = 				'settings3';
	Assets.KEYS = 					'keys';
	Assets.MARKERS = 				'markers';
	Assets.TAB_BUTTON = 			'tabbutton';
	Assets.SLIDERBG = 				'sliderbg';
	Assets.SLIDERHL = 				'sliderhl';
	Assets.SLIDERHANDLE = 			'sliderhandle';
	Assets.WIDTHBGS = 				['widthbg0', 'widthbg1', 'widthbg2', 'widthbg3', 'widthbg4', 'widthbg5', 'widthbg6', 'widthbg7', 'widthbg8', 'widthbg9', 'widthbg10'];
	Assets.WIDTHHANDLE = 			'widthhandle';
	Assets.WIDTHBGS2 = 				['widthbg20', 'widthbg21', 'widthbg22', 'widthbg23', 'widthbg24', 'widthbg25', 'widthbg26', 'widthbg27', 'widthbg28', 'widthbg29', 'widthbg210'];
	Assets.WIDTHHANDLE2 = 			'widthhandle2';
	Assets.DRAG_TARGET =			'dragtarget';
	Assets.DRAG_TARGET_SMALL =		'dragtargetsmall';
	Assets.PENS = 					'pens';
	Assets.TOGGLE = 				'toggle';
	Assets.RADIO = 					'radio';
	Assets.BG = 					'bg';
	Assets.YES = 					'yes';
	Assets.SMILE = 					'smile';
	Assets.BRAND = 					'brand';
	
	Assets.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle0.png", 				"key":Assets.TURTLES[0],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle1.png", 				"key":Assets.TURTLES[1],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle2.png", 				"key":Assets.TURTLES[2],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle3.png", 				"key":Assets.TURTLES[3],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle4.png", 				"key":Assets.TURTLES[4],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle5.png", 				"key":Assets.TURTLES[5],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle6.png", 				"key":Assets.TURTLES[6],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle7.png", 				"key":Assets.TURTLES[7],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle8.png", 				"key":Assets.TURTLES[8],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtle9.png", 				"key":Assets.TURTLES[9],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/tab.png",	 				"key":Assets.TAB_BUTTON,				"w":100, 	"h":30},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/yes.png",	 				"key":Assets.YES,						"w":73, 	"h":73},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/turtles.png",	 				"key":Assets.TURTLE_CHOICE,				"w":45, 	"h":45},
		{"type":"spritesheet", 	"asset":"assets/images/prog/dragtarget.png",	 			"key":Assets.DRAG_TARGET,				"w":150, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/prog/dragtargetsmall.png",	 		"key":Assets.DRAG_TARGET_SMALL,			"w":80, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/prog/controlbar.png",	 			"key":Assets.CONTROL_BAR,				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/prog/dragarrows.png",	 			"key":Assets.DRAG_ARROW,				"w":32, 	"h":32},
		{"type":"spritesheet", 	"asset":"assets/images/screens/smallpanel.png",	 			"key":Assets.GAME_SCREEN,				"w":225, 	"h":250},
		{"type":"spritesheet", 	"asset":"assets/images/settings/settings1.png",	 			"key":Assets.SETTINGS1,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"assets/images/settings/settings2.png",	 			"key":Assets.SETTINGS2,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"assets/images/settings/settings3.png",	 			"key":Assets.SETTINGS3,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/markers.png", 				"key":Assets.MARKERS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/prognum.png", 				"key":Assets.PROG_NUM, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/buttons.png", 				"key":Assets.BUTTON, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/arrows.png", 				"key":Assets.ARROWS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/leftright.png", 				"key":Assets.LEFTRIGHT, 				"w":60, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/keys.png", 					"key":Assets.KEYS, 						"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/close.png", 					"key":Assets.CLOSE, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/clear.png", 					"key":Assets.CLEAR, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/okButton.png", 				"key":Assets.OK_BUTTON, 				"w":180, 	"h":100},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/next.png", 					"key":Assets.NEXT_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/start.png", 					"key":Assets.START_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/skip.png", 					"key":Assets.SKIP_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/play.png", 					"key":Assets.PLAY_BUTTON, 				"w":100, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/stop.png", 					"key":Assets.STOP_BUTTON, 				"w":100, 	"h":50},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/addMyButton.png", 			"key":Assets.ADD_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/challengebutton.png", 		"key":Assets.CHALLENGE_BUTTON, 			"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/pagination.png", 			"key":Assets.MARKER, 					"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/pens/pens.png", 						"key":Assets.PENS, 						"w":235, 	"h":125},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/toggle.png", 				"key":Assets.TOGGLE, 					"w":120, 	"h":60},
		{"type":"spritesheet", 	"asset":"assets/images/buttons/radiobutton.png", 			"key":Assets.RADIO, 					"w":100, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/maps/cornersx.png",	 				"key":Assets.CORNERSX,					"w":5, 		"h":5},
		{"type":"spritesheet", 	"asset":"assets/images/slider/decor.png",	 				"key":Assets.SPEEDDECOR,				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"assets/images/turtle/mover.png", 					"key":Assets.MOVER,						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"assets/images/challenges/challenges.png", 			"key":Assets.CHALLENGES,				"w":175, 	"h":175}
	];
	
	Assets.SOUNDFX = [
		{"type":"sound", 		"asset":["assets/sound/click0.mp3", "assets/sound/click0.wav"], 			"key":Assets.SOUNDS[0]},
		{"type":"sound", 		"asset":["assets/sound/click1.mp3", "assets/sound/click1.wav"], 			"key":Assets.SOUNDS[1]},
		{"type":"sound", 		"asset":["assets/sound/swoosh0.mp3", "assets/sound/swoosh0.wav"], 			"key":Assets.SOUNDS[2]},
		{"type":"sound", 		"asset":["assets/sound/swoosh1.mp3", "assets/sound/swoosh1.wav"], 			"key":Assets.SOUNDS[3]}
	];
	
	Assets.IMAGES = [
		{"type":"image", 		"asset":"assets/images/buttons/smile.png",	 			"key":Assets.SMILE},
		{"type":"image", 		"asset":"assets/images/bg/topbar.png", 					"key":Assets.TOPBAR},
		{"type":"image", 		"asset":"assets/images/popups/tooltip0.png",	 		"key":Assets.TOOLTIPS[0]},
		{"type":"image", 		"asset":"assets/images/popups/tooltip1.png",	 		"key":Assets.TOOLTIPS[1]},
		{"type":"image", 		"asset":"assets/images/popups/tooltip2.png",	 		"key":Assets.TOOLTIPS[2]},
		{"type":"image", 		"asset":"assets/images/popups/tooltip3.png",	 		"key":Assets.TOOLTIPS[3]},
		{"type":"image", 		"asset":"assets/images/popups/tooltip4.png",	 		"key":Assets.TOOLTIPS[4]},
		{"type":"image", 		"asset":"assets/images/popups/tooltip5.png",	 		"key":Assets.TOOLTIPS[5]},
		{"type":"image", 		"asset":"assets/images/popups/tooltipImages0.png",	 	"key":Assets.TOOLTIP_IMAGES[0]},
		{"type":"image", 		"asset":"assets/images/grids/grid0.png", 				"key":Assets.GRIDS[0]},
		{"type":"image", 		"asset":"assets/images/grids/grid1.png", 				"key":Assets.GRIDS[1]},
		{"type":"image", 		"asset":"assets/images/grids/grid2.png", 				"key":Assets.GRIDS[2]},
		{"type":"image", 		"asset":"assets/images/grids/grid3.png", 				"key":Assets.GRIDS[3]},
		{"type":"image", 		"asset":"assets/images/grids/grid4.png", 				"key":Assets.GRIDS[4]},
		{"type":"image", 		"asset":"assets/images/slider/sliderbg.png", 			"key":Assets.SLIDERBG},
		{"type":"image", 		"asset":"assets/images/slider/sliderhl.png", 			"key":Assets.SLIDERHL},
		{"type":"image", 		"asset":"assets/images/slider/sliderhandle.png", 		"key":Assets.SLIDERHANDLE},
		{"type":"image", 		"asset":"assets/images/pens/widthbg0.png", 				"key":Assets.WIDTHBGS[0]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg1.png", 				"key":Assets.WIDTHBGS[1]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg2.png", 				"key":Assets.WIDTHBGS[2]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg3.png", 				"key":Assets.WIDTHBGS[3]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg4.png", 				"key":Assets.WIDTHBGS[4]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg5.png", 				"key":Assets.WIDTHBGS[5]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg6.png", 				"key":Assets.WIDTHBGS[6]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg7.png", 				"key":Assets.WIDTHBGS[7]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg8.png", 				"key":Assets.WIDTHBGS[8]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg9.png", 				"key":Assets.WIDTHBGS[9]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg10.png", 			"key":Assets.WIDTHBGS[10]},
		{"type":"image", 		"asset":"assets/images/pens/widthhandle.png", 			"key":Assets.WIDTHHANDLE},
		{"type":"image", 		"asset":"assets/images/pens/widthbg20.png", 			"key":Assets.WIDTHBGS2[0]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg21.png", 			"key":Assets.WIDTHBGS2[1]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg22.png", 			"key":Assets.WIDTHBGS2[2]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg23.png", 			"key":Assets.WIDTHBGS2[3]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg24.png", 			"key":Assets.WIDTHBGS2[4]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg25.png", 			"key":Assets.WIDTHBGS2[5]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg26.png", 			"key":Assets.WIDTHBGS2[6]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg27.png", 			"key":Assets.WIDTHBGS2[7]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg28.png", 			"key":Assets.WIDTHBGS2[8]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg29.png", 			"key":Assets.WIDTHBGS2[9]},
		{"type":"image", 		"asset":"assets/images/pens/widthbg210.png", 			"key":Assets.WIDTHBGS2[10]},
		{"type":"image", 		"asset":"assets/images/pens/widthhandle2.png", 			"key":Assets.WIDTHHANDLE2},
		{"type":"image", 		"asset":"assets/images/maps/map0.png", 					"key":Assets.MAPS[0]},
		{"type":"image", 		"asset":"assets/images/maps/map1.png", 					"key":Assets.MAPS[1]},
		{"type":"image", 		"asset":"assets/images/maps/map2.png", 					"key":Assets.MAPS[2]},
		{"type":"image", 		"asset":"assets/images/maps/map3.png", 					"key":Assets.MAPS[3]},
		{"type":"image", 		"asset":"assets/images/maps/map4.png", 					"key":Assets.MAPS[4]},
		{"type":"image", 		"asset":"assets/images/maps/map5.png", 					"key":Assets.MAPS[5]},
		{"type":"image", 		"asset":"assets/images/maps/map6.png", 					"key":Assets.MAPS[6]},
		{"type":"image", 		"asset":"assets/images/maps/map7.png", 					"key":Assets.MAPS[7]},
		{"type":"image", 		"asset":"assets/images/maps/map8.png", 					"key":Assets.MAPS[8]},
		{"type":"image", 		"asset":"assets/images/maps/map9.png", 					"key":Assets.MAPS[9]},
		{"type":"image", 		"asset":"assets/images/maps/map10.png", 				"key":Assets.MAPS[10]},
		{"type":"image", 		"asset":"assets/images/maps/map11.png", 				"key":Assets.MAPS[11]},
		{"type":"image", 		"asset":"assets/images/popups/panel.png",	 			"key":Assets.PANEL},
		{"type":"image", 		"asset":"assets/images/popups/ipad.png",	 			"key":Assets.IPAD},
		{"type":"image", 		"asset":"assets/images/popups/alert.png",	 			"key":Assets.ALERT},
		{"type":"image", 		"asset":"assets/images/maps/corners.jpg",	 			"key":Assets.CORNERS},
		{"type":"image", 		"asset":"assets/images/prog/dragdomains.png",	 		"key":Assets.DRAG_DOMAIN},
		{"type":"image", 		"asset":"assets/images/scroll/vscrollbar.png",	 		"key":Assets.VSCROLLBAR},
		{"type":"image", 		"asset":"assets/images/bg/2s_logo.png",	 				"key":Assets.BRAND}
	];
	
	
	Assets.DATA = Assets.SPRITESHEETS.concat(Assets.SOUNDFX).concat(Assets.IMAGES);
	
	return Assets;

});





