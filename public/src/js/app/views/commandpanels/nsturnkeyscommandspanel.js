
define(['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes', 'phasercomponents'

],

function(AbstractKeysCommandsPanel,

CommandTypes, PhaserComponents){
	
	"use strict";
	
	var NSTurnKeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(NSTurnKeysCommandsPanel, AbstractKeysCommandsPanel);

	NSTurnKeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true, 'turn':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true, 'turn':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSTurnKeysCommandsPanel.prototype.selectKey = function(data){
		var type, comm;
		comm = this.getSelectedCommand();
		if(comm === 1 || comm === 7){
			type = CommandTypes.FD;
		}
		else{
			type = CommandTypes.TURN;
		}
		this.addCommands(comm, type, data.index + 1);
	};
	
	return NSTurnKeysCommandsPanel;
});
	
	
