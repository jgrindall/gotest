
define(['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes', 'phasercomponents', 'app/events/events'

],

function(AbstractKeysCommandsPanel,

CommandTypes, PhaserComponents, Events

){
	
	"use strict";
	
	var NSEW45KeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(NSEW45KeysCommandsPanel, AbstractKeysCommandsPanel);

	NSEW45KeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':true}, {'num':1, 'visible':true}, {'num':2, 'visible':true}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':true}, {'num':7, 'visible':true}, {'num':8, 'visible':true}];
	};
	
	NSEW45KeysCommandsPanel.prototype.selectKey = function(data){
		this.addCommands(this.getSelectedCommand(), CommandTypes.MOVE, data.index + 1);
	};
	
	NSEW45KeysCommandsPanel.prototype.setSelectedCommand = function(i) {
		AbstractKeysCommandsPanel.prototype.setSelectedCommand.call(this, i);
		this.eventDispatcher.trigger({"type":Events.ROTATE_TURTLE, "data":{"direction":i}});
	};

	return NSEW45KeysCommandsPanel;
});
	
	
