
define(['phasercomponents',

'base/assets', 'base/views/buttons/okbuttoncontainer'],

function(PhaserComponents,

Assets, OkButtonContainer){
	
	"use strict";
		
	var ToolTip = function(options){
		options.bgasset = Assets.TOOLTIPS[options.arrow];
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ToolTip, PhaserComponents.Display.AbstractPopup);

	ToolTip.WIDTH = 420;
	ToolTip.HEIGHT = 250;
	ToolTip.WAIT = 7;

	ToolTip.prototype.addText = function () {
		var x, y;
		x = this.bounds.x + 216;
		y = this.bounds.y + 70;
		this.label = PhaserComponents.TextFactory.make('small', this.game, x, y, this.options.label);
		this.label.x -= this.label.width/2;
		this.group.add(this.label);
	};

	ToolTip.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT};
		this.addButton(OkButtonContainer, bounds);
	};

	ToolTip.prototype.showMe = function(){

	};

	ToolTip.prototype.useBg = function () {
		return false;
	};

	ToolTip.prototype.disableOnShow = function(){
		return false;
	};

	ToolTip.prototype.useAnimate = function(){
		return false;
	};

	ToolTip.prototype.onShown = function () {
		PhaserComponents.Display.AbstractPopup.prototype.onShown.call(this);
	};

	ToolTip.prototype.addImage = function () {
		var x, y;
		x = this.bounds.x + 74;
		y = this.bounds.y + 23;
		if(this.options.imageAsset){
			this.img = new Phaser.Sprite(this.game, x, y, this.options.imageAsset);
			this.group.add(this.img);
		}
	};

	ToolTip.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addImage();
		this.addOkButton();
		this.addListener();
		this.wait();
	};
	
	ToolTip.prototype.onMouseUp = function(){
		this.selectSignal.dispatch({"index":0});
	};

	ToolTip.prototype.addListener = function(){
		this.panel.inputEnabled = true;
		this.panel.events.onInputUp.add(this.onMouseUp, this);
	};

	ToolTip.prototype.removeListener = function(){
		this.panel.inputEnabled = false;
		this.panel.events.onInputUp.remove(this.onMouseUp, this);
	};

	ToolTip.prototype.forceClose = function(){
		this.fadeTween = this.game.add.tween(this.view).to( {'alpha': 0}, 0, Phaser.Easing.Linear.None, true, 600, false);
   		this.fadeTween.onComplete.add(this.tweenDone, this);
	};

	ToolTip.prototype.tweenDone = function(){
		this.selectSignal.dispatch({"index":0});
	};

	ToolTip.prototype.wait = function(){
		var that = this;
		this.waitTimeout = setTimeout(function(){
			that.forceClose();
		}, ToolTip.WAIT*1000);
	};

	ToolTip.prototype.destroy = function() {
		this.removeListener();
   		if(this.fadeTween){
   			this.fadeTween.stop();
   			this.fadeTween.onComplete.remove(this.tweenDone, this);
		}
		clearTimeout(this.waitTimeout);
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return ToolTip;
	
});
	





