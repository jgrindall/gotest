
define( ['phasercomponents', 'base/prog/targets/abstracttarget',

	'base/assets', 'base/prog/views/dropview'],

	function(PhaserComponents, AbstractTarget,

		Assets, DropView){
	
	"use strict";

	var DblLinearTarget = function(){
		AbstractTarget.call(this, parent);
	};
	
	DblLinearTarget.NUM = 			10;
	DblLinearTarget.TOP = 			24;
	DblLinearTarget.LEFTX = 		68;
	DblLinearTarget.RIGHTX = 		45;
	DblLinearTarget.BOTTOM = 		293;
	DblLinearTarget.BLOCK_TOP = 	50;
	DblLinearTarget.FIRST_Y = 		53;
	DblLinearTarget.GAP = 			55;
	DblLinearTarget.START_POS = 	{'x':-65, 'y':0};
	DblLinearTarget.STOP_POS = 		{'x':2, 'y':317};

	PhaserComponents.Utils.extends(DblLinearTarget, AbstractTarget);
	
	DblLinearTarget.prototype.init = function(){
		this.middle += 9;
	};

	DblLinearTarget.prototype.decorate = function(){
   		var p0, p1, p2, p3, p4, p5, p6;
   		this.left = this.middle - DblLinearTarget.LEFTX;
		this.right = this.middle + DblLinearTarget.RIGHTX;
   		p0 = {'x':this.middle, 'y':DblLinearTarget.TOP};
   		p1 = {'x':this.left, 'y':p0.y + DblLinearTarget.FIRST_Y};
   		p2 = {'x':this.left, 'y':DblLinearTarget.BOTTOM};
   		p3 = {'x':(this.right + this.left)/2, 'y':p2.y};
   		p4 = {'x':p3.x, 'y':p1.y};
   		p5 = {'x':this.right, 'y':p4.y};
   		p6 = {'x':this.right, 'y':p2.y + 40};
   		this.drawLine(p0, p1);
   		this.drawLine(p1, p2);
   		this.drawLine(p2, p3);
   		this.drawLine(p3, p4);
   		this.drawLine(p4, p5);
   		this.drawLine(p5, p6);
	};

	DblLinearTarget.prototype.addBlocks = function(){
		var i, column, row, numTargets = DblLinearTarget.NUM, bounds, xpos, y0, w;
		xpos = [this.left, this.right];
		w = DropView.SMALL_WIDTH/2;
		y0 = this.bounds.y + DblLinearTarget.BLOCK_TOP;
		for(i = 0; i < numTargets; i++){
			column = Math.round(i/numTargets);
			row = i - column*numTargets/2;
			bounds = {'x':xpos[column] - w, 'y':y0 + DblLinearTarget.GAP*row};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET_SMALL});
		}
	};

	return DblLinearTarget;
});

