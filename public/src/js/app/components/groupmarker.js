
define(['app/game', 'app/components/buttons/markerbutton', 'app/components/container'],function(Game, MarkerButton, Container){
	
	"use strict";
	
	var GroupMarker = function(options){
		Container.call(this, options);
		this.buttons = [];
	};
	
	GroupMarker.prototype = Object.create(Container.prototype);
	GroupMarker.prototype.constructor = GroupMarker;
	
	GroupMarker.prototype.create = function(){
		Container.prototype.create.call(this);
		var b, i, x;
		for(i = 0; i <= this.options.num - 1; i++){
			x = Game.cx() - 20 * this.options.num + i * 40;
			b = new MarkerButton({"x":x, "y":Game.h() - 40});
			b.create();
			this.group.add(b.sprite);
			this.buttons.push(b);
		}
		this.setSelected(0);
	};
	
	GroupMarker.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
	};
	
	GroupMarker.prototype.setSelected = function(index) {
		$.each(this.buttons, function(i, button){
			if(i === index){
				button.select();
			}
			else{
				button.deselect();
			}
		});
	};

	return GroupMarker;

});



