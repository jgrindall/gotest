define( ['app/prog/lineartarget', 'app/prog/dbllineartarget',

	'app/prog/looptarget', 'app/consts/progtypes'],

	function(LinearTarget, DblLinearTarget,

		LoopTarget, ProgTypes){
	
	"use strict";

	var TargetFactory = function(){

	};
	
	TargetFactory.make = function(type, parent){
		if(type === ProgTypes.LINEAR){
			return new LinearTarget(parent);
		}
		else if(type === ProgTypes.DBL_LINEAR){
			return new DblLinearTarget(parent);
		}
		else if(type === ProgTypes.LOOP){
			return new LoopTarget(parent);
		}
	};

	return TargetFactory;
});

