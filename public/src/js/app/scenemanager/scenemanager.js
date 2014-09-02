
define('app/scenemanager/scenemanager',['app/consts/appconsts', 

'app/scenemanager/scenefactory', 'app/game',

'phaserstatetrans'

],

function(AppConsts,

SceneFactory, Game,

PhaserStateTrans

){
	
	"use strict";
	
	var SceneManager = function(){

	};

	SceneManager.prototype.registerTransitions = function(){
		this.transitions = Game.getInstance().plugins.add(PhaserStateTrans);
		this.transitions.settings({'duration': 300,	'properties': {'alpha': 0, 'scale': {'x': 1.05, 'y': 1.05}}});
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
		Game.getInstance().load.image('sky', 'assets/images/bg/sky.png');
		Game.getInstance().load.spritesheet('loaderBar', 'assets/images/other/bar.png', 500, 60);
	};

	SceneManager.prototype.load = function(s) {
		Game.getInstance().state.start(s);
	};

	SceneManager.prototype.create = function() {
		this.registerScenes();
		this.registerTransitions();
		this.load(AppConsts.LOADER_SCENE);
	};
	
	return SceneManager;

});
	
	