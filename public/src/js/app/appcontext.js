
define(['app/commands/newfilecommand', 'app/commands/loadcommand', 'app/commands/savecommand',

	'app/commands/printcommand', 'app/commands/undocommand', 'app/commands/downloadcommand',

	'app/commands/rewindcommand', 'app/commands/stopcommand', 'app/commands/videocommand',

	'app/commands/gridchoicecommand', 'app/commands/checkoutsidecommand',

	'app/commands/addcommandcommand', 'app/commands/drawcommand', 'app/commands/choosechallengecommand',

	'app/commands/preshutdowncommand', 'app/commands/checkchallengecommand',

	'app/commands/startupcommand', 'app/commands/progchangecommand', 'app/commands/editturtlecommand', 

	'app/commands/openbgeditorcommand', 'app/commands/openturtleeditorcommand', 

	'app/commands/finishcommand', 'app/commands/replaycommand',  'app/commands/helpcommand',

	'app/commands/backcommand', 'app/commands/challengedonecommand',

	'app/events/events', 'phasercomponents', 'app/consts/appconsts',

	'app/scenes/loaderscene', 'app/scenes/activityscene', 

	'app/assets', 'app/storage/purplemashstorageadapter',

	'app/views/showmanager', 'app/models/modelfacade',

	'app/consts/defaults', 'app/utils/clipart', 'app/utils/purplemashclipartadapter'],

	function(NewFileCommand, LoadCommand, SaveCommand,

		PrintCommand, UndoCommand, DownloadCommand,

		RewindCommand, StopCommand, VideoCommand,

		GridChoiceCommand, CheckOutsideCommand,

		AddCommandCommand, DrawCommand, ChooseChallengeCommand,

		PreShutdownCommand, CheckChallengeCommand,

		StartUpCommand, ProgChangeCommand, EditTurtleCommand,

		OpenBgEditorCommand, OpenTurtleEditorCommand,

		FinishCommand, ReplayCommand, HelpCommand,

		BackCommand, ChallengeDoneCommand,

		Events, PhaserComponents, AppConsts,

		LoaderScene, ActivityScene,

		Assets, PurpleMashStorageAdapter,

		ShowManager, ModelFacade,

		Defaults, Clipart, PurpleMashClipartAdapter) {
	
	"use strict";

   	var AppContext = function (options){
		PhaserComponents.Context.call(this, options);
    };
	
	// if live on purplemash
    AppContext.LIVE = false;

	PhaserComponents.Utils.extends(AppContext, PhaserComponents.Context);

	AppContext.prototype.mapFonts = function(){
		PhaserComponents.TextFactory.registerFont('vsmall',	{"size":12, "align":'center', "fontName":'TooSimple', "color":'#000000'});
		PhaserComponents.TextFactory.registerFont('small', 	{"size":18, "align":'center', "fontName":'TooSimple', "color":'#000000'});
		PhaserComponents.TextFactory.registerFont('medium', {"size":22, "align":'center', "fontName":'TooSimple', "color":'#000000'});
		PhaserComponents.TextFactory.registerFont('large', 	{"size":45, "align":'center', "fontName":'TooSimple', "color":'#000000'});
		PhaserComponents.TextFactory.registerFont('vlarge', {"size":60, "align":'center', "fontName":'TooSimple', "color":'#000000'});
		PhaserComponents.TextFactory.registerFont('vsmallheader',	{"size":12, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('smallheader', 	{"size":18, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('mediumheader', 	{"size":22, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('largeheader', 	{"size":45, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
		PhaserComponents.TextFactory.registerFont('vlargeheader', 	{"size":60, "align":'center', "fontName":'TooSimple', "color":'#ffffff'});
	};

	AppContext.prototype.inject = function(){
        var game, eventDispatcher;
        PhaserComponents.Context.prototype.inject.call(this);
        game = this.gameManager.game;
        eventDispatcher = this.eventDispatcher;
        this.showManager = new ShowManager();
        this.modelFacade = new ModelFacade();
        this.addClipart();
        PhaserComponents.Injector.getInstance().mapArray(["nameview","imgview"],			["game", "eventDispatcher"],            [game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("showmanager",							["game"],            					[game, eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("filedownloader",						["eventDispatcher"],            		[eventDispatcher]);
        PhaserComponents.Injector.getInstance().map("view",									["showManager", "modelFacade"],         [this.showManager, this.modelFacade]);
        PhaserComponents.Injector.getInstance().map("abstractcommand",						["modelFacade", "clipart"],            	[this.modelFacade, this.clipart]);
        PhaserComponents.Injector.getInstance().map("scene",								["showManager"],            			[this.showManager]);
        PhaserComponents.Injector.getInstance().map("clipartadapter", 						["alertManager"],						[this.alertManager]);
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

    AppContext.prototype.isLive = function(){
    	if(AppContext.LIVE){
    		return true;
    	}
    	var regexp0, regexp1;
    	regexp0 = new RegExp('purple', 'g');
    	regexp1 = new RegExp('simple', 'g');
    	return (regexp0.test(window.location) || regexp1.test(window.location));
    };

    AppContext.prototype.addClipart = function(){
    	var adapter;
    	this.clipart = new Clipart();
    	if(this.isLive()){
    		adapter = new PurpleMashClipartAdapter();
			this.clipart.setAdapter(adapter);
		}
    };

    AppContext.prototype.addStorage = function(){
    	if(this.isLive()){
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
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[0], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[0]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[1], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[1]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[2], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[2]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[3], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[3]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[4], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[4]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[5], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[5]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[6], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[6]));
    	this.soundManager.add(Assets.CHALLENGE_SOUNDS[7], new Phaser.Sound(this.gameManager.game, Assets.CHALLENGE_SOUNDS[7]));
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
		this.commandMap.map(Events.GRID_CHOICE, 								GridChoiceCommand);
		this.commandMap.map(Events.ADD_COMMAND, 								AddCommandCommand);
		this.commandMap.map(Events.START_ACTIVITY, 								StartUpCommand);
		this.commandMap.map(Events.DRAW, 										DrawCommand);
		this.commandMap.map(Events.HELP, 										HelpCommand);
		this.commandMap.map(Events.CHECK_CHALLENGE, 							CheckChallengeCommand);
		this.commandMap.map(Events.CHECK_POSITION, 								CheckOutsideCommand);
		this.commandMap.map(Events.BACK, 										BackCommand);
		this.commandMap.map(Events.VIDEO, 										VideoCommand);
		this.commandMap.map(Events.REPLAY, 										ReplayCommand);
		this.commandMap.map(Events.DOWNLOAD, 									DownloadCommand);
		this.commandMap.map(Events.FINISHED, 									FinishCommand);
		this.commandMap.map(Events.CHOOSE_CHALLENGE, 							ChooseChallengeCommand);
		this.commandMap.map(Events.OPEN_BG_EDITOR, 								OpenBgEditorCommand);
		this.commandMap.map(Events.OPEN_TURTLE_EDITOR, 							OpenTurtleEditorCommand);
		this.commandMap.map(Events.EDIT_TURTLE, 								EditTurtleCommand);
		this.commandMap.map(Events.CHALLENGE_DONE, 								ChallengeDoneCommand);
		this.commandMap.map(PhaserComponents.Events.AppEvents.PRE_SHUTDOWN, 	PreShutdownCommand);
    };
	
	AppContext.prototype.preload = function(){
		this.gameManager.game.load.image(Assets.BG, 'assets/images/bg/bg.png');
		this.gameManager.game.load.spritesheet(Assets.LOADER_BAR, 'assets/images/loader/bar.png', 435, 40);
	};
	
	return AppContext;
	
});

