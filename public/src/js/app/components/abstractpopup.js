
define(['app/components/buttons/closebutton', 'app/game', 'app/components/container', 'app/utils/textfactory'],

function(CloseButton, Game, Container, TextFactory){
	
	"use strict";
		
	var AbstractPopup = function(options){
		this.children = [];
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
	};
	
	AbstractPopup.prototype = Object.create(Container.prototype);
	AbstractPopup.prototype.constructor = AbstractPopup;
	
	AbstractPopup.prototype.addPanel = function () {
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.containerGroup.add(this.panel);
	};
	
	AbstractPopup.prototype.addBg = function () {
		this.rect = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.rect.beginFill(0x000000);
		this.rect.alpha = 0.7;
    	this.rect.drawRect(0, 0, Game.w(), Game.h());
		this.group.add(this.rect);
	};
	
	AbstractPopup.prototype.addText = function () {
		this.label = TextFactory.make(Game.cx() - 150, this.bounds.y + 20, this.options.label, TextFactory.SMALL);
		this.containerGroup.add(this.label);
	};
	
	AbstractPopup.prototype.getPosition = function (ClassRef, pos, i, num) {
		var x0 = this.bounds.x + this.bounds.w/2 - num*(ClassRef.WIDTH)/2;
		if(pos === 'topright'){
			return {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		}
		else if(pos === 'middle'){
			return {"x":x0 + i * ClassRef.WIDTH, "y":this.bounds.y + this.bounds.h/2 - ClassRef.HEIGHT/2};
		}
		else if(pos === 'bottom'){
			return {"x":Game.cx() - ClassRef.WIDTH/2, "y":this.bounds.y + this.bounds.h - ClassRef.HEIGHT};
		}
	};
	
	AbstractPopup.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.containerGroup).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	AbstractPopup.prototype.addButtonGroup = function () {
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		this.containerGroup.add(this.buttonGroup);
		this.containerGroup.y = Game.h();
	};
	
	AbstractPopup.prototype.addContainer = function () {
		this.containerGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		this.group.add(this.containerGroup);
	};
	
	AbstractPopup.prototype.addCloseButton = function () {
		this.addButton(CloseButton, 'topright');
	};
	
	AbstractPopup.prototype.addButtons = function () {
		
	};
	
	AbstractPopup.prototype.addButton = function (ClassRef, pos, i, num) {
		var p, b;
		p = this.getPosition(ClassRef, pos, i, num);
		b = new ClassRef({"x":p.x, "y":p.y});
		b.pos = pos;
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.sprite);
		this.children.push(b);
	};
	
	AbstractPopup.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addBg();
		this.addContainer();
		this.addPanel();
		this.addText();
		this.addButtonGroup();
		this.addButtons();
	};
	
	AbstractPopup.prototype.buttonUp = function(data) {
		var index = this.buttonGroup.getIndex(data.target.sprite);
		this.selectSignal.dispatch({"index":index});
	};
	
	AbstractPopup.prototype.destroy = function() {
		$.each(this.children, function(i, b){
			b.mouseUpSignal.removeAll(this);
			b.destroy();
		});
		Container.prototype.destroy.call(this);
	};
	
	return AbstractPopup;
	
});
	



