
define(['app/game', 'app/components/background'], function(Game, Background){
	
	"use strict";
	
	var Scene  = function(key){
		this.key = key;
		this.navigationSignal = new Phaser.Signal();
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
		this.bg = new Background({"asset":'sky'});
		this.bg.create();
		Game.getInstance().world.add(this.bg.sprite);
	};
	
	Scene.prototype.create = function() {
		this.addChildren();
		Game.alertSignal.add($.proxy(this.onAlert, this));
	};

	Scene.prototype.update = function() {
    	//
	};

	Scene.prototype.shutdown = function() {
		Game.alertSignal.removeAll(this);
	};
	
	return Scene;

});
	
	



