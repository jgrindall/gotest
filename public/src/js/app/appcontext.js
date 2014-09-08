
define('app/appcontext',['app/commands/newfilecommand', 'app/commands/loadcommand', 'app/commands/savecommand',

	'app/commands/printcommand', 'app/commands/undocommand', 'app/commands/stopcommand',

	'app/commands/typechoicecommand', 'app/commands/gridchoicecommand', 'app/commands/teachercommand',

	'app/commands/addcommandcommand', 'app/commands/drawcommand', 'app/commands/startupcommand', 

	'app/commands/finishcommand', 'app/commands/replaycommand',

	'app/events/events', 'phasercomponents', 'app/consts/appconsts',

	'app/scenes/loaderscene', 'app/scenes/activityscene', 'app/assets'],

	function(NewFileCommand, LoadCommand, SaveCommand,

		PrintCommand, UndoCommand, StopCommand,

		TypeChoiceCommand, GridChoiceCommand, TeacherCommand,

		AddCommandCommand, DrawCommand, StartUpCommand,

		FinishCommand, ReplayCommand,

		Events, PhaserComponents, AppConsts,

		LoaderScene, ActivityScene, Assets) {
	
	"use strict";

   	var AppContext = function (options){
		PhaserComponents.Context.call(this, options);
    };
	
	PhaserComponents.Utils.extends(AppContext, PhaserComponents.Context);

	AppContext.prototype.mapFonts = function(){
		PhaserComponents.TextFactory.registerFont('vsmall', '17', 'center', 'TooSimple', '#bbbbbb', 1, 2, '#ffffff', '#eeeeee');
		// (key, size, align, fontName, stroke, strokeThickness, shadow, color0, color1)
		PhaserComponents.TextFactory.registerFont('small', '22', 'center', 'TooSimple', '#777777', 1, 2, '#ffffff', '#eeeeee');
		PhaserComponents.TextFactory.registerFont('medium', '40', 'center', 'TooSimple', '#777777', 1, 2, '#ffffff', '#eeeeee');
		PhaserComponents.TextFactory.registerFont('large', '60', 'center', 'TooSimple', '#777777', 1, 2, '#ffffff', '#eeeeee');
		PhaserComponents.TextFactory.registerFont('vlarge', '80', 'center', 'TooSimple', '#777777', 1, 2, '#ffffff', '#eeeeee');
	};

    AppContext.prototype.onChangeScene = function(event, obj){
    	var that = this;
    	if(obj.data.scene instanceof LoaderScene){
    		setTimeout(function(){
    			that.gameManager.goToScene(AppConsts.ACTIVITY_SCENE);
    		}, 1000); 
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

