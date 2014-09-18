define( ['phaser', 	'app/prog/views/dropview', 'app/consts/proglayout',

	'app/assets', 'phasercomponents', 'app/prog/abstracttarget'],

	function(Phaser, DropView, ProgLayout,

		Assets, PhaserComponents, AbstractTarget){
	
	"use strict";

	var LinearTarget = function(parent){
		AbstractTarget.call(this, parent);
	};

	PhaserComponents.Utils.extends(LinearTarget, AbstractTarget);

	LinearTarget.prototype.decorate = function(){
		var gfx, middle, lineWidth;
		lineWidth = 8;
		gfx = new Phaser.Graphics(this.game, 0, 0);
		middle = this.bounds.x + this.bounds.w/2;
		this.group.add(gfx);
		gfx.lineStyle(lineWidth, 0xbbbbbb, 1);
   		gfx.moveTo(middle + 2, ProgLayout.LINEAR.top);
   		gfx.lineTo(middle + 2, ProgLayout.LINEAR.bottom);
		gfx.lineStyle(lineWidth, 0xffffff, 1);
   		gfx.moveTo(middle, ProgLayout.LINEAR.top);
   		gfx.lineTo(middle, ProgLayout.LINEAR.bottom);
	};

	LinearTarget.prototype.addBlocks = function(){
		var i, numTargets = ProgLayout.LINEAR.num, bounds;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.bounds.x + (this.bounds.w - DropView.WIDTH)/2, 'y':this.bounds.y + 60 + 55*i};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
		}
	};

	return LinearTarget;
});

