
define( ['phasercomponents', 'app/prog/targets/abstracttarget', 'app/consts/proglayout', 'app/assets', 'app/prog/views/dropview'],

	function(PhaserComponents, AbstractTarget, ProgLayout, Assets, DropView){
	
	"use strict";

	var DblLinearTarget = function(parent){
		AbstractTarget.call(this, parent);
		this.left = this.middle - ProgLayout.DBL_LINEAR.leftX;
		this.right = this.middle + ProgLayout.DBL_LINEAR.rightX;
	};

	PhaserComponents.Utils.extends(DblLinearTarget, AbstractTarget);

	DblLinearTarget.prototype.decorate = function(){
   		var p0, p1, p2, p3, p4, p5;
   		p0 = {'x':this.middle, 'y':ProgLayout.DBL_LINEAR.top};
   		p1 = {'x':this.left, 'y':p0.y + ProgLayout.DBL_LINEAR.firstY};
   		p2 = {'x':this.left, 'y':ProgLayout.DBL_LINEAR.bottom};
   		p3 = {'x':(this.right + this.left)/2, 'y':p2.y};
   		p4 = {'x':p3.x, 'y':p1.y};
   		p5 = {'x':this.right, 'y':p4.y};
   		this.drawLine(p0, p1);
   		this.drawLine(p1, p2);
   		this.drawLine(p2, p3);
   		this.drawLine(p3, p4);
   		this.drawLine(p4, p5);
	};

	DblLinearTarget.prototype.addBlocks = function(){
		var i, column, row, numTargets = ProgLayout.DBL_LINEAR.num, bounds, xpos, y0, w;
		xpos = [this.left, this.right];
		w = DropView.SMALL_WIDTH/2;
		w = 50;
		y0 = this.bounds.y + ProgLayout.DBL_LINEAR.blockTop;
		for(i = 0; i < numTargets; i++){
			column = Math.round(i/numTargets);
			row = i - column*numTargets/2;
			bounds = {'x':xpos[column] - w, 'y':y0 + ProgLayout.DBL_LINEAR.gap*row};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET_SMALL});
		}
	};

	return DblLinearTarget;
});

