(function () {
     function mockAjax(options) {
        var that = {
          done: function done(callback) {
            if (options.success)
              setTimeout(callback, options.timeout, options.response);
            return that;
          },
          error: function error(callback) {
            if (!options.success)
              setTimeout(callback, options.timeout, options.response);
            return that;
          }
        };
        return that;
      }
  
 
     test("Format product ID", function () {
         var cart = new CartViewModel();
         equal(cart.formatProductId(12), "Product ID: 12", "The string should be equal");
     });
 
     
     test("Remove Item", function () {
         var cart = new CartViewModel();
         cart.refresh = function(){
             ok( true, "The call back was executed" );
         }
 
        $.ajax = function() {
            return mockAjax({
              success: true,
              timeout: 500,
              response: {}
            });
          }

 
         cart.removeItem({id:1});
         
     });
 
     //TODO increase coverage
 
 })();