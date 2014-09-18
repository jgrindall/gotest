
define( ['phasercomponents', 'app/prog/abstracttarget', 'app/consts/proglayout', 'app/assets', 'app/prog/dropview'],

	function(PhaserComponents, AbstractTarget, ProgLayout, Assets, DropView){
	
	"use strict";

	var DblLinearTarget = function(parent){
		AbstractTarget.call(this, parent);
	};

	PhaserComponents.Utils.extends(DblLinearTarget, AbstractTarget);

	DblLinearTarget.prototype.decorate = function(){
		var gfx, middle, lineWidth;
		lineWidth = 8;
		gfx = new Phaser.Graphics(this.game, 0, 0);
		middle = this.bounds.x + this.bounds.w/2;
		this.group.add(gfx);
		gfx.lineStyle(lineWidth, 0xbbbbbb, 1);
   		gfx.moveTo(middle + 2, ProgLayout.DBL_LINEAR.top);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX, ProgLayout.DBL_LINEAR.bottom);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.middleX, ProgLayout.DBL_LINEAR.bottom);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.middleX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.rightX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle + 2 - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.rightX, ProgLayout.DBL_LINEAR.bottom);
   		gfx.lineStyle(lineWidth, 0xffffff, 1);
   		gfx.moveTo(middle, ProgLayout.DBL_LINEAR.top);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX, ProgLayout.DBL_LINEAR.bottom);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.middleX, ProgLayout.DBL_LINEAR.bottom);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.middleX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.rightX, ProgLayout.DBL_LINEAR.top + ProgLayout.DBL_LINEAR.firstY);
   		gfx.lineTo(middle - ProgLayout.DBL_LINEAR.leftX + ProgLayout.DBL_LINEAR.rightX, ProgLayout.DBL_LINEAR.bottom);
	};

	DblLinearTarget.prototype.addBlocks = function(){
		var i, column, row, numTargets = ProgLayout.DBL_LINEAR.num, bounds;
		for(i = 0; i < numTargets; i++){
			column = Math.round(i/numTargets);
			row = i - column*numTargets/2;
			bounds = {'x':this.bounds.x + (this.bounds.w - DropView.SMALL_WIDTH)/2 + column*120, 'y':this.bounds.y + 60 + 55*row};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET_SMALL});
		}
	};

	return DblLinearTarget;
});

