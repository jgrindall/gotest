define(['../../src/js/app/assets', '../../src/js/app/models/diagmodel'], function(Assets, DiagModel){
  	
  	describe("Basic stuff", function(){
		it("should work",
			function(){ 
				expect(Assets.LOADER_BAR).toBe("loaderBar"); 
			}
		); 
    });

    describe("More stuff", function(){
		it("should work",
			function(){
				var model = new DiagModel();
				expect(model.get()).toBe(null); 
			}
		); 
    });

});