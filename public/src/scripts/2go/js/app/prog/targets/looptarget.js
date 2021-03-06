define( ['base/prog/views/dropview', 'phasercomponents',

	'base/assets', 'base/prog/targets/abstracttarget',

	'base/views/components/prognumbutton', 'base/models/modelconsts'],

	function(DropView, PhaserComponents,

		Assets, AbstractTarget,

		ProgNumButton, ModelConsts){
	
	"use strict";

	var LoopTarget = function(){
		AbstractTarget.call(this);
	};

	PhaserComponents.Utils.extends(LoopTarget, AbstractTarget);

	LoopTarget.NUM = 				5;
	LoopTarget.TOP = 				28;
	LoopTarget.BOTTOM = 			294;
	LoopTarget.PADDING_BOTTOM = 	50;
	LoopTarget.PADDING_TOP = 		50;
	LoopTarget.LINE_WIDTH = 		100;
	LoopTarget.BLOCK_TOP = 			54;
	LoopTarget.GAP = 				54;
	LoopTarget.START_POS = 			{'x':-74, 'y':0};
	LoopTarget.STOP_POS = 			{'x':-74, 'y':320};

	LoopTarget.prototype.build = function(parent){
		AbstractTarget.prototype.build.call(this, parent);
		this.addNum();
	};

	LoopTarget.prototype.init = function(){
		this.middle -= 26;
	};

	LoopTarget.prototype.decorate = function(){
		var p0, p1, p2, p3, p4, p5;
		this.right = this.middle + LoopTarget.LINE_WIDTH;
		p0 = {'x':this.middle, 'y':LoopTarget.TOP};
   		p1 = {'x':p0.x, 'y':LoopTarget.BOTTOM};
   		p2 = {'x':this.right, 'y':p1.y};
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
		var x, y, bounds, model;
		x = this.right;
		y = (LoopTarget.BOTTOM + LoopTarget.TOP + LoopTarget.PADDING_TOP)/2;
		bounds = {'x':x - ProgNumButton.WIDTH/2, 'y':y - ProgNumButton.WIDTH/2, 'w':ProgNumButton.WIDTH, 'h':ProgNumButton.HEIGHT};
		model = this.parent.modelFacade.get(ModelConsts.PROG_NUM);
		this.numButton = new ProgNumButton({"model":model, "sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PROG_NUM, "numFrames":9});	
		this.parent.addLoopButton(this.numButton.view);
	};

	LoopTarget.prototype.addBlocks = function(){
		var i, numTargets = LoopTarget.NUM, bounds, y0;
		y0 = this.bounds.y + LoopTarget.BLOCK_TOP;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.middle - DropView.WIDTH/2, 'y': y0 + LoopTarget.GAP*i};
			this.addTarget({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
		}
	};

	LoopTarget.prototype.destroy = function(){
		if(this.numButton){
			this.parent.removeLoopButton(this.numButton.view);
			this.numButton.destroy();
			this.numButton = null;
		}
		AbstractTarget.prototype.destroy.call(this);
	};

	return LoopTarget;
});

