var ListViewModel = function() {
    this.isVisible = false;
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
 
    this.refresh = function() {
        //TODO show loading when no visible
        return $.getJSON("/products", function(items) {        
            self.products(items);
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