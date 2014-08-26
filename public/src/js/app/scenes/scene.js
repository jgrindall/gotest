
define(['jquery', 'app/game', 'app/components/background'], function($, Game, Background){
	
	"use strict";
	
	var Scene  = function(key){
		this.key = key;
		this.navigationSignal = new Phaser.Signal();
		this.world = Game.getInstance().world;
		Game.alertSignal.add(this.onAlert, this);
	};
	
	Scene.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	Scene.prototype.disableAllInput = function(){
	
	};
	
	Scene.prototype.enableAllInput = function(){
	
	};
	
	Scene.prototype.addChildren = function() {
		
	};
	
	Scene.prototype.create = function() {
		this.addChildren();
	};

	Scene.prototype.update = function() {
    	//
	};

	Scene.prototype.shutdown = function() {
		Game.alertSignal.remove(this.onAlert, this);
	};
	
	return Scene;

});
	
	



