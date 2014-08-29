
define(['app/game', 'app/consts/commandpaneltypes',

'app/activity//commandpanels/nsewcommandspanel',

'app/activity//commandpanels/nsewkeyscommandspanel',

'app/activity//commandpanels/nsew45keyscommandspanel',

'app/activity//commandpanels/nsturnkeyscommandspanel',

'app/activity//commandpanels/markertypes'

],

function(Game, CommandTypes,

NSEWCommandsPanel,

NSEWKeysCommandsPanel,

NSEW45KeysCommandsPanel,

NSTurnKeysCommandsPanel,

MarkerTypes

){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, bounds) {
		var panel;
		if(type === CommandTypes.NSEW){
			panel = new NSEWCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
		}
		else if(type === CommandTypes.NSEW_KEYS){
			panel = new NSEWKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
		}
		else if(type === CommandTypes.NSEW_45_KEYS){
			panel = new NSEW45KeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.ARROW});
		}
		else if(type === CommandTypes.TURNING_KEYS){
			panel = new NSTurnKeysCommandsPanel({"bounds":bounds, "markerType":MarkerTypes.TURN});
		}
		return panel;
	};
	
	return CommandsPanelFactory;

});
