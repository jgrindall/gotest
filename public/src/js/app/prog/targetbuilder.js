define( ['phasercomponents', 'phaser', 'app/consts/progtypes', 'app/prog/dropview'],

	function(PhaserComponents, Phaser, ProgTypes, DropView){
	
	"use strict";

	var TargetBuilder = function(type){
		this.type = type;
	};

	TargetBuilder.prototype.buildLinear = function(parent){
		this.decorateLinear(parent);
		this.addBlocksLinear(parent);
	};

	TargetBuilder.prototype.decorateLinear = function(parent){
		var gfx, middle, lineWidth;
		lineWidth = 8;
		gfx = new Phaser.Graphics(parent.game, 0, 0);
		middle = parent.bounds.x + parent.bounds.w/2;
		parent.group.add(gfx);
		gfx.lineStyle(lineWidth, 0xbbbbbb, 1);
   		gfx.moveTo(middle + 2, 70);
   		gfx.lineTo(middle + 2, 400);
		gfx.lineStyle(lineWidth, 0xffffff, 1);
   		gfx.moveTo(middle, 70);
   		gfx.lineTo(middle, 400);
	};

	TargetBuilder.prototype.addBlocksLinear = function(parent){
		var i, target, numTargets = 6, bounds;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':parent.bounds.x + (parent.bounds.w - DropView.WIDTH)/2, 'y':parent.bounds.y + 60 + 55*i};
			target = new DropView({'index':i, 'bounds':bounds});
			parent.targets.push(target);
			parent.group.add(target.sprite);
		}
	};

	TargetBuilder.prototype.build = function(parent){
		if(this.type === ProgTypes.LINEAR){
			this.buildLinear(parent);
		}
	};

	return TargetBuilder;
});

