define( ['phaser', 

	'app/prog/views/dropview', 'app/consts/proglayout', 'phasercomponents',

	'app/assets', 'app/prog/abstracttarget',

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
		var gfx, middle, lineWidth;
		lineWidth = 8;
		gfx = new Phaser.Graphics(this.game, 0, 0);
		middle = this.bounds.x + this.bounds.w/2;
		this.group.add(gfx);
		gfx.lineStyle(lineWidth, 0xbbbbbb, 1);
   		gfx.moveTo(middle + 2, ProgLayout.LOOP.top);
   		gfx.lineTo(middle + 2, ProgLayout.LOOP.bottom);
   		gfx.moveTo(middle + 2 , ProgLayout.LOOP.top + ProgLayout.LOOP.paddingTop);
   		gfx.lineTo(middle + 2 + ProgLayout.LOOP.lineWidth, ProgLayout.LOOP.top + ProgLayout.LOOP.paddingTop);
   		gfx.lineTo(middle + 2 + ProgLayout.LOOP.lineWidth, ProgLayout.LOOP.bottom - ProgLayout.LOOP.paddingBottom);
   		gfx.lineTo(middle + 2, ProgLayout.LOOP.bottom - ProgLayout.LOOP.paddingBottom);
		gfx.lineStyle(lineWidth, 0xffffff, 1);
   		gfx.moveTo(middle, ProgLayout.LOOP.top);
   		gfx.lineTo(middle, ProgLayout.LOOP.bottom);
   		gfx.moveTo(middle , ProgLayout.LOOP.top + ProgLayout.LOOP.paddingTop);
   		gfx.lineTo(middle + ProgLayout.LOOP.lineWidth, ProgLayout.LOOP.top + ProgLayout.LOOP.paddingTop);
   		gfx.lineTo(middle + ProgLayout.LOOP.lineWidth, ProgLayout.LOOP.bottom - ProgLayout.LOOP.paddingBottom);
   		gfx.lineTo(middle, ProgLayout.LOOP.bottom - ProgLayout.LOOP.paddingBottom);
	};

	LoopTarget.prototype.addNum = function(){
		var bounds = {'x':this.bounds.x + this.bounds.w - ProgNumButton.WIDTH - 20, 'y':this.bounds.y + this.bounds.h/2 - ProgNumButton.HEIGHT - 35, 'w':ProgNumButton.WIDTH, 'h':ProgNumButton.HEIGHT};
		this.numButton = new ProgNumButton({"model":ModelFacade.getInstance().get(ModelFacade.PROG_NUM), "sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PROG_NUM, "numFrames":4});	
		this.group.add(this.numButton.sprite);
	};

	LoopTarget.prototype.addBlocks = function(){
		var i, target, numTargets = ProgLayout.LOOP.num, bounds;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':this.bounds.x + (this.bounds.w - DropView.WIDTH)/2, 'y':this.bounds.y + 60 + 55*i};
			target = new DropView({'index':i, 'bounds':bounds, 'asset':Assets.DRAG_TARGET});
			this.targets.push(target);
			this.group.add(target.sprite);
		}
	};

	return LoopTarget;
});

