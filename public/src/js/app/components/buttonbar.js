
define(['app/game', 'app/components/container', 'app/components/buttongrid'],

function(Game, Container, ButtonGrid){
	
	"use strict";
	
	var ButtonBar = function(options){
		ButtonGrid.call(this, options);
		if(options.numX === 1){
			this.direction = ButtonBar.VERTICAL;
		}
		else if(options.numY === 1){
			this.direction = ButtonBar.HORIZONTAL;
		}
		if(!this.direction){
			throw "Not a button bar";
		}
	};
	
	ButtonBar.HORIZONTAL = "horizontal";
	ButtonBar.VERTICAL = "vertical";
	
	ButtonBar.prototype = Object.create(ButtonGrid.prototype);
	ButtonBar.prototype.constructor = ButtonBar;
	
	ButtonBar.prototype.create = function(){
		ButtonGrid.prototype.create.call(this);
	};
	
	ButtonBar.prototype.addButtons = function(){
		ButtonGrid.prototype.addButtons.call(this);
	};
	
	ButtonBar.prototype.destroy = function() {
		ButtonGrid.prototype.destroy.call(this);
	};
	
	ButtonBar.prototype.buttonUp = function(data) {
		ButtonGrid.prototype.buttonUp.call(this, data);
	};
	
	return ButtonBar;

});



