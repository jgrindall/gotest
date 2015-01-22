
define(['phasercomponents',

'app/views/popups/growl',

'app/views/buttons/challengedonebutton'],

function(PhaserComponents,

Growl,

ChallengeDoneButton){
	
	"use strict";
		
	var ChallengeDone = function(options){
		console.log(options);
		Growl.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ChallengeDone, Growl);

	ChallengeDone.WIDTH = 420;
	ChallengeDone.HEIGHT = 250;
	
	ChallengeDone.prototype.create = function () {
		var bounds;
		Growl.prototype.create.call(this);
		if(this.options.showNext){
			bounds = {"x":this.bounds.x + this.bounds.w - ChallengeDoneButton.WIDTH - 39, "y":this.bounds.y + this.bounds.h - ChallengeDoneButton.HEIGHT};
			this.addButton(ChallengeDoneButton, bounds);
			this.buttons[0].view.x -= 94;
		}
	};
	
	ChallengeDone.prototype.destroy = function() {
		// remove the other button
		Growl.prototype.destroy.call(this);
	};
	
	return ChallengeDone;
	
});
	





