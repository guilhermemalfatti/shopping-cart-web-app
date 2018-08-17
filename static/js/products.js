var ListViewModel = function() {
    this.todo = function() {
        alert("TODO");
    };
    
    this.addTocart = function(item) {
        $.ajax({
            url: "addItem",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                id: item.id
            })
        }).done((resp)=>{
            if(resp.error)
                alert('Product not added')
            else{
                alert('Product added')
            }
        })
    }

    var self = this;
    this.products = ko.observableArray();
    this.notFoundProducts = ko.observable();
 
    this.refresh = function() {
        //TODO show loading when not visible
        return $.getJSON("/products", function(resp) {        
            if(resp.length > 0)
                self.products(resp);
            else{
                self.products([])
                self.notFoundProducts(true);
            }
        });
    }
 
    this.refresh();
};

function formatCurrency(value) {
    return "R$ " + value.toFixed(2);
}
 
$(function() {    
    var viewModel = new ListViewModel();
 
    ko.applyBindings(viewModel);
});