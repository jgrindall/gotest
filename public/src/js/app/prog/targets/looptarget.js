define( ['app/prog/views/dropview', 'phasercomponents',

	'app/assets', 'app/prog/targets/abstracttarget',

	'app/views/components/prognumbutton', 'app/models/modelfacade'],

	function(DropView, PhaserComponents,

		Assets, AbstractTarget,

		ProgNumButton, ModelFacade){
	
	"use strict";

	var LoopTarget = function(parent){
		AbstractTarget.call(this, parent);
	};

	PhaserComponents.Utils.extends(LoopTarget, AbstractTarget);

	LoopTarget.NUM = 				5;
	LoopTarget.TOP = 				28;
	LoopTarget.BOTTOM = 			294;
	LoopTarget.PADDING_BOTTOM = 	50;
	LoopTarget.PADDING_TOP = 		50;
	LoopTarget.LINE_WIDTH = 		115;
	LoopTarget.BLOCK_TOP = 			54;
	LoopTarget.GAP = 				54;
	LoopTarget.STOP_POS = 			{'x':105, 'y':320};

	LoopTarget.prototype.build = function(){
		AbstractTarget.prototype.build.call(this);
		this.addNum();
	};

	LoopTarget.prototype.decorate = function(){
		var p0, p1, p2, p3, p4, p5;
		p0 = {'x':this.middle, 'y':LoopTarget.TOP};
   		p1 = {'x':p0.x, 'y':LoopTarget.BOTTOM};
   		p2 = {'x':p1.x + LoopTarget.LINE_WIDTH, 'y':p1.y};
   		p3 = {'x':p2.x, 'y':p0.y + LoopTarget.PADDING_TOP};
   		p4 = {'x':p0.x, 'y':p0.y + LoopTarget.PADDING_TOP};
   		p5 = {'x':p1.x, 'y':p1.y + LoopTarget.PADDING_BOTTOM};
   		this.drawLine(p0, p1);
   		this.drawLine(p1, p2);
   		this.drawLine(p2, p3);
   		this.drawLine(p3, p4);
   		this.drawLine(p1, p5);
	};

	LoopTarget.prototype.addNum = function(){
		var bounds = {'x':this.bounds.x + this.bounds.w - ProgNumButton.WIDTH - 20, 'y':this.bounds.y + this.bounds.h/2 - ProgNumButton.HEIGHT - 35, 'w':ProgNumButton.WIDTH, 'h':ProgNumButton.HEIGHT};
		this.numButton = new ProgNumButton({"model":ModelFacade.getInstance().get(ModelFacade.PROG_NUM), "sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PROG_NUM, "numFrames":4});	
		this.group.add(this.numButton.view);
	};

	LoopTarget.prototype.addBlocks = function(){
		var i, target, numTargets = LoopTarget.NUM, bounds, y0;
		y0 = this.bounds.y + LoopTarget.BLOCK_TOP; 
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.middle - DropView.WIDTH/2, 'y': y0 + LoopTarget.GAP*i};
			target = new DropView({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
			this.targets.push(target);
			this.group.add(target.view);
		}
	};

	return LoopTarget;
});

