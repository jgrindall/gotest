
define(['app/views/commandpanels/abstractexecutecommandpanel',

'app/logocommands/commandtypes', 'phasercomponents'

],

function(AbstractExecuteCommandsPanel, 

CommandTypes, PhaserComponents

){
	
	"use strict";
	
	var NSEWCommandsPanel  = function(options){
		AbstractExecuteCommandsPanel.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.KEY_UP, this.onKeyUp.bind(this));
	};
	
	NSEWCommandsPanel.KEY_MAP = [null, 38, null, 37, null, 39, null, 40, null];

	PhaserComponents.Utils.extends(NSEWCommandsPanel, AbstractExecuteCommandsPanel);

	NSEWCommandsPanel.prototype.onKeyUp = function(event, obj) {
		var i, code, direction;
		code = obj.data.keyCode;
		for(i = 0; i < NSEWCommandsPanel.KEY_MAP.length; i++){
			if(NSEWCommandsPanel.KEY_MAP[i] === code){
				this.selectComm({"index":i});
				break;
			}
		}
	};

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
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.KEY_UP);
		AbstractExecuteCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	