
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

   	var AppContext = function ( ){
		this.el =  "game";
		PhaserComponents.Context.call(this);
    };
	
    AppContext.prototype = Object.create(PhaserComponents.Context.prototype);
    AppContext.prototype.constructor = AppContext;

    AppContext.prototype.onChangeScene = function(event, obj){
    	if(obj.data.scene instanceof LoaderScene){
    		this.gameManager.goToScene(AppConsts.ACTIVITY_SCENE);
    	}
    };
 
    AppContext.prototype.mapScenes = function(){
    	this.gameManager.mapScene(AppConsts.LOADER_SCENE, LoaderScene, true);
		this.gameManager.mapScene(AppConsts.ACTIVITY_SCENE, ActivityScene);
    };

    AppContext.prototype.mapCommands = function(){
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
		this.gameManager.game.load.spritesheet(Assets.LOADER_BAR, 'assets/images/other/bar.png', 500, 60);
	};
	
	return AppContext;
	
});

