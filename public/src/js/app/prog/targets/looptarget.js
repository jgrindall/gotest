define( ['phaser', 

	'app/prog/views/dropview', 'app/consts/proglayout', 'phasercomponents',

	'app/assets', 'app/prog/targets/abstracttarget',

	'app/views/components/prognumbutton', 'app/models/modelfacade'],

	function(Phaser, 
		
		DropView, ProgLayout, PhaserComponents,

		Assets, AbstractTarget,

		ProgNumButton, ModelFacade){
	
	"use strict";

	var LoopTarget = function(parent){
		AbstractTarget.call(this, parent);
	};

	PhaserComponents.Utils.extends(LoopTarget, AbstractTarget);

	LoopTarget.prototype.build = function(){
		AbstractTarget.prototype.build.call(this);
		this.addNum();
	};

	LoopTarget.prototype.decorate = function(){
		var p0, p1, p2, p3, p4;
		p0 = {'x':this.middle, 'y':ProgLayout.LOOP.top};
   		p1 = {'x':p0.x, 'y':ProgLayout.LOOP.bottom};
   		p2 = {'x':p0.x, 'y':p0.y + ProgLayout.LOOP.paddingTop};
   		p3 = {'x':p2.x + ProgLayout.LOOP.lineWidth, 'y':p2.y};
   		p4 = {'x':p1.x + ProgLayout.LOOP.lineWidth, 'y':p1.y};
   		this.drawLine(p0, p1);
   		this.drawLine(p2, p3);
   		this.drawLine(p3, p4);
   		this.drawLine(p4, p1);
	};

	LoopTarget.prototype.addNum = function(){
		var bounds = {'x':this.bounds.x + this.bounds.w - ProgNumButton.WIDTH - 20, 'y':this.bounds.y + this.bounds.h/2 - ProgNumButton.HEIGHT - 35, 'w':ProgNumButton.WIDTH, 'h':ProgNumButton.HEIGHT};
		this.numButton = new ProgNumButton({"model":ModelFacade.getInstance().get(ModelFacade.PROG_NUM), "sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PROG_NUM, "numFrames":4});	
		this.group.add(this.numButton.sprite);
	};

	LoopTarget.prototype.addBlocks = function(){
		var i, target, numTargets = ProgLayout.LOOP.num, bounds, y0;
		y0 = this.bounds.y + ProgLayout.LOOP.blockTop; 
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.middle - DropView.WIDTH/2, 'y': y0 + ProgLayout.LOOP.gap*i};
			target = new DropView({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
			this.targets.push(target);
			this.group.add(target.sprite);
		}
	};

	return LoopTarget;
});

