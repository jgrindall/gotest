
define(['app/views/commandpanels/abstractcommandspanel',

'app/logocommands/commandtypes'

],

function(AbstractCommandsPanel,

CommandTypes

){
	
	"use strict";
	
	var NSEWCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	NSEWCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	NSEWCommandsPanel.prototype.constructor = NSEWCommandsPanel;

	NSEWCommandsPanel.prototype.addKeys = function() {
		
	};
	
	NSEWCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSEWCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
		this.addCommand(data.index, CommandTypes.MOVE);
	};
	
	NSEWCommandsPanel.prototype.destroy = function() {
		this.grid.clickSignal.remove(this.selectComm, this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	