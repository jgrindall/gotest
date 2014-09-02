define('phasercomponents/convert',[], function () {
    

    function convert(text) {
        return text+" CONVERTED";
    }

    return convert;
});

define('phasercomponents',['phasercomponents/convert', 'phaser'], function (convert, Phaser) {
    

    Test = function(){
    	alert("Test constructor");
    };

    Test.prototype.init = function(){
    	var s = new Phaser.Signal();
        alert("This is an alert from a Test " + s);
    };



    return {
        convert: convert,
        Test:Test
    };
});

