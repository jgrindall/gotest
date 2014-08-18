
define(['app/components/buttons/levelsbutton', 'app/game', 'app/components/container', 'app/utils/textfactory', 'app/levelstate'],

function(LevelsButton, Game, Container, TextFactory, LevelState){
	
	"use strict";
		
	var ArrowBadge = function(options){
		Container.call(this, options);
		this.state = this.options.data;
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	ArrowBadge.prototype = Object.create(Container.prototype);
	ArrowBadge.prototype.constructor = ArrowBadge;
	
	ArrowBadge.prototype.addText = function () {
		var text = "" + (this.options.index + 1);
		this.label = TextFactory.make(this.options.bounds.x + 40, this.options.bounds.y + 10, text, TextFactory.LARGE);
		this.group.add(this.label);
	};
	
	ArrowBadge.prototype.select = function () {
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ArrowBadge.prototype.getAsset = function () {
		return ArrowBadge.ASSETS[this.state];
	};
	
	ArrowBadge.prototype.addMain = function () {
		this.button = new LevelsButton({"x":this.options.bounds.x, "y":this.options.bounds.y, "asset":this.getAsset()});
		this.button.create();
		this.button.mouseUpSignal.add(this.select, this);
		this.group.add(this.button.sprite);
	};
	
	ArrowBadge.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addMain();
		this.addText();
	};
	
	ArrowBadge.prototype.destroy = function () {
		this.button.mouseUpSignal.removeAll(this);
		Container.prototype.destroy.call(this);
		this.mouseUpSignal = null;
		this.label = null;
		this.button = null;
	};
	
	ArrowBadge.WIDTH = 150;
	ArrowBadge.HEIGHT = 150;
	
	ArrowBadge.ASSETS = [];
	ArrowBadge.ASSETS[LevelState.OPEN] = 'levelbutton';
	ArrowBadge.ASSETS[LevelState.LOCKED] = 'levelbuttonlocked';
	ArrowBadge.ASSETS[LevelState.COMPLETED] = 'levelbuttondone';
	
	return ArrowBadge;
	
});
	







