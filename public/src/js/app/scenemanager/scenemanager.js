
define(['app/consts/appconsts', 'app/utils/textfactory', 'app/consts/leveldata',

'app/scenemanager/scenefactory', 'app/game',

'phaserstatetrans', 'app/utils/storage', 'app/levelstatus',

'app/utils/alertmanager', 'app/scenes/activity/commmodel'],

function(AppConsts, TextFactory, LevelData,

SceneFactory, Game,

PhaserStateTrans, Storage, LevelStatus,

AlertManager, commModel){
	
	"use strict";
	
	var SceneManager = function(){

	};

	SceneManager.prototype.registerScenes = function(){
		this.addScene(AppConsts.LOADER_SCENE);
		this.addScene(AppConsts.ACTIVITY_SCENE);
	};

	SceneManager.prototype.addScene = function(key) {
		var scene = SceneFactory.getForKey(key);
		scene.navigationSignal.add(this.navigationClicked, this);
		Game.getInstance().state.add(key, scene);
	};
	
	SceneManager.prototype.go = function(s){
		this.transitions.to(s);
	};
	
	SceneManager.prototype.loaderNavigationClicked = function(data){
		this.go(AppConsts.ACTIVITY_SCENE);
	};
	
	SceneManager.prototype.navigationClicked = function(data){
		if(data.key === AppConsts.LOADER_SCENE){
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
	
	