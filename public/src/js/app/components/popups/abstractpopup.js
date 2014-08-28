
define(['app/components/buttons/closebutton', 'app/game',

'app/components/container', 'app/utils/textfactory'],

function(CloseButton, Game,

Container, TextFactory){
	
	"use strict";
		
	var AbstractPopup = function(options){
		this.buttons = [];
		this.selectSignal = new Phaser.Signal();
		Container.call(this, options);
		this.group.y = Game.h() + 50;
	};
	
	AbstractPopup.prototype = Object.create(Container.prototype);
	AbstractPopup.prototype.constructor = AbstractPopup;
	
	AbstractPopup.prototype.addPanel = function () {
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	AbstractPopup.prototype.getData = function() {
		return {};
	};
	
	AbstractPopup.prototype.buttonUp = function(data) {
		var index, selectionData;
		index = this.buttonGroup.getIndex(data.target.sprite);
		selectionData = this.getData();
		this.selectSignal.dispatch({"index":index, "selection":selectionData});
	};
	
	AbstractPopup.prototype.addButton = function (ClassRef, bounds) {
		var b = new ClassRef({'bounds':bounds});
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.sprite);
		this.buttons.push(b);
		this.group.bringToTop(this.buttonGroup);
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
	



