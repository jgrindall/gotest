
define(['app/components/buttons/tickbutton', 'app/game', 'app/components/container', 'app/utils/textfactory'],

function(TickButton, Game, Container, TextFactory){
	
	"use strict";
		
	var Alert = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
		this.buttons = [];
	};
	
	Alert.WIDTH = 400;
	Alert.HEIGHT = 200;
	
	Alert.prototype = Object.create(Container.prototype);
	Alert.prototype.constructor = Alert;
	
	Alert.prototype.addRect = function () {
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, 'alert');
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		this.group.add(this.panel);
		this.group.add(this.buttonGroup);
	};
	
	Alert.prototype.addBg = function () {
		this.rect = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.rect.beginFill(0x000000);
		this.rect.alpha = 0.7;
    	this.rect.drawRect(0, 0, Game.w(), Game.h());
		this.group.add(this.rect);
	};
	
	Alert.prototype.addText = function () {
		this.label = TextFactory.make(Game.cx() - 150, this.bounds.y + 20, this.options.label, TextFactory.SMALL);
		this.group.add(this.label);
	};
	
	Alert.prototype.addOk = function () {
		var x, y, b;
		x = Game.cx() - TickButton.WIDTH/2;
		y = this.bounds.y + this.bounds.h - TickButton.HEIGHT;
		b = new TickButton({"x":x, "y":y});
		b.create();
		b.mouseUpSignal.add(this.buttonUp, this);
		this.group.add(b.sprite);
	};
	
	Alert.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addBg();
		this.addRect();
		this.addOk();
		this.addText();
	};
	
	Alert.prototype.buttonUp = function(data) {
		this.selectSignal.dispatch();
	};
	
	Alert.prototype.destroy = function() {
		$.each(this.buttons, function(i, b){
			b.mouseUpSignal.removeAll(this);
		});
		Container.prototype.destroy.call(this);
	};
	
	return Alert;
	
});
	






