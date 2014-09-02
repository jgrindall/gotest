
define('app/components/container',['phaser','app/game'],

function(Phaser, Game){
	
	"use strict";
	
	var Container = function(options){
		this.options = options || {};
		this.bounds = this.options.bounds || {"x":0, "y":0, "w":100, "h":100};
		this.create();
	};

	Container.prototype.create = function(){
		this.group = new Phaser.Group(Game.getInstance());
	};
	
	Container.prototype.destroy = function() {
		this.group.removeAll(true);
	};
	
	return Container;

});



