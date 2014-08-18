
define(['app/game', 'app/components/background'], function(Game, Background){
	
	"use strict";
	
	var Scene  = function(key){
		this.key = key;
		this.navigationSignal = new Phaser.Signal();
		this.world = Game.getInstance().world;
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
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':0, 'y':0, 'w':w, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.bg.create();
		this.world.add(this.bg.sprite);
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
	
	



