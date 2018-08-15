var ListViewModel = function() {
 
    this.todo = function() {
        alert("TODO");
    };
    
    this.addTocart = function() {
        alert("TODO");
    };

    var self = this;
    this.products = ko.observableArray();
 
    this.refresh = function() {
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