define('app/prog/progview',

	['app/prog/abstractprogview', 'phasercomponents'],

	function(AbstractProgView, PhaserComponents){
	
	"use strict";

	var ProgView = function(options){
		AbstractProgView.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgView, AbstractProgView);

	return ProgView;
});

