
define('app/components/scroller/groupmarker',['app/game', 'app/components/buttons/markerbutton', 'phasercomponents'],

function(Game, MarkerButton, PhaserComponents){
	
	"use strict";
	
	var GroupMarker = function(options){
		this.buttons = [];
		PhaserComponents.Container.call(this, Game.getInstance(), options);
	};
	
	GroupMarker.prototype = Object.create(PhaserComponents.Container.prototype);
	GroupMarker.prototype.constructor = GroupMarker;
	
	GroupMarker.prototype.create = function(){
		PhaserComponents.Container.prototype.create.call(this);
		var b, i, x;
		for(i = 0; i <= this.options.num - 1; i++){
			x = Game.cx() - 20 * this.options.num + i * 40;
			b = new MarkerButton({'bounds':{"x":x, "y":Game.h() - 40}});
			this.group.add(b.sprite);
			this.buttons.push(b);
		}
		this.setSelected(0);
	};
	
	GroupMarker.prototype.destroy = function() {
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	GroupMarker.prototype.setSelected = function(index) {
		this.buttons.forEach(function(button, i){
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



