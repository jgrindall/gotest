
define(['app/consts/appconsts', 'app/utils/textfactory', 'app/consts/leveldata', 'app/scenemanager/scenefactory', 'app/commsdata', 'app/locdata', 'app/game', 'phaserstatetrans', 'app/utils/storage', 'app/levelstatus', 'app/utils/alertmanager'],

function(AppConsts, TextFactory, LevelData, SceneFactory, CommsData, LocData, Game, PhaserStateTrans, Storage, LevelStatus, AlertManager){
	
	"use strict";
	
	var SceneManager = function(){

	};

	SceneManager.prototype.registerScenes = function(){
		this.addScene(AppConsts.GAME_SCENE);
		this.addScene(AppConsts.COMM_SCENE);
		this.addScene(AppConsts.MAIN_SCENE);
		this.addScene(AppConsts.LEVELS_SCENE);
		this.addScene(AppConsts.TUTORIAL_SCENE);
		this.addScene(AppConsts.LOADER_SCENE);
	};

	SceneManager.prototype.addScene = function(key) {
		var scene = SceneFactory.getForKey(key);
		scene.navigationSignal.add(this.navigationClicked, this);
		Game.getInstance().state.add(key, scene);
	};
	
	SceneManager.prototype.go = function(s){
		this.transitions.to(s);
	};
	
	SceneManager.prototype.levelsNavigationClicked = function(data){
		var levelData;
		if(data.button === "back"){
			this.go(AppConsts.MAIN_SCENE);
		}
		else{
			LocData.getInstance().setLocation(data);
			levelData = Storage.getInstance().loadLevelDataForPageAndLevel(data.page, data.level);
			if(levelData === LevelStatus.OPEN){
				this.go(AppConsts.GAME_SCENE);
			}
			else{
				AlertManager.makeAlert("blocked!");
			}
		}
	};
	
	SceneManager.prototype.mainNavigationClicked = function(data){
		if(data.button === "start"){
			this.go(AppConsts.LEVELS_SCENE);
		}
		else if(data.button === "tutorial"){
			this.go(AppConsts.TUTORIAL_SCENE);
		}
	};
	
	SceneManager.prototype.commNavigationClicked = function(data){
		if(data.button === "back"){
			this.go(AppConsts.LEVELS_SCENE);
		}
		else if(data.button === "go"){
			Game.startPhysics();
			this.go(AppConsts.GAME_SCENE);
		}
	};
	
	SceneManager.prototype.loaderNavigationClicked = function(data){
		this.go(AppConsts.MAIN_SCENE);
	};
	
	SceneManager.prototype.tutorialNavigationClicked = function(data){
		Game.startPhysics();
		this.go(AppConsts.MAIN_SCENE);
	};
	
	SceneManager.prototype.gameNavigationClicked = function(data){
		if(data.target === "comms"){
			this.go(AppConsts.COMM_SCENE);
		}
		else if(data.target === "home"){
			this.go(AppConsts.MAIN_SCENE);
		}
		else if(data.target === "levels"){
			this.go(AppConsts.LEVELS_SCENE);
		}
		else if(data.target === "refresh"){
			this.go(AppConsts.GAME_SCENE);
		}
	};
	
	SceneManager.prototype.navigationClicked = function(data){
		if(data.key === AppConsts.LEVELS_SCENE){
			this.levelsNavigationClicked(data);
		}
		else if(data.key === AppConsts.MAIN_SCENE){
			this.mainNavigationClicked(data);
		}
		else if(data.key === AppConsts.COMM_SCENE){
			this.commNavigationClicked(data);
		}
		else if(data.key === AppConsts.TUTORIAL_SCENE){
			this.tutorialNavigationClicked(data);
		}
		else if(data.key === AppConsts.GAME_SCENE){
			this.gameNavigationClicked(data);
		}
		else if(data.key === AppConsts.LOADER_SCENE){
			this.loaderNavigationClicked(data);
		}
	};

	SceneManager.prototype.preload = function(){
		this.transitions = Game.getInstance().plugins.add(PhaserStateTrans);
		this.transitions.settings({'duration': 300,	'properties': {'alpha': 0, 'scale': {'x': 1.05, 'y': 1.05}}});
		Game.getInstance().load.spritesheet('play', 'assets/images/buttons/yellowPlay.png', 120, 120);
		Game.getInstance().load.spritesheet('bulb', 'assets/images/buttons/yellowBulb.png', 120, 120);
		Game.getInstance().load.spritesheet('pause', 'assets/images/buttons/yellowPause.png', 120, 120);
		Game.getInstance().load.image('sky', 'assets/images/bg/sky.png');
		Game.getInstance().load.spritesheet('loaderBar', 'assets/images/other/bar.png', 500, 60);
		var testLabel = TextFactory.make(Game.cx() - 300, 0, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", TextFactory.LARGE);
	};

	SceneManager.prototype.load = function(s) {
		Game.getInstance().state.start(s);
	};

	SceneManager.prototype.create = function() {
		this.registerScenes();
		this.load(AppConsts.LOADER_SCENE);
	};
	
	return SceneManager;

});
	
	