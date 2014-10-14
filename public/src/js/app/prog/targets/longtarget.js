define( ['app/prog/views/dropview',	'app/assets',

	'phasercomponents', 'app/prog/targets/abstracttarget'],

	function(DropView, Assets,

		PhaserComponents, AbstractTarget){
	
	"use strict";

	var LongTarget = function(){
		AbstractTarget.call(this);
	};

	LongTarget.NUM = 			5;
	LongTarget.TOP = 			25;
	LongTarget.BOTTOM = 		250;
	LongTarget.BLOCK_TOP = 	54;
	LongTarget.GAP = 			55;
	LongTarget.START_POS = 	{'x':114, 'y':0};
	LongTarget.STOP_POS = 	{'x':114, 'y':322};
	LongTarget.HEIGHT =		500;

	PhaserComponents.Utils.extends(LongTarget, AbstractTarget);

	LongTarget.prototype.init = function(){
		this.middle += 25;
	};

	LongTarget.prototype.decorate = function(){
		var p0, p1;
		p0 = {'x':this.middle, 'y':LongTarget.TOP};
		p1 = {'x':p0.x, 'y':this.parent.game.h + LongTarget.TOP - LongTarget.BOTTOM};
		this.drawLine(p0, p1);
	};

	LongTarget.prototype.addBlocks = function(){
		var i, numTargets = LongTarget.NUM, bounds, y0;
		y0 = this.bounds.y + LongTarget.BLOCK_TOP;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.middle - DropView.WIDTH/2, 'y':y0 + LongTarget.GAP*i};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
		}
	};

	return LongTarget;
});

