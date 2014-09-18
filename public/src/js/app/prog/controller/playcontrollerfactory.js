define( ['app/prog/controller/linearplaycontroller',

	'app/prog/controller/dbllinearplaycontroller', 'app/prog/controller/loopplaycontroller', 'app/consts/progtypes'],

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
