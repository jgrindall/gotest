define( ['phasercomponents', 'app/consts/progtypes', 'app/prog/dropview'],

	function(PhaserComponents, ProgTypes, DropView){
	
	"use strict";

	var TargetBuilder = function(type){
		console.log("type is "+type);
		this.type = type;
	};

	TargetBuilder.prototype.buildLinear = function(parent){
		console.log("buildLinear");
		var i, target, numTargets = 6, bounds;
		for(i = 0; i < numTargets; i++){
			bounds = {'x':parent.bounds.x + (parent.bounds.w - DropView.WIDTH)/2, 'y':parent.bounds.y + 60 + 55*i};
			target = new DropView({'index':i, 'bounds':bounds});
			parent.targets.push(target);
			parent.group.add(target.sprite);
		}
	};

	TargetBuilder.prototype.build = function(parent){
		console.log("build "+parent+" "+this.type+" "+ProgTypes.LINEAR);
		if(this.type === ProgTypes.LINEAR){
			this.buildLinear(parent);
		}
	};

	return TargetBuilder;
});

