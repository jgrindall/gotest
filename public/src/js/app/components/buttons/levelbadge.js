
define(['app/components/buttons/levelsbutton', 'app/game', 'app/components/container', 'app/utils/textfactory', 'app/levelstate'],

function(LevelsButton, Game, Container, TextFactory, LevelState){
	
	"use strict";
		
	var LevelBadge = function(options){
		Container.call(this, options);
		this.state = this.options.state;
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	LevelBadge.prototype = Object.create(Container.prototype);
	LevelBadge.prototype.constructor = LevelBadge;
	
	LevelBadge.prototype.addText = function () {
		var text = "" + (this.options.index + 1);
		this.label = TextFactory.make(this.options.bounds.x + 40, this.options.bounds.y + 10, text, TextFactory.LARGE);
		this.group.add(this.label);
	};
	
	LevelBadge.prototype.select = function () {
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	LevelBadge.prototype.getAsset = function () {
		return LevelBadge.ASSETS[this.state];
	};
	
	LevelBadge.prototype.addMain = function () {
		this.button = new LevelsButton({"x":this.options.bounds.x, "y":this.options.bounds.y, "asset":this.getAsset()});
		this.button.create();
		this.button.mouseUpSignal.add(this.select, this);
		this.group.add(this.button.sprite);
	};
	
	LevelBadge.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addMain();
		this.addText();
	};
	
	LevelBadge.prototype.destroy = function () {
		this.button.mouseUpSignal.removeAll(this);
		Container.prototype.destroy.call(this);
		this.mouseUpSignal = null;
		this.label = null;
		this.button = null;
	};
	
	LevelBadge.WIDTH = 150;
	LevelBadge.HEIGHT = 150;
	
	LevelBadge.ASSETS = [];
	LevelBadge.ASSETS[LevelState.OPEN] = 'levelbutton';
	LevelBadge.ASSETS[LevelState.LOCKED] = 'levelbuttonlocked';
	LevelBadge.ASSETS[LevelState.COMPLETED] = 'levelbuttondone';
	
	return LevelBadge;
	
});
	







