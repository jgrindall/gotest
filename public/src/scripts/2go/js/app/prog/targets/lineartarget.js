define( ['base/prog/views/dropview',	'base/assets',

	'phasercomponents', 'base/prog/targets/abstracttarget'],

	function(DropView, Assets,

		PhaserComponents, AbstractTarget){
	
	"use strict";

	var LinearTarget = function(){
		AbstractTarget.call(this);
	};

	LinearTarget.NUM = 			5;
	LinearTarget.TOP = 			25;
	LinearTarget.BOTTOM = 		345;
	LinearTarget.BLOCK_TOP = 	52;
	LinearTarget.GAP = 			54;
	LinearTarget.START_POS = 	{'x':-50, 'y':0};
	LinearTarget.STOP_POS = 	{'x':-50, 'y':321};
	LinearTarget.HEIGHT =		600;

	PhaserComponents.Utils.extends(LinearTarget, AbstractTarget);

	LinearTarget.prototype.init = function(){
		
	};

	LinearTarget.prototype.decorate = function(){
		var p0, p1;
		p0 = {'x':this.middle, 'y':LinearTarget.TOP};
		p1 = {'x':p0.x, 'y':LinearTarget.BOTTOM};
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

