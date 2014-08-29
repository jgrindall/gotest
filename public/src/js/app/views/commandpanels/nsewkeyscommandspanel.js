
define(['app/activity//commandpanels/abstractkeyscommandspanel',

'app/activity//commands/commandtypes'

],

function(AbstractKeysCommandsPanel,

CommandTypes){
	
	"use strict";
	
	var NSEWKeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	NSEWKeysCommandsPanel.prototype = Object.create(AbstractKeysCommandsPanel.prototype);
	NSEWKeysCommandsPanel.prototype.constructor = NSEWKeysCommandsPanel;

	NSEWKeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSEWKeysCommandsPanel.prototype.selectKey = function(data){
		this.addCommands(this.selectedCommand, CommandTypes.MOVE, data.index + 1);
	};
	
	return NSEWKeysCommandsPanel;
});
	
	
