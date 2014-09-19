
define(['phasercomponents',

'app/views/buttons/nextbutton', 'app/views/buttons/skipbutton',

'app/views/buttons/closebutton', 'app/assets'],

function(PhaserComponents,

NextButton, SkipButton,

CloseButton, Assets){
	
	"use strict";
		
	var ToolTip = function(options){
		options.bgasset = Assets.TOOLTIPS[options.arrow];
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ToolTip, PhaserComponents.Display.AbstractPopup);

	ToolTip.WIDTH = 420;
	ToolTip.HEIGHT = 250;
	
	ToolTip.prototype.addText = function () {
		this.label = PhaserComponents.TextFactory.make('small', this.game, 160 + this.bounds.x + this.bounds.w/2, this.bounds.y + 90, this.options.label);
		this.label.x -= this.label.width/2;
		this.group.add(this.label);
	};

	ToolTip.prototype.useBg = function () {
		return false;
	};
	
	ToolTip.prototype.addSkipButton = function () {
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (SkipButton.WIDTH/2);
		bounds = {"x":middle - 100, "y":this.bounds.y + this.bounds.h - SkipButton.HEIGHT};
		this.addButton(SkipButton, bounds);
	};
	
	ToolTip.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 55, "y":this.bounds.y + 1};
		this.addButton(CloseButton, bounds);
	};

	ToolTip.prototype.addNextButton = function () { 
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (NextButton.WIDTH/2);
		bounds = {"x":middle + 100, "y":this.bounds.y + this.bounds.h - NextButton.HEIGHT};
		this.addButton(NextButton, bounds);
	};

	ToolTip.prototype.onShown = function () {
		PhaserComponents.Display.AbstractPopup.prototype.onShown.call(this);
	};

	ToolTip.prototype.addImage = function () {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y + 30};
		this.img = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":5, "asset":Assets.TOOLTIP_IMAGE});
		this.img.goTo(this.options.num);
		this.group.add(this.img.view);
	};

	ToolTip.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addSkipButton();
		this.addNextButton();
		this.addImage();
		this.addCloseButton();
	};
	
	ToolTip.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return ToolTip;
	
});
	





