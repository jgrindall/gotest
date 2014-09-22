
define(['app/consts/commandpaneltypes',

'app/views/commandpanels/nsewcommandspanel',

'app/views/commandpanels/nsewkeyscommandspanel',

'app/views/commandpanels/nsew45keyscommandspanel',

'app/views/commandpanels/nsturnkeyscommandspanel',

'app/prog/progcommandpanel', 'app/consts/progtypes', 'app/consts/proglayout',

'app/views/commandpanels/markers/markertypes'

],

function(CommandPanelTypes,

NSEWCommandsPanel,

NSEWKeysCommandsPanel,

NSEW45KeysCommandsPanel,

NSTurnKeysCommandsPanel,

ProgCommandPanel, ProgTypes, ProgLayout,

MarkerTypes

){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, prog, bounds) {
		var panel, numTargets;
		numTargets = ProgLayout.ALL[prog].num;
		if(type === CommandPanelTypes.NSEW){
			if(prog === ProgTypes.NONE){
				panel = new NSEWCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else{
				panel = new ProgCommandPanel({"buttons":[[{"num":1}, {"num":3}, {"num":5}, {"num":7}]], "type":type, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, false), "targets":prog, "bounds":bounds});
			}
		}
		else if(type === CommandPanelTypes.NSEW_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSEWKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else{
				panel = new ProgCommandPanel({"buttons":[[{"num":1}, {"num":3}, {"num":5}, {"num":7}], [{"num":0}, {"num":1}, {"num":2}, {"num":3}, {"num":4}, {"num":5}, {"num":6}, {"num":7}]], "type":type, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds});
			}
		}
		else if(type === CommandPanelTypes.NSEW_45_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSEW45KeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
			}
			else{
				panel = new ProgCommandPanel({"buttons":[[{"num":0}, {"num":1}, {"num":2}, {"num":3}, {"num":5}, {"num":6}, {"num":7}, {"num":8}], [{"num":0}, {"num":1}, {"num":2}, {"num":3}, {"num":4}, {"num":5}, {"num":6}, {"num":7}]], "type":type, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds});
			}
		}
		else if(type === CommandPanelTypes.TURNING_KEYS){
			if(prog === ProgTypes.NONE){
				panel = new NSTurnKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.TURN});
			}
			else{
				panel = new ProgCommandPanel({"buttons":[[{"num":1}, {"num":3, "turn":true}, {"num":5, "turn":true}, {"num":7}], [{"num":0}, {"num":1}, {"num":2}, {"num":3}, {"num":4}, {"num":5}, {"num":6}, {"num":7}]], "type":type, "hitzones":CommandsPanelFactory.makeHitzones(numTargets, true), "targets":prog, "bounds":bounds});
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
