
define('app/views/commandpanels/nsturnkeyscommandspanel',['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes'

],

function(AbstractKeysCommandsPanel,

CommandTypes){
	
	"use strict";
	
	var NSTurnKeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	NSTurnKeysCommandsPanel.prototype = Object.create(AbstractKeysCommandsPanel.prototype);
	NSTurnKeysCommandsPanel.prototype.constructor = NSTurnKeysCommandsPanel;
	
	NSTurnKeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true, 'turn':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true, 'turn':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSTurnKeysCommandsPanel.prototype.selectKey = function(data){
		var type;
		if(this.selectedCommand === 1 || this.selectedCommand === 7){
			type = CommandTypes.FD;
		}
		else{
			type = CommandTypes.TURN;
		}
		this.addCommands(this.selectedCommand, type, data.index + 1);
	};
	
	return NSTurnKeysCommandsPanel;
});
	
	
