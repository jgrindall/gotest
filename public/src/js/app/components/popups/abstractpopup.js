
define('app/components/popups/abstractpopup',['phaser',

'phasercomponents'],

function(Phaser,

PhaserComponents){
	
	"use strict";
		
	var AbstractPopup = function(options){
		this.buttons = [];
		this.selectSignal = new Phaser.Signal();
		PhaserComponents.Container.call(this, options);
		this.group.y = this.game.h + 50;
	};
	
	AbstractPopup.prototype = Object.create(PhaserComponents.Container.prototype);
	AbstractPopup.prototype.constructor = AbstractPopup;
	
	AbstractPopup.prototype.addPanel = function () {
		this.panel = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	AbstractPopup.prototype.showMe = function () {
		this.game.add.tween(this.group).to( {x: 0, y: 0}, 300, Phaser.Easing.Back.Out, true, 0, false);
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
		this.buttonGroup = new Phaser.Group(this.game, 0, 0);
		this.group.add(this.buttonGroup);
	};
	
	AbstractPopup.prototype.create = function () {
		PhaserComponents.Container.prototype.create.call(this);
		this.addPanel();
		this.addButtonGroup();
	};
	
	return AbstractPopup;
	
});
	



