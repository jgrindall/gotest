
define(['app/game', 'app/consts/commandpaneltypes',

'app/scenes/activity/commandpanels/nsewcommandspanel',

'app/scenes/activity/commandpanels/nsewkeyscommandspanel',

'app/scenes/activity/commandpanels/nsew45keyscommandspanel',

'app/scenes/activity/commandpanels/turningkeyscommandspanel'

],

function(Game, CommandTypes,

NSEWCommandsPanel,

NSEWKeysCommandsPanel,

NSEW45KeysCommandsPanel,

TurningKeysCommandsPanel

){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, bounds) {
		var panel;
		if(type === CommandTypes.NSEW){
			panel = new NSEWCommandsPanel({"bounds":bounds});
		}
		else if(type === CommandTypes.NSEW_KEYS){
			panel = new NSEWKeysCommandsPanel({"bounds":bounds});
		}
		else if(type === CommandTypes.NSEW_45_KEYS){
			panel = new NSEW45KeysCommandsPanel({"bounds":bounds});
		}
		else if(type === CommandTypes.TURNING_KEYS){
			panel = new TurningKeysCommandsPanel({"bounds":bounds});
		}
		return panel;
	};
	
	return CommandsPanelFactory;

});
