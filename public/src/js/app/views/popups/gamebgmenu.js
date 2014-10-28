
define(

	['app/views/components/arrowselectormenu', 'phasercomponents',

	'app/views/buttons/addbutton', 'app/views/buttons/challengebutton'

],

function(

ArrowSelectorMenu, PhaserComponents,

AddButton, ChallengeButton

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		ArrowSelectorMenu.call(this, options);
	};
	
	GameBgMenu.WIDTH = 720;
	GameBgMenu.HEIGHT = 540;
	
	PhaserComponents.Utils.extends(GameBgMenu, ArrowSelectorMenu);

	GameBgMenu.prototype.create = function () {
		ArrowSelectorMenu.prototype.create.call(this);
		this.addAdd();
		this.addChallenge();
	};

	GameBgMenu.prototype.addChallenge = function () {
		var bounds = {"x":this.bounds.x + 10, "y":this.bounds.y + this.bounds.h - AddButton.HEIGHT + 4};
		this.addButton(ChallengeButton, bounds);
	};

	GameBgMenu.prototype.addAdd = function () {
		var middle = this.bounds.x + this.bounds.w - AddButton.WIDTH + 14;
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - AddButton.HEIGHT + 4};
		this.addButton(AddButton, bounds);
	};

	return GameBgMenu;
	
});



