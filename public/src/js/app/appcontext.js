
define(['jquery', 'app/commands/newfilecommand', 'app/commands/loadcommand', 'app/commands/savecommand',

	'app/commands/printcommand', 'app/commands/undocommand', 'app/commands/downloadcommand',

	'app/commands/rewindcommand', 'app/commands/stopcommand',

	'app/commands/typechoicecommand', 'app/commands/gridchoicecommand',

	'app/commands/addcommandcommand', 'app/commands/drawcommand',

	'app/commands/preshutdowncommand', 'app/commands/postshutdowncommand',	

	'app/commands/startupcommand', 'app/commands/progchangecommand', 

	'app/commands/finishcommand', 'app/commands/replaycommand', 'app/commands/designimgcommand', 

	'app/events/events', 'phasercomponents', 'app/consts/appconsts',

	'app/scenes/loaderscene', 'app/scenes/activityscene',

	'app/assets', 'app/storage/purplemashadapter',

	'app/views/showmanager', 'app/models/modelfacade'],

	function($, NewFileCommand, LoadCommand, SaveCommand,

		PrintCommand, UndoCommand, DownloadCommand,

		RewindCommand, StopCommand, 

		TypeChoiceCommand, GridChoiceCommand,

		AddCommandCommand, DrawCommand,

		PreShutdownCommand, PostShutdownCommand,

		StartUpCommand, ProgChangeCommand,

		FinishCommand, ReplayCommand, DesignImgCommand,

		Events, PhaserComponents, AppConsts,

		LoaderScene, ActivityScene,

		Assets, PurpleMashAdapter,

		ShowManager, ModelFacade) {
	
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
        PhaserComponents.Injector.getInstance().mapArray(["nameview","imgview"],			["game", "eventDispatcher"],            [game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("showmanager",							["game"],            					[game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("filedownloader",						["eventDispatcher"],            		[eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("view",									["showManager", "modelFacade"],         [this.showManager, this.modelFacade]);
        PhaserComponents.Injector.getInstance().map("abstractcommand",						["modelFacade"],            			[this.modelFacade]);
        this.showManager.init();
        this.modelFacade.init();
    };

	AppContext.prototype.startActivity = function(){
		this.gameManager.goToScene(AppConsts.ACTIVITY_SCENE);
	};

    AppContext.prototype.onChangeScene = function(event, obj){
    	if(obj.data.scene instanceof LoaderScene){
    		this.startActivity();
    		$("html").css("background", "#191919");
    	}
    };
 	
    AppContext.prototype.setupKeys = function(){
    	this.keyManager.setCodes([37, 38, 39, 40, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105]);
    };

    AppContext.prototype.addStorage = function(){
    	var adapter = new PurpleMashAdapter();
		if(Math.random() < 0.5){
			console.log("using PM");
			this.storage.setAdapter(adapter);
		}
    };

    AppContext.prototype.mapScenes = function(){
    	this.gameManager.mapScene(AppConsts.LOADER_SCENE, LoaderScene, true);
		this.gameManager.mapScene(AppConsts.ACTIVITY_SCENE, ActivityScene);
    };

    AppContext.prototype.addSounds = function(){
    	this.soundManager.add(Assets.SOUNDS[0], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[0]));
    	this.soundManager.add(Assets.SOUNDS[1], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[1]));
    	this.soundManager.add(Assets.SOUNDS[2], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[2]));
    	this.soundManager.add(Assets.SOUNDS[3], new Phaser.Sound(this.gameManager.game, Assets.SOUNDS[3]));
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
		this.commandMap.map(Events.STARTUP, 									StartUpCommand);
		this.commandMap.map(Events.DRAW, 										DrawCommand);
		this.commandMap.map(Events.REPLAY, 										ReplayCommand);
		this.commandMap.map(Events.DOWNLOAD, 									DownloadCommand);
		this.commandMap.map(Events.FINISHED, 									FinishCommand);
		this.commandMap.map(Events.DESIGN_IMG, 									DesignImgCommand);
		this.commandMap.map(PhaserComponents.Events.AppEvents.PRE_SHUTDOWN, 	PreShutdownCommand);
		this.commandMap.map(PhaserComponents.Events.AppEvents.POST_SHUTDOWN, 	PostShutdownCommand);
    };
	
	AppContext.prototype.preload = function(){
		this.gameManager.game.load.image(Assets.BG, 'assets/images/bg/stressed_linen.png');
		this.gameManager.game.load.spritesheet(Assets.LOADER_BAR, 'assets/images/loader/bar.png', 425, 40);
	};
	
	return AppContext;
	
});

