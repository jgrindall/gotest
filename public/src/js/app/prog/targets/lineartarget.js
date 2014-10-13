define( ['app/prog/views/dropview',	'app/assets',

	'phasercomponents', 'app/prog/targets/abstracttarget'],

	function(DropView, Assets,

		PhaserComponents, AbstractTarget){
	
	"use strict";

	var LinearTarget = function(){
		AbstractTarget.call(this);
	};

	LinearTarget.NUM = 			5;
	LinearTarget.TOP = 			25;
	LinearTarget.BOTTOM = 		250;
	LinearTarget.BLOCK_TOP = 	54;
	LinearTarget.GAP = 			55;
	LinearTarget.STOP_POS = 	{'x':110, 'y':322};

	PhaserComponents.Utils.extends(LinearTarget, AbstractTarget);

	LinearTarget.prototype.decorate = function(){
		var p0, p1;
		p0 = {'x':this.middle, 'y':LinearTarget.TOP};
		p1 = {'x':p0.x, 'y':this.parent.game.h + LinearTarget.TOP - LinearTarget.BOTTOM};
		this.drawLine(p0, p1);
	};

	LinearTarget.prototype.addBlocks = function(){
		var i, numTargets = LinearTarget.NUM, bounds, y0;
		y0 = this.bounds.y + LinearTarget.BLOCK_TOP;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.middle - DropView.WIDTH/2, 'y':y0 + LinearTarget.GAP*i};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
		}
	};

	return LinearTarget;
});

