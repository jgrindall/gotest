
define('app/utils/soundmanager',[], function(Game){
	
	"use strict";
	
	var SoundManager = function(options){
		this.fx = Game.getInstance().add.audio('sound1');
		this.fx.addMarker('home', 1, 1.0);
	};
	
	SoundManager.create = function(){
		SoundManager.instance = new SoundManager();
	};
	
	SoundManager.getInstance = function(){
		if(!SoundManager.instance){
			SoundManager.create();
		}
		return SoundManager.instance;
	};
	
	SoundManager.prototype.play = function(name){
		this.fx.play('home');
	};
	
	return SoundManager;
	
});
