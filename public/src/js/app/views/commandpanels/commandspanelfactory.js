
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
				panel = new ProgCommandsPanel({"data":[[8, 8], 5], "bounds":bounds});
			}
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
