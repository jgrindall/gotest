
define(['base/views/commandpanels/abstractexecutecommandpanel',

'base/logocommands/commandtypes', 'phasercomponents'

],

function(AbstractExecuteCommandsPanel, 

CommandTypes, PhaserComponents

){
	
	"use strict";
	
	var NSEWCommandsPanel  = function(options){
		AbstractExecuteCommandsPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(NSEWCommandsPanel, AbstractExecuteCommandsPanel);

	NSEWCommandsPanel.prototype.onKeyUp = function(event, obj) {
		var code;
		code = obj.data.keyCode;
		if(code === 37 || code === 100){
			this.selectComm({"index":3});
		}
		else if(code === 38 || code === 104){
			this.selectComm({"index":1});
		}
		else if(code === 39 || code === 102){
			this.selectComm({"index":5});
		}
		else if(code === 40 || code === 98){
			this.selectComm({"index":7});
		}
	};
	
	NSEWCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSEWCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
		this.addCommand(data.index, CommandTypes.MOVE);
	};
	
	NSEWCommandsPanel.prototype.destroy = function() {
		AbstractExecuteCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	