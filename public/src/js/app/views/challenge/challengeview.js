

define(['phasercomponents', 'app/views/challenge/challengebutton',

'app/views/buttons/skipbutton', 'app/views/buttons/okbuttoncontainer',

'app/views/buttons/closebutton', 'app/assets'],

function(PhaserComponents, ChallengeButton,

SkipButton, OkButtonContainer, 

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
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT};
		this.addButton(OkButtonContainer, bounds);
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
		var options, bounds, px, py, w, h, x, y;
		px = 5;
		py = 10;
		w = 4*ChallengeButton.WIDTH + px;
		h = 2*ChallengeButton.WIDTH + py;
		x = this.bounds.x + (this.bounds.w - w)/2;
		y = this.bounds.y + (this.bounds.h - h)/2 - 8;
		bounds = {'x':x, 'y':y, 'w':w, 'h':h};
		options = {"bounds":bounds, "numX": 4, "numY": 2, "buttonClass": ChallengeButton};
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
		var s = "Welcome to 2Go!  Choose a challenge or skip to just dive in!";
		this.label = PhaserComponents.TextFactory.make('mediumheader', this.game, this.bounds.x + 10, this.bounds.y + 7, s);
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
	







