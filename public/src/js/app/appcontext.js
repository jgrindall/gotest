
define(['app/commands/newfilecommand', 'app/commands/loadcommand', 'app/commands/savecommand',

	'app/commands/printcommand', 'app/commands/undocommand', 'app/commands/downloadcommand',

	'app/commands/rewindcommand', 'app/commands/stopcommand',

	'app/commands/typechoicecommand', 'app/commands/gridchoicecommand',

	'app/commands/addcommandcommand', 'app/commands/drawcommand', 'app/commands/choosechallengecommand',

	'app/commands/preshutdowncommand', 

	'app/commands/startupcommand', 'app/commands/progchangecommand', 'app/commands/editturtlecommand', 

	'app/commands/openbgeditorcommand', 'app/commands/openturtleeditorcommand', 

	'app/commands/finishcommand', 'app/commands/replaycommand',

	'app/events/events', 'phasercomponents', 'app/consts/appconsts',

	'app/scenes/loaderscene', 'app/scenes/activityscene', 

	'app/assets', 'app/storage/purplemashstorageadapter',

	'app/views/showmanager', 'app/models/modelfacade',

	'app/consts/defaults', 'app/utils/clipart', 'app/utils/purplemashclipartadapter'],

	function(NewFileCommand, LoadCommand, SaveCommand,

		PrintCommand, UndoCommand, DownloadCommand,

		RewindCommand, StopCommand, 

		TypeChoiceCommand, GridChoiceCommand,

		AddCommandCommand, DrawCommand, ChooseChallengeCommand,

		PreShutdownCommand, 

		StartUpCommand, ProgChangeCommand, EditTurtleCommand,

		OpenBgEditorCommand, OpenTurtleEditorCommand,

		FinishCommand, ReplayCommand,

		Events, PhaserComponents, AppConsts,

		LoaderScene, ActivityScene,

		Assets, PurpleMashStorageAdapter,

		ShowManager, ModelFacade,

		Defaults, Clipart, PurpleMashClipartAdapter) {
	
	"use strict";

   	var AppContext = function (options){
		PhaserComponents.Context.call(this, options);
    };
	
	PhaserComponents.Utils.extends(AppContext, PhaserComponents.Context);

	AppContext.prototype.mapFonts = function(){
		PhaserComponents.TextFactory.registerFont('vsmall',	{"size":12, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('small', 	{"size":18, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('medium', {"size":22, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('large', 	{"size":45, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('vlarge', {"size":60, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
	};

	AppContext.prototype.inject = function(){
        var game, eventDispatcher, alertManager;
        PhaserComponents.Context.prototype.inject.call(this);
        game = this.gameManager.game;
        eventDispatcher = this.eventDispatcher;
        alertManager = this.alertManager;
        this.showManager = new ShowManager();
        this.modelFacade = new ModelFacade();
        this.addClipart();
        PhaserComponents.Injector.getInstance().mapArray(["nameview","imgview"],			["game", "eventDispatcher"],            [game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("showmanager",							["game"],            					[game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("filedownloader",						["eventDispatcher"],            		[eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("view",									["showManager", "modelFacade"],         [this.showManager, this.modelFacade]);
        PhaserComponents.Injector.getInstance().map("abstractcommand",						["modelFacade", "clipart"],            	[this.modelFacade, this.clipart]);
        PhaserComponents.Injector.getInstance().map("scene",								["showManager"],            			[this.showManager]);
        this.showManager.init();
        this.modelFacade.init();
        this.modelFacade.setData(Defaults.getDefaults());
    };

    AppContext.prototype.onChangeScene = function(event, obj){
    	if(obj.data.sceneTo){
    		this.gameManager.goToScene(obj.data.sceneTo);
    	}
    	else if(obj.data.sceneFrom === AppConsts.LOADER_SCENE){
    		this.eventDispatcher.trigger({"type":Events.START_ACTIVITY});
    	}
    };
 	
    AppContext.prototype.setupKeys = function(){
    	this.keyManager.setCodes([37, 38, 39, 40, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105]);
    };

    AppContext.prototype.addClipart = function(){
    	var regexp = new RegExp('purple', 'g');
    	this.clipart = new Clipart();
    	if(regexp.test(window.location)){
			this.clipart.setAdapter(new PurpleMashClipartAdapter());
		}
    };

    AppContext.prototype.addStorage = function(){
    	var regexp = new RegExp('purple', 'g');
    	if(regexp.test(window.location)){
			this.storage.setAdapter(new PurpleMashStorageAdapter());
		}
    };

    AppContext.prototype.mapScenes = function(){
    	this.gameManager.mapScene(AppConsts.LOADER_SCENE, 		LoaderScene, true);
		this.gameManager.mapScene(AppConsts.ACTIVITY_SCENE, 	ActivityScene);
    };

    AppContext.prototype.addSounds = function(){
    	this.soundManager.add(Assets.SOUNDS[0], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[0]));
    	this.soundManager.add(Assets.SOUNDS[1], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[1]));
    	this.soundManager.add(Assets.SOUNDS[2], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[2]));
    	this.soundManager.add(Assets.SOUNDS[3], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[3]));
    	this.soundManager.add(Assets.SOUNDS[4], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[4]));
    	this.soundManager.add(Assets.SOUNDS[5], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[5]));
    	this.soundManager.add(Assets.SOUNDS[6], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[6]));
    };

    AppContext.prototype.mapCommands = function(){
    	PhaserComponents.Context.prototype.mapCommands.call(this);
    	this.commandMap.map(Events.NEW_FILE, 									NewFileCommand);
    	this.commandMap.map(Events.PROG_CHANGE, 								ProgChangeCommand);
		this.commandMap.map(Events.LOAD, 										LoadCommand);
		this.commandMap.map(Events.SAVE, 										SaveCommand);
		this.commandMap.map(Events.PRINT, 										PrintCommand);
		this.commandMap.map(Events.UNDO,										UndoCommand);
		this.commandMap.map(Events.REWIND, 										RewindCommand);
		this.commandMap.map(Events.STOP, 										StopCommand);
		this.commandMap.map(Events.TYPE_CHOICE, 								TypeChoiceCommand);
		this.commandMap.map(Events.GRID_CHOICE, 								GridChoiceCommand);
		this.commandMap.map(Events.ADD_COMMAND, 								AddCommandCommand);
		this.commandMap.map(Events.START_ACTIVITY, 								StartUpCommand);
		this.commandMap.map(Events.DRAW, 										DrawCommand);
		this.commandMap.map(Events.REPLAY, 										ReplayCommand);
		this.commandMap.map(Events.DOWNLOAD, 									DownloadCommand);
		this.commandMap.map(Events.FINISHED, 									FinishCommand);
		this.commandMap.map(Events.CHOOSE_CHALLENGE, 							ChooseChallengeCommand);
		this.commandMap.map(Events.OPEN_BG_EDITOR, 								OpenBgEditorCommand);
		this.commandMap.map(Events.OPEN_TURTLE_EDITOR, 							OpenTurtleEditorCommand);
		this.commandMap.map(Events.EDIT_TURTLE, 								EditTurtleCommand);
		this.commandMap.map(PhaserComponents.Events.AppEvents.PRE_SHUTDOWN, 	PreShutdownCommand);
    };
	
	AppContext.prototype.preload = function(){
		this.gameManager.game.load.image(Assets.BG, 'assets/images/bg/stressed_linen.png');
		this.gameManager.game.load.spritesheet(Assets.LOADER_BAR, 'assets/images/loader/bar.png', 435, 40);
	};
	
	return AppContext;
	
});

