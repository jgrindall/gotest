define( ['base/prog/targets/lineartarget', 'base/prog/targets/dbllineartarget',

	'base/prog/targets/looptarget', 'base/prog/targets/longtarget', 'base/consts/progtypes'],

	function(LinearTarget, DblLinearTarget,

		LoopTarget, LongTarget, ProgTypes){
	
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
		else if(type === ProgTypes.LONG){
			return new LongTarget();
		}
	};

	return TargetFactory;
});

