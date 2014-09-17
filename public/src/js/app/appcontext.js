
define(['app/commands/newfilecommand', 'app/commands/loadcommand', 'app/commands/savecommand',

	'app/commands/printcommand', 'app/commands/undocommand', 'app/commands/stopcommand',

	'app/commands/typechoicecommand', 'app/commands/gridchoicecommand', 'app/commands/teachercommand',

	'app/commands/addcommandcommand', 'app/commands/drawcommand', 'app/commands/startupcommand', 'app/commands/progchangecommand', 

	'app/commands/finishcommand', 'app/commands/replaycommand', 

	'app/events/events', 'phasercomponents', 'app/consts/appconsts',

	'app/scenes/loaderscene', 'app/scenes/activityscene', 'app/assets'],

	function(NewFileCommand, LoadCommand, SaveCommand,

		PrintCommand, UndoCommand, StopCommand,

		TypeChoiceCommand, GridChoiceCommand, TeacherCommand,

		AddCommandCommand, DrawCommand,  StartUpCommand, ProgChangeCommand,

		FinishCommand, ReplayCommand, 

		Events, PhaserComponents, AppConsts,

		LoaderScene, ActivityScene, Assets) {
	
	"use strict";

   	var AppContext = function (options){
		PhaserComponents.Context.call(this, options);
    };
	
	PhaserComponents.Utils.extends(AppContext, PhaserComponents.Context);

	AppContext.prototype.mapFonts = function(){
		PhaserComponents.TextFactory.registerFont('vsmall',	{"size":12, "align":'center', "fontName":'TooSimple', "color0":'#ffffff', "color1":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('small', 	{"size":18, "align":'center', "fontName":'TooSimple', "color0":'#ffffff', "color1":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('medium', {"size":24, "align":'center', "fontName":'TooSimple', "color0":'#ffffff', "color1":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('large', 	{"size":45, "align":'center', "fontName":'TooSimple', "color0":'#ffffff', "color1":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('vlarge', {"size":60, "align":'center', "fontName":'TooSimple', "color0":'#ffffff', "color1":'#ffffff'});
	};

	AppContext.prototype.onResize = function(){
		this.gameManager.getScene().resize();
	};

    AppContext.prototype.onChangeScene = function(event, obj){
    	if(obj.data.scene instanceof LoaderScene){
    		this.gameManager.goToScene(AppConsts.ACTIVITY_SCENE);
    	}
    };
 	
    AppContext.prototype.mapScenes = function(){
    	this.gameManager.mapScene(AppConsts.LOADER_SCENE, LoaderScene, true);
		this.gameManager.mapScene(AppConsts.ACTIVITY_SCENE, ActivityScene);
    };

    AppContext.prototype.addSounds = function(){
    	PhaserComponents.SoundManager.getInstance().add(Assets.SOUNDS[0], new Phaser.Sound(this.game, Assets.SOUNDS[0]));
    	PhaserComponents.SoundManager.getInstance().add(Assets.SOUNDS[1], new Phaser.Sound(this.game, Assets.SOUNDS[1]));
    	PhaserComponents.SoundManager.getInstance().add(Assets.SOUNDS[2], new Phaser.Sound(this.game, Assets.SOUNDS[2]));
    	PhaserComponents.SoundManager.getInstance().add(Assets.SOUNDS[3], new Phaser.Sound(this.game, Assets.SOUNDS[3]));
    };

    AppContext.prototype.mapCommands = function(){
    	PhaserComponents.Context.prototype.mapCommands.call(this);
    	this.commandMap.map(Events.NEW_FILE, 			NewFileCommand);
    	this.commandMap.map(Events.PROG_CHANGE, 		ProgChangeCommand);
		this.commandMap.map(Events.LOAD, 				LoadCommand);
		this.commandMap.map(Events.SAVE, 				SaveCommand);
		this.commandMap.map(Events.PRINT, 				PrintCommand);
		this.commandMap.map(Events.UNDO,				UndoCommand);
		this.commandMap.map(Events.STOP, 				StopCommand);
		this.commandMap.map(Events.TEACHER_LOGIN, 		TeacherCommand);
		this.commandMap.map(Events.TYPE_CHOICE, 		TypeChoiceCommand);
		this.commandMap.map(Events.GRID_CHOICE, 		GridChoiceCommand);
		this.commandMap.map(Events.ADD_COMMAND, 		AddCommandCommand);
		this.commandMap.map(Events.STARTUP, 			StartUpCommand);
		this.commandMap.map(Events.DRAW, 				DrawCommand);
		this.commandMap.map(Events.REPLAY, 				ReplayCommand);
		this.commandMap.map(Events.FINISHED, 			FinishCommand);
    };
	
	AppContext.prototype.preload = function(){
		this.gameManager.game.load.image(Assets.BG, 'assets/images/bg/bg.png');
		this.gameManager.game.load.spritesheet(Assets.LOADER_BAR, 'assets/images/loader/bar.png', 350, 30);
	};
	
	return AppContext;
	
});

