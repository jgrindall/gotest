define(['app/game'], function(Game){
	
	"use strict";
	
	var Stars = function(){
		
	};

	Stars.prototype.create = function () {
		this.group = new Phaser.Group(Game.getInstance());
		Game.getInstance().physics.enable(this.group, Phaser.Physics.ARCADE);
		this.group.enableBody = true;
	    var star = this.group.create(200, 0, 'star');
		star.body.bounce.y = 0.1;
	};

	Stars.prototype.update = function() {
    
	};
	
	return Stars;
	
});

