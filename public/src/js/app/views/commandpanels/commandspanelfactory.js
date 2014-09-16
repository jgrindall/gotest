
define('app/views/commandpanels/commandspanelfactory',['app/consts/commandpaneltypes',

'app/views/commandpanels/nsewcommandspanel',

'app/views/commandpanels/nsewkeyscommandspanel',

'app/views/commandpanels/nsew45keyscommandspanel',

'app/views/commandpanels/nsturnkeyscommandspanel',

'app/prog/progcommandspanel', 'app/consts/progtypes',

'app/views/commandpanels/markers/markertypes'

],

function(CommandTypes,

NSEWCommandsPanel,

NSEWKeysCommandsPanel,

NSEW45KeysCommandsPanel,

NSTurnKeysCommandsPanel,

ProgCommandsPanel, ProgTypes,

MarkerTypes

){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, prog, bounds) {
		var panel;
		if(type === CommandTypes.NSEW){
			if(prog === ProgTypes.NONE){
				panel = new NSEWCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else if(prog === ProgTypes.LINEAR){
				panel = new ProgCommandsPanel({"buttons":[[1, 3, 5, 7]], "hitzones":CommandsPanelFactory.makeHitzones(5, false), "targets":prog, "bounds":bounds});
			}
		}
		else if(type === CommandTypes.NSEW_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSEWKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else if(prog === ProgTypes.LINEAR){
				panel = new ProgCommandsPanel({"buttons":[[1, 3, 5, 7], [0, 1, 2, 3, 4, 5, 6, 7]], "hitzones":CommandsPanelFactory.makeHitzones(5, true), "targets":"linear", "bounds":bounds});
			}
		}
		else if(type === CommandTypes.NSEW_45_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSEW45KeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else if(prog === ProgTypes.LINEAR){
				panel = new ProgCommandsPanel({"buttons":[[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]], "hitzones":CommandsPanelFactory.makeHitzones(5, true), "targets":"linear", "bounds":bounds});
			}
		}
		else if(type === CommandTypes.TURNING_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSTurnKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.TURN});
			}
			else if(prog === ProgTypes.LINEAR){
				panel = new ProgCommandsPanel({"buttons":[[1, 3, 5, 7], [0, 1, 2, 3, 4, 5, 6, 7]], "hitzones":CommandsPanelFactory.makeHitzones(5, true), "targets":"linear", "bounds":bounds});
			}
		}
		return panel;
	};
	
	CommandsPanelFactory.makeHitzones = function(num, double){
		var i, hitzones = [], h;
		for(i = 1; i <= num; i++){
			h = [];
			if(double){
				h.push({"accept":[0], "bounds":{'x':-30, 'y':0}});
				h.push({"accept":[1], "bounds":{'x':30, 'y':0}});
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
