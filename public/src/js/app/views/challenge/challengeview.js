

define(['phasercomponents', 'app/views/challenge/challengebutton',

'app/views/buttons/skipbutton', 'app/views/buttons/okbutton',

'app/views/buttons/closebutton', 'app/assets'],

function(PhaserComponents, ChallengeButton,

SkipButton, OkButton, 

CloseButton, Assets){
	
	"use strict";
		
	var ChallengeView = function(options){
		options.bgasset = Assets.PANEL;
		this.selectedIndex = null;
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ChallengeView, PhaserComponents.Display.AbstractPopup);

	ChallengeView.WIDTH = 720;
	ChallengeView.HEIGHT = 540;

	ChallengeView.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT};
		this.addButton(OkButton, bounds);
	};

	ChallengeView.prototype.addSkipButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (SkipButton.WIDTH/2);
		var bounds = {"x":middle + 200, "y":this.bounds.y + this.bounds.h - SkipButton.HEIGHT};
		this.addButton(SkipButton, bounds);
	};
	
	ChallengeView.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 55, "y":this.bounds.y + 1};
		this.addButton(CloseButton, bounds);
	};
	
	ChallengeView.prototype.addGrid = function(){
		var options, bounds, p, size, x, y;
		p = 40;
		size = 2*ChallengeButton.WIDTH + p;
		x = this.bounds.x + (this.bounds.w - size)/2;
		y = this.bounds.y + (this.bounds.h - size)/2 - 8;
		bounds = {'x':x, 'y':y, 'w':size, 'h':size};
		options = {"bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ChallengeButton};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.onChanged, this);
		this.group.add(this.grid.group);
	};

	ChallengeView.prototype.getData = function(){
		return this.selectedIndex;
	};

	ChallengeView.prototype.onChanged = function(data) {
		this.selectedIndex = data.index;
	};

	ChallengeView.prototype.positionFree = function() {
		
	};

	ChallengeView.prototype.removeTitle = function() {
		this.group.remove(this.label);
		this.label = null;
	};

	ChallengeView.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 10, this.bounds.y + 7, "Welcome to 2Go!  Choose a challenge or skip");
 		this.group.add(this.label);
	};

	ChallengeView.prototype.removeGrid = function() {
		if(this.grid){
			this.grid.clickSignal.remove(this.onChanged, this);
			this.group.remove(this.grid.view);
			this.grid.destroy();
			this.grid = null;
		}
	};

	ChallengeView.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addGrid();
		this.addOkButton();
		this.addSkipButton();
		this.addTitle();
		this.addCloseButton();
	};

	ChallengeView.prototype.destroy = function() {
		this.removeGrid();
		this.removeTitle();
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return ChallengeView;
	
});
	







