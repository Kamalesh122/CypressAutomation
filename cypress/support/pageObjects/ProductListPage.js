class ProductListPage{

    listProductName() {
        return cy.get('h4.card-title')
    } 
    listAddToCartButton() {
        return cy.get('button[class="btn btn-info"]')
    }
    checkoutButton(){
        return cy.get('a[class="nav-link btn btn-primary"]')
    }
}
export default ProductListPage 