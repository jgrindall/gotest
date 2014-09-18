define( ['phaser', 	'app/prog/views/dropview', 'app/consts/proglayout',

	'app/assets', 'phasercomponents', 'app/prog/targets/abstracttarget'],

	function(Phaser, DropView, ProgLayout,

		Assets, PhaserComponents, AbstractTarget){
	
	"use strict";

	var LinearTarget = function(parent){
		AbstractTarget.call(this, parent);
	};

	PhaserComponents.Utils.extends(LinearTarget, AbstractTarget);

	LinearTarget.prototype.decorate = function(){
		var p0, p1;
		p0 = {'x':this.middle, 'y':ProgLayout.LINEAR.top};
		p1 = {'x':p0.x, 'y':ProgLayout.LINEAR.bottom};
		this.drawLine(p0, p1);
	};

	LinearTarget.prototype.addBlocks = function(){
		var i, numTargets = ProgLayout.LINEAR.num, bounds, y0;
		y0 = this.bounds.y + ProgLayout.LINEAR.blockTop;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.bounds.x + (this.bounds.w - DropView.WIDTH)/2, 'y':y0 + ProgLayout.LINEAR.gap*i};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
		}
	};

	return LinearTarget;
});

