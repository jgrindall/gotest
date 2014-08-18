
define(['phaser'], function(Phaser){
	
	"use strict";
	
	Phaser.Group.prototype.hitTest = function(input){
		var hits = false;
		var pointer = input.activePointer;
		this.forEachAlive(function(child){
			var localPoint = input.getLocalPosition(child, pointer);
			if(input.hitTest(child, pointer, localPoint)){
				hits = true;
			}
		});
		return hits;
	};
	
	Phaser.Group.prototype.enableInput = function(){
		this.forEach(function(child){
			if(child instanceof Phaser.Group){
				child.enableInput();
			}
			else if(child instanceof Phaser.Button){
				child.inputEnabled = true;
			}
		});
	};
	
	Phaser.Group.prototype.disableInput = function(){
		this.forEach(function(child){
			if(child instanceof Phaser.Group){
				child.disableInput();
			}
			else if(child instanceof Phaser.Button){
				child.inputEnabled = false;
			}
		});
	};
	
});
	
	



