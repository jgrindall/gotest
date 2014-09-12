define(['app/assets'], function(Assets){
  	
  	describe("Basic stuff", function(){
		it("should work",
			function(){ 
				expect(Assets.LOADER_BAR).toBe("loaderBar"); 
			}
		); 
    });

});