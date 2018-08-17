var CartViewModel = function() {
    var self = this;
    this.cartAmount = ko.observable(0)
    this.products = ko.observableArray()
    this.notFoundProducts = ko.observable()

    this.formatCommerceId = function(id){
        return "Commerce ID: " + id
    }

    this.formatProductId = function(id){
        return "Product ID: " + id
    }

    this.formatCurrency = function(value){
        return "R$ " + value
    }
    
    this.formatTotalCurrency = function(value){
        return "Total R$ " + value
    }

    this.removeItem = function(item){
        $.ajax({
            url: "/removeItem",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                id: item.id
            })
        }).done((resp)=>{
            if(resp.error)
                alert('Product not removed')
            else{
                //self.refresh();
            }            
        })
    }

    this.todo = function() {
        alert("TODO");
    };
 
    this.refresh = function() {
        return $.getJSON("/shoppingCartItens", function(resp) {
            if(resp.items != null && resp.items.length > 0){
                self.cartAmount(resp.amount)
                self.products(resp.items)
            }else{
                self.products([])                
                self.notFoundProducts(true)
            }
        });
    }
 
    this.refresh();
};

function formatCurrency(value) {
    return "R$ " + value.toFixed(2);
}
 
$(function() {    
    var viewModel = new CartViewModel();
 
    ko.applyBindings(viewModel);
});