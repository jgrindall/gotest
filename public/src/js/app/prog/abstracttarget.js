define( ['app/prog/dropview'],

	function(DropView){
	
	"use strict";

	var AbstractTarget = function(parent){
		this.parent = parent;
		this.group = parent.group;
		this.bounds = parent.bounds;
		this.game = parent.game;
		this.targets = parent.targets;
	};

	AbstractTarget.prototype.build = function(){
		this.decorate();
		this.addBlocks();
	};

	AbstractTarget.prototype.addTarget = function(options){
		var target = new DropView(options);
		this.targets.push(target);
		this.group.add(target.sprite);
	};

	AbstractTarget.prototype.destroy = function(){
		this.parent = null;
		this.group = null;
		this.bounds = null;
		this.game = null;
		this.targets = null;
	};

	return AbstractTarget;
});

