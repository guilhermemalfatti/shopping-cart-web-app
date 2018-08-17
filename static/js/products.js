var ListViewModel = function() {
    this.isLoading = ko.observable(true)
    this.todo = function() {
        alert("TODO");
    };
    
    this.addTocart = function(item) {
        self.isLoading(true);
        $.ajax({
            url: "addItem",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                id: item.id
            })
        }).done((resp)=>{
            self.isLoading(false);
            if(resp.error)
                alert('Product not added')
        })
    }

    var self = this;
    this.products = ko.observableArray();
    this.notFoundProducts = ko.observable();
 
    this.refresh = function() {
        self.isLoading(true);
        return $.getJSON("/products", function(resp) {    
            self.isLoading(false);    
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