
define(['phasercomponents',

'app/views/buttons/nextbutton', 'app/views/buttons/skipbutton', 'app/views/buttons/startbutton',

'app/views/buttons/closebutton', 'app/assets'],

function(PhaserComponents,

NextButton, SkipButton, StartButton,

CloseButton, Assets){
	
	"use strict";
		
	var ToolTip = function(options){
		options.bgasset = Assets.TOOLTIPS[options.arrow];
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ToolTip, PhaserComponents.Display.AbstractPopup);

	ToolTip.WIDTH = 420;
	ToolTip.HEIGHT = 250;
	ToolTip.DX = 50;

	ToolTip.prototype.addText = function () {
		this.label = PhaserComponents.TextFactory.make('small', this.game, ToolTip.DX + this.bounds.x + this.bounds.w/2, this.bounds.y + 55, this.options.label);
		this.label.x -= this.label.width/2;
		this.label.x += this.options.dx;
		this.group.add(this.label);
	};

	ToolTip.prototype.useBg = function () {
		return false;
	};
	
	ToolTip.prototype.addSkipButton = function () {
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (SkipButton.WIDTH/2);
		bounds = {"x":middle - 100 + this.options.dx, "y":this.bounds.y + this.bounds.h - SkipButton.HEIGHT};
		this.addButton(SkipButton, bounds);
	};

	ToolTip.prototype.addNextButton = function () { 
		var middle, bounds, ClassRef = NextButton;
		if(this.options.end){
			ClassRef = StartButton;
		}
		middle = this.bounds.x + this.bounds.w/2 - (ClassRef.WIDTH/2);
		bounds = {"x":middle + 100 + this.options.dx, "y":this.bounds.y + this.bounds.h - ClassRef.HEIGHT};
		this.addButton(ClassRef, bounds);
	};

	ToolTip.prototype.onShown = function () {
		PhaserComponents.Display.AbstractPopup.prototype.onShown.call(this);
	};

	ToolTip.prototype.addImage = function () {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y + 15};
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
	





