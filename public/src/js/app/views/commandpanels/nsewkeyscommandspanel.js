
define(['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes', 'phasercomponents',

'app/events/events', 'app/views/commandpanels/abstractexecutecommandpanel'

],

function(AbstractKeysCommandsPanel,

CommandTypes, PhaserComponents,

Events, AbstractExecuteCommandsPanel){
	
	"use strict";
	
	var NSEWKeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(NSEWKeysCommandsPanel, AbstractKeysCommandsPanel);

	NSEWKeysCommandsPanel.prototype.onKeyUp = function(event, obj) {
		var i, code;
		code = obj.data.keyCode;
		if(this.commSelected()){
			if(code === 37){
				this.selectComm({"index":3});
			}
			else if(code === 38){
				this.selectComm({"index":1});
			}
			else if(code === 39){
				this.selectComm({"index":5});
			}
			else if(code === 40){
				this.selectComm({"index":7});
			}
			else if(code <= 57 && code >= 49){
				this.selectKey({"index":code - 49});
			}
			else if(code === 97 || code === 99  || code === 101  || code === 103  || code === 105){
				this.selectKey({"index":code - 97});
				this.onCommReset();
			}
			else if(code === 98 || code === 100  || code === 102  || code === 104){
				if(this.recentComm()){
					this.selectKey({"index":code - 97});
					this.onCommReset();
				}
				else{
					i = (code - 98)/2;
					this.selectComm({"index":[7, 3, 5, 1][i]});	
				}
			}
		}
		else{
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
		}
	};

	NSEWKeysCommandsPanel.prototype.recentKey = function() {
		var d = new Date().getTime();
		return (d - this.keyTime < AbstractExecuteCommandsPanel.KEY_TIME);
	};

	NSEWKeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSEWKeysCommandsPanel.prototype.selectKey = function(data){
		AbstractKeysCommandsPanel.prototype.selectKey.call(this, data);
		this.addCommands(this.getSelectedCommand(), CommandTypes.MOVE, data.index + 1);
	};
	
	NSEWKeysCommandsPanel.prototype.setSelectedCommand = function(i) {
		AbstractKeysCommandsPanel.prototype.setSelectedCommand.call(this, i);
		this.eventDispatcher.trigger({"type":Events.ROTATE_TURTLE, "data":{"direction":i}});
	};
		
	return NSEWKeysCommandsPanel;
});
