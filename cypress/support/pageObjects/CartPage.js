class CartPage {
    listProductName() {
        return cy.get('h4.card-title')
    }
    checkOutBtn() {
        return cy.get('.btn.btn-success')
    }
    countrytextField() {
        return cy.get('#country')
    }
    countyDropdown() {
        return cy.get('div.suggestions')
    }
    agreeCheckBox() {
        return cy.get('input#checkbox2')
    }
    purchaseBtn() {
        return cy.get("input[class='btn btn-success btn-lg']")
    }
    successMsgAlert(){
        return cy.get('div[class ="alert alert-success alert-dismissible"]')
    }
    productPrice(){
        return cy.get('tr>td:nth-child(4)>strong')
    }
    totalPrice(){
        return cy.get('h3>strong')
    }

}
export default CartPage