
define(['app/consts/commandpaneltypes',

'app/views/commandpanels/nsewcommandspanel',

'app/views/commandpanels/nsewkeyscommandspanel',

'app/views/commandpanels/nsew45keyscommandspanel',

'app/views/commandpanels/nsturnkeyscommandspanel',

'app/prog/progcommandpanel', 'app/consts/progtypes',

'app/views/commandpanels/markers/markertypes',

'app/prog/targets/targetfactory',

],

function(CommandPanelTypes,

NSEWCommandsPanel,

NSEWKeysCommandsPanel,

NSEW45KeysCommandsPanel,

NSTurnKeysCommandsPanel,

ProgCommandPanel, ProgTypes,

MarkerTypes,

TargetFactory

){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, prog, bounds) {
		var panel, numTargets, targetObj, options;
		if(prog !== ProgTypes.NONE){
			targetObj = TargetFactory.make(prog);
			numTargets = targetObj.constructor.NUM;	
		}
		if(type === CommandPanelTypes.NSEW){
			if(prog === ProgTypes.NONE){
				options = {"bounds":bounds, "markerType":MarkerTypes.ARROW};
				panel = new NSEWCommandsPanel(options);
			}
			else{
				options = {"buttons":[[{"num":1, "turn":false}, {"num":3, "turn":false}, {"num":5, "turn":false}, {"num":7, "turn":false}]], "type":type, "targetObj":targetObj, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, false), "targets":prog, "bounds":bounds};
				panel = new ProgCommandPanel(options);
			}
		}
		else if(type === CommandPanelTypes.NSEW_KEYS){
			if(prog === ProgTypes.NONE){
				options = {"bounds":bounds, "markerType":MarkerTypes.ARROW};
				panel = new NSEWKeysCommandsPanel(options);
			}
			else{
				options = {"buttons":[[{"num":1, "turn":false}, {"num":3, "turn":false}, {"num":5, "turn":false}, {"num":7, "turn":false}], [{"num":0, "turn":false}, {"num":1, "turn":false}, {"num":2, "turn":false}, {"num":3, "turn":false}, {"num":4, "turn":false}, {"num":5, "turn":false}, {"num":6, "turn":false}, {"num":7, "turn":false}]], "type":type, "targetObj":targetObj, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds};
				panel = new ProgCommandPanel(options);
			}
		}
		else if(type === CommandPanelTypes.NSEW_45_KEYS){
			if(prog === ProgTypes.NONE){
				options = {"bounds":bounds, "markerType":MarkerTypes.ARROW};
				panel = new NSEW45KeysCommandsPanel(options);
			}
			else{
				options = {"buttons":[[{"num":0, "turn":false}, {"num":1, "turn":false}, {"num":2, "turn":false}, {"num":3, "turn":false}, {"num":5, "turn":false}, {"num":6, "turn":false}, {"num":7, "turn":false}, {"num":8, "turn":false}], [{"num":0, "turn":false}, {"num":1, "turn":false}, {"num":2, "turn":false}, {"num":3, "turn":false}, {"num":4, "turn":false}, {"num":5, "turn":false}, {"num":6, "turn":false}, {"num":7, "turn":false}]], "type":type, "targetObj":targetObj, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds};
				panel = new ProgCommandPanel(options);
			}
		}
		else if(type === CommandPanelTypes.TURNING_KEYS){
			if(prog === ProgTypes.NONE){
				options = {"bounds":bounds, "markerType":MarkerTypes.TURN};
				panel = new NSTurnKeysCommandsPanel(options);
			}
			else{
				options = {"buttons":[[{"num":1, "turn":false}, {"num":3, "turn":true}, {"num":5, "turn":true}, {"num":7, "turn":false}], [{"num":0, "turn":false}, {"num":1, "turn":false}, {"num":2, "turn":false}, {"num":3, "turn":false}, {"num":4, "turn":false}, {"num":5, "turn":false}, {"num":6, "turn":false}, {"num":7, "turn":false}]], "type":type, "targetObj":targetObj, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds};
				panel = new ProgCommandPanel(options);
			}
		}
		return panel;
	};
	
	CommandsPanelFactory.makeHitzones = function(num, double){
		var i, hitzones = [], h;
		for(i = 1; i <= num; i++){
			h = [];
			if(double){
				h.push({"accept":[0], "bounds":{'x':-20, 'y':0}});
				h.push({"accept":[1], "bounds":{'x':20, 'y':0}});
			}
			else{
				h.push({"accept":[0], "bounds":{'x':0, 'y':0}});
			}
			hitzones.push(h);
		}
		return hitzones;
	};

	return CommandsPanelFactory;

});
