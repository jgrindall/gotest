
define(['app/game'],function(Game){
	
	"use strict";
	
	var Container = function(options){
		this.options = options || {};
		this.bounds = this.options.bounds;
	};

	Container.prototype.create = function(){
		this.group = new Phaser.Group(Game.getInstance());
	};
	
	Container.prototype.destroy = function() {
		this.group.removeAll(true);
	};

	return Container;

});



