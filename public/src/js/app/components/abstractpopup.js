
define(['app/components/buttons/closebutton', 'app/game',

'app/components/container', 'app/utils/textfactory'],

function(CloseButton, Game,

Container, TextFactory){
	
	"use strict";
		
	var AbstractPopup = function(options){
		this.buttons = [];
		this.selectSignal = new Phaser.Signal();
		Container.call(this, options);
	};
	
	AbstractPopup.prototype = Object.create(Container.prototype);
	AbstractPopup.prototype.constructor = AbstractPopup;
	
	AbstractPopup.prototype.addPanel = function () {
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	AbstractPopup.prototype.buttonUp = function(data) {
		var index = this.buttonGroup.getIndex(data.target.sprite);
		this.selectSignal.dispatch({"index":index});
	};
	
	AbstractPopup.prototype.addButton = function (ClassRef, bounds) {
		var b = new ClassRef({'bounds':bounds});
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.sprite);
		this.buttons.push(b);
	};
	
	AbstractPopup.prototype.addButtonGroup = function () {
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		this.group.add(this.buttonGroup);
	};
	
	AbstractPopup.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addPanel();
		this.addButtonGroup();
	};
	
	return AbstractPopup;
	
});
	



