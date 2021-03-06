
define(['base/appsettings', 'base/consts/turtles'],

	function(AppSettings, Turtles){
	
	"use strict";
	
	var Assets = function(){
		
	};

	Assets.PATH = "/scripts/2go/assets/";

	if(AppSettings.LIVE){
		Assets.BASE_PATH =				(window.location.origin || (window.location.protocol + '//' + window.location.hostname)) + Assets.PATH;
	}
	else{
		Assets.BASE_PATH =				window.location.protocol + '//' + window.location.hostname + ":" + window.location.port + "/src" + Assets.PATH;
	}

	console.log("USING BASE_PATH " + Assets.BASE_PATH);

	Assets.LOADER_BAR = 			'loaderBar';
	Assets.GRIDS = 					['grid0', 'grid1', 'grid2', 'grid3'];
	Assets.MAPS = 					['map0', 'map1', 'map2', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8', 'map9', 'map10', 'map11', 'map12', 'map13', 'map14', 'map15', 'map16', 'map17'];
	Assets.TURTLES = 				['turtle0', 'turtle1', 'turtle2', 'turtle3', 'turtle4', 'turtle5', 'turtle6', 'turtle7', 'turtle8', 'turtle9'];
	Assets.TURTLE_CHOICE = 			'turtleChoice';
	Assets.BASE = 					'base';
	Assets.MOVER = 					'mover';
	Assets.TOPBAR = 				'topBar';
	Assets.CORNERS = 				'corners';
	Assets.CORNERSX = 				'cornersx';
	Assets.SOUNDS = 				['clickdown', 'clickup', 'swooshdown', 'swooshup', 'tinkle'];
	Assets.HELP_SOUND = 			'helpsound';
	Assets.CHALLENGE_SOUNDS = 		['challenge0', 'challenge1', 'challenge2', 'challenge3', 'challenge4', 'challenge5', 'challenge6', 'challenge7'];
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
	Assets.VOICEOVER =				'voiceover';
	
	Assets.SPRITESHEETS = [
		{"type":"spritesheet", 	"asset":"images/turtle/turtle0.png", 				"key":Assets.TURTLES[0],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle1.png", 				"key":Assets.TURTLES[1],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle2.png", 				"key":Assets.TURTLES[2],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle3.png", 				"key":Assets.TURTLES[3],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle4.png", 				"key":Assets.TURTLES[4],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle5.png", 				"key":Assets.TURTLES[5],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle6.png", 				"key":Assets.TURTLES[6],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle7.png", 				"key":Assets.TURTLES[7],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle8.png", 				"key":Assets.TURTLES[8],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/turtle/turtle9.png", 				"key":Assets.TURTLES[9],				"w":Turtles.WIDTH, 	"h":Turtles.HEIGHT},
		{"type":"spritesheet", 	"asset":"images/buttons/tab.png",	 				"key":Assets.TAB_BUTTON,				"w":100, 	"h":30},
		{"type":"spritesheet", 	"asset":"images/buttons/yes.png",	 				"key":Assets.YES,						"w":73, 	"h":73},
		{"type":"spritesheet", 	"asset":"images/turtle/turtles.png",	 				"key":Assets.TURTLE_CHOICE,				"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/prog/dragtarget.png",	 			"key":Assets.DRAG_TARGET,				"w":150, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/prog/dragtargetsmall.png",	 		"key":Assets.DRAG_TARGET_SMALL,			"w":80, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/prog/controlbar.png",	 			"key":Assets.CONTROL_BAR,				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"images/prog/dragarrows.png",	 			"key":Assets.DRAG_ARROW,				"w":32, 	"h":32},
		{"type":"spritesheet", 	"asset":"images/screens/smallpanel.png",	 			"key":Assets.GAME_SCREEN,				"w":225, 	"h":250},
		{"type":"spritesheet", 	"asset":"images/settings/settings1.png",	 			"key":Assets.SETTINGS1,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"images/settings/settings2.png",	 			"key":Assets.SETTINGS2,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"images/settings/settings3.png",	 			"key":Assets.SETTINGS3,					"w":160, 	"h":160},
		{"type":"spritesheet", 	"asset":"images/buttons/markers.png", 				"key":Assets.MARKERS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/prognum.png", 				"key":Assets.PROG_NUM, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/buttons.png", 				"key":Assets.BUTTON, 					"w":50, 	"h":50, 	"frameMax":44},
		{"type":"spritesheet", 	"asset":"images/buttons/arrows.png", 				"key":Assets.ARROWS, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/leftright.png", 				"key":Assets.LEFTRIGHT, 				"w":60, 	"h":80},
		{"type":"spritesheet", 	"asset":"images/buttons/keys.png", 					"key":Assets.KEYS, 						"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/close.png", 					"key":Assets.CLOSE, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/clear.png", 					"key":Assets.CLEAR, 					"w":50, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/okButton.png", 				"key":Assets.OK_BUTTON, 				"w":180, 	"h":100},
		{"type":"spritesheet", 	"asset":"images/buttons/start.png", 					"key":Assets.START_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"images/buttons/play.png", 					"key":Assets.PLAY_BUTTON, 				"w":100, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/stop.png", 					"key":Assets.STOP_BUTTON, 				"w":100, 	"h":50},
		{"type":"spritesheet", 	"asset":"images/buttons/addMyButton.png", 			"key":Assets.ADD_BUTTON, 				"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"images/buttons/challengebutton.png", 		"key":Assets.CHALLENGE_BUTTON, 			"w":180, 	"h":70},
		{"type":"spritesheet", 	"asset":"images/buttons/pagination.png", 			"key":Assets.MARKER, 					"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"images/pens/pens.png", 						"key":Assets.PENS, 						"w":235, 	"h":125},
		{"type":"spritesheet", 	"asset":"images/buttons/toggle.png", 				"key":Assets.TOGGLE, 					"w":120, 	"h":60},
		{"type":"spritesheet", 	"asset":"images/buttons/radiobutton.png", 			"key":Assets.RADIO, 					"w":100, 	"h":40},
		{"type":"spritesheet", 	"asset":"images/maps/cornersx.png",	 				"key":Assets.CORNERSX,					"w":5, 		"h":5},
		{"type":"spritesheet", 	"asset":"images/slider/decor.png",	 				"key":Assets.SPEEDDECOR,				"w":40, 	"h":40},
		{"type":"spritesheet", 	"asset":"images/turtle/mover.png", 					"key":Assets.MOVER,						"w":80, 	"h":80},
		{"type":"spritesheet", 	"asset":"images/challenges/challenges.png", 			"key":Assets.CHALLENGES,				"w":175, 	"h":175}
	];
	
	Assets.SOUNDFX = [
		{"type":"sound", 		"asset":["sound/click0.mp3", "sound/click0.wav"], 				"key":Assets.SOUNDS[0]},
		{"type":"sound", 		"asset":["sound/click1.mp3", "sound/click1.wav"], 				"key":Assets.SOUNDS[1]},
		{"type":"sound", 		"asset":["sound/swoosh0.mp3", "sound/swoosh0.wav"], 				"key":Assets.SOUNDS[2]},
		{"type":"sound", 		"asset":["sound/swoosh1.mp3", "sound/swoosh1.wav"], 				"key":Assets.SOUNDS[3]},
		{"type":"sound", 		"asset":["sound/tinkle.mp3", "sound/tinkle.wav"], 				"key":Assets.SOUNDS[4]},
		{"type":"sound", 		"asset":["sound/challenge0.mp3", "sound/challenge0.wav"], 		"key":Assets.CHALLENGE_SOUNDS[0]},
		{"type":"sound", 		"asset":["sound/challenge1.mp3", "sound/challenge1.wav"], 		"key":Assets.CHALLENGE_SOUNDS[1]},
		{"type":"sound", 		"asset":["sound/challenge2.mp3", "sound/challenge2.wav"], 		"key":Assets.CHALLENGE_SOUNDS[2]},
		{"type":"sound", 		"asset":["sound/challenge3.mp3", "sound/challenge3.wav"], 		"key":Assets.CHALLENGE_SOUNDS[3]},
		{"type":"sound", 		"asset":["sound/challenge4.mp3", "sound/challenge4.wav"], 		"key":Assets.CHALLENGE_SOUNDS[4]},
		{"type":"sound", 		"asset":["sound/challenge5.mp3", "sound/challenge5.wav"], 		"key":Assets.CHALLENGE_SOUNDS[5]},
		{"type":"sound", 		"asset":["sound/challenge6.mp3", "sound/challenge6.wav"], 		"key":Assets.CHALLENGE_SOUNDS[6]},
		{"type":"sound", 		"asset":["sound/challenge7.mp3", "sound/challenge7.wav"], 		"key":Assets.CHALLENGE_SOUNDS[7]},
		{"type":"sound", 		"asset":["sound/help.mp3", "sound/help.wav"], 					"key":Assets.HELP_SOUND}
	];
	
	Assets.IMAGES = [
		{"type":"image", 		"asset":"images/prog/base.png",	 				"key":Assets.BASE},
		{"type":"image", 		"asset":"images/buttons/smile.png",	 			"key":Assets.SMILE},
		{"type":"image", 		"asset":"images/buttons/voiceover.png",	 		"key":Assets.VOICEOVER},
		{"type":"image", 		"asset":"images/bg/topbar.png", 					"key":Assets.TOPBAR},
		{"type":"image", 		"asset":"images/popups/tooltip0.png",	 		"key":Assets.TOOLTIPS[0]},
		{"type":"image", 		"asset":"images/popups/tooltip1.png",	 		"key":Assets.TOOLTIPS[1]},
		{"type":"image", 		"asset":"images/popups/tooltip2.png",	 		"key":Assets.TOOLTIPS[2]},
		{"type":"image", 		"asset":"images/popups/tooltip3.png",	 		"key":Assets.TOOLTIPS[3]},
		{"type":"image", 		"asset":"images/popups/tooltip4.png",	 		"key":Assets.TOOLTIPS[4]},
		{"type":"image", 		"asset":"images/popups/tooltip5.png",	 		"key":Assets.TOOLTIPS[5]},
		{"type":"image", 		"asset":"images/popups/tooltipImages0.png",	 	"key":Assets.TOOLTIP_IMAGES[0]},
		{"type":"image", 		"asset":"images/grids/grid0.png", 				"key":Assets.GRIDS[0]},
		{"type":"image", 		"asset":"images/grids/grid1.png", 				"key":Assets.GRIDS[1]},
		{"type":"image", 		"asset":"images/grids/grid2.png", 				"key":Assets.GRIDS[2]},
		{"type":"image", 		"asset":"images/grids/grid3.png", 				"key":Assets.GRIDS[3]},
		{"type":"image", 		"asset":"images/slider/sliderbg.png", 			"key":Assets.SLIDERBG},
		{"type":"image", 		"asset":"images/slider/sliderhl.png", 			"key":Assets.SLIDERHL},
		{"type":"image", 		"asset":"images/slider/sliderhandle.png", 		"key":Assets.SLIDERHANDLE},
		{"type":"image", 		"asset":"images/pens/widthbg0.png", 				"key":Assets.WIDTHBGS[0]},
		{"type":"image", 		"asset":"images/pens/widthbg1.png", 				"key":Assets.WIDTHBGS[1]},
		{"type":"image", 		"asset":"images/pens/widthbg2.png", 				"key":Assets.WIDTHBGS[2]},
		{"type":"image", 		"asset":"images/pens/widthbg3.png", 				"key":Assets.WIDTHBGS[3]},
		{"type":"image", 		"asset":"images/pens/widthbg4.png", 				"key":Assets.WIDTHBGS[4]},
		{"type":"image", 		"asset":"images/pens/widthbg5.png", 				"key":Assets.WIDTHBGS[5]},
		{"type":"image", 		"asset":"images/pens/widthbg6.png", 				"key":Assets.WIDTHBGS[6]},
		{"type":"image", 		"asset":"images/pens/widthbg7.png", 				"key":Assets.WIDTHBGS[7]},
		{"type":"image", 		"asset":"images/pens/widthbg8.png", 				"key":Assets.WIDTHBGS[8]},
		{"type":"image", 		"asset":"images/pens/widthbg9.png", 				"key":Assets.WIDTHBGS[9]},
		{"type":"image", 		"asset":"images/pens/widthbg10.png", 			"key":Assets.WIDTHBGS[10]},
		{"type":"image", 		"asset":"images/pens/widthhandle.png", 			"key":Assets.WIDTHHANDLE},
		{"type":"image", 		"asset":"images/pens/widthbg20.png", 			"key":Assets.WIDTHBGS2[0]},
		{"type":"image", 		"asset":"images/pens/widthbg21.png", 			"key":Assets.WIDTHBGS2[1]},
		{"type":"image", 		"asset":"images/pens/widthbg22.png", 			"key":Assets.WIDTHBGS2[2]},
		{"type":"image", 		"asset":"images/pens/widthbg23.png", 			"key":Assets.WIDTHBGS2[3]},
		{"type":"image", 		"asset":"images/pens/widthbg24.png", 			"key":Assets.WIDTHBGS2[4]},
		{"type":"image", 		"asset":"images/pens/widthbg25.png", 			"key":Assets.WIDTHBGS2[5]},
		{"type":"image", 		"asset":"images/pens/widthbg26.png", 			"key":Assets.WIDTHBGS2[6]},
		{"type":"image", 		"asset":"images/pens/widthbg27.png", 			"key":Assets.WIDTHBGS2[7]},
		{"type":"image", 		"asset":"images/pens/widthbg28.png", 			"key":Assets.WIDTHBGS2[8]},
		{"type":"image", 		"asset":"images/pens/widthbg29.png", 			"key":Assets.WIDTHBGS2[9]},
		{"type":"image", 		"asset":"images/pens/widthbg210.png", 			"key":Assets.WIDTHBGS2[10]},
		{"type":"image", 		"asset":"images/pens/widthhandle2.png", 			"key":Assets.WIDTHHANDLE2},
		{"type":"image", 		"asset":"images/maps/map0.png", 					"key":Assets.MAPS[0]},
		{"type":"image", 		"asset":"images/maps/map1.png", 					"key":Assets.MAPS[1]},
		{"type":"image", 		"asset":"images/maps/map2.png", 					"key":Assets.MAPS[2]},
		{"type":"image", 		"asset":"images/maps/map3.png", 					"key":Assets.MAPS[3]},
		{"type":"image", 		"asset":"images/maps/map4.png", 					"key":Assets.MAPS[4]},
		{"type":"image", 		"asset":"images/maps/map5.png", 					"key":Assets.MAPS[5]},
		{"type":"image", 		"asset":"images/maps/map6.png", 					"key":Assets.MAPS[6]},
		{"type":"image", 		"asset":"images/maps/map7.png", 					"key":Assets.MAPS[7]},
		{"type":"image", 		"asset":"images/maps/map8.png", 					"key":Assets.MAPS[8]},
		{"type":"image", 		"asset":"images/maps/map9.png", 					"key":Assets.MAPS[9]},
		{"type":"image", 		"asset":"images/maps/map10.png", 				"key":Assets.MAPS[10]},
		{"type":"image", 		"asset":"images/maps/map11.png", 				"key":Assets.MAPS[11]},
		{"type":"image", 		"asset":"images/maps/map12.png", 				"key":Assets.MAPS[12]},
		{"type":"image", 		"asset":"images/maps/map13.png", 				"key":Assets.MAPS[13]},
		{"type":"image", 		"asset":"images/maps/map14.png", 				"key":Assets.MAPS[14]},
		{"type":"image", 		"asset":"images/maps/map15.png", 				"key":Assets.MAPS[15]},
		{"type":"image", 		"asset":"images/maps/map16.png", 				"key":Assets.MAPS[16]},
		{"type":"image", 		"asset":"images/maps/map17.png", 				"key":Assets.MAPS[17]},
		{"type":"image", 		"asset":"images/popups/panel.png",	 			"key":Assets.PANEL},
		{"type":"image", 		"asset":"images/popups/ipad.png",	 			"key":Assets.IPAD},
		{"type":"image", 		"asset":"images/popups/alert.png",	 			"key":Assets.ALERT},
		{"type":"image", 		"asset":"images/maps/corners.jpg",	 			"key":Assets.CORNERS},
		{"type":"image", 		"asset":"images/prog/dragdomains.png",	 		"key":Assets.DRAG_DOMAIN},
		{"type":"image", 		"asset":"images/scroll/vscrollbar.png",	 		"key":Assets.VSCROLLBAR},
		{"type":"image", 		"asset":"images/bg/2s_logo.png",	 				"key":Assets.BRAND}
	];
	
	
	Assets.DATA = Assets.SPRITESHEETS.concat(Assets.SOUNDFX).concat(Assets.IMAGES);
	
	return Assets;

});





