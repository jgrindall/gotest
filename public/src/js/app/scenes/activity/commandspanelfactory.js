
define(['app/game', 'app/scenes/activity/commspeed', 'app/scenes/activity/commandtypes',

'app/scenes/activity/commandpanels/nsewcommandspanel', 'app/scenes/activity/commandpanels/keyscommandspanel'

],

function(Game, CommSpeed, CommandTypes,

NSEWCommandsPanel, KeysCommandsPanel){
	
	"use strict";
	
	var CommandsPanelFactory  = function(){
		
	};
	
	CommandsPanelFactory.make = function(type, bounds) {
		var panel;
		if(type === CommandTypes.NSEW){
			panel = new NSEWCommandsPanel({"bounds":bounds});
		}
		else{
			panel = new KeysCommandsPanel({"bounds":bounds});
		}
		return panel;
	};
	
	return CommandsPanelFactory;

});
	
