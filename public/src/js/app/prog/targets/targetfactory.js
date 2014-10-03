define( ['app/prog/targets/lineartarget', 'app/prog/targets/dbllineartarget',

	'app/prog/targets/looptarget', 'app/consts/progtypes'],

	function(LinearTarget, DblLinearTarget,

		LoopTarget, ProgTypes){
	
	"use strict";

	var TargetFactory = function(){

	};
	
	TargetFactory.make = function(type){
		if(type === ProgTypes.LINEAR){
			return new LinearTarget();
		}
		else if(type === ProgTypes.DBL_LINEAR){
			return new DblLinearTarget();
		}
		else if(type === ProgTypes.LOOP){
			return new LoopTarget();
		}
	};

	return TargetFactory;
});

