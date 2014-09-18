define( ['app/prog/linearplaycontroller',

	'app/prog/dbllinearplaycontroller', 'app/prog/loopplaycontroller', 'app/consts/progtypes'],

	function(LinearPlayController,

		DblLinearPlayController, LoopPlayController, ProgTypes){
	
	"use strict";

	var PlayControllerFactory = function(){

	};
	
	PlayControllerFactory.make = function(type, parent){
		if(type === ProgTypes.LINEAR){
			return new LinearPlayController(parent);
		}
		else if(type === ProgTypes.DBL_LINEAR){
			return new DblLinearPlayController(parent);
		}
		else if(type === ProgTypes.LOOP){
			return new LoopPlayController(parent);
		}
	};

	return PlayControllerFactory;
});
