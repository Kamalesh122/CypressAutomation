
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductListPage from '../../../../support/pageObjects/ProductListPage'
import CartPage from '../../../../support/pageObjects/CartPage'

const { Given, When, Then} = require("@badeball/cypress-cucumber-preprocessor");
const homePage = new HomePage()
const productListPage = new ProductListPage()
const cartPage = new CartPage()

Given('I open Ecommerce page', function () {
    cy.visit(Cypress.env('url') + '/angularpractice/')
    cy.pause()
})

When('I add all the items to cart', function () {
    homePage.shopTab().click()
    this.data.mobileName.forEach(stringMobileName => {
        cy.selectMobile(stringMobileName)
    });
    productListPage.checkoutButton().click()
})

Then('Validate the total prices', function () {
    var totalPrice = 0;
    cartPage.productPrice().each(($el, index) => {
        const strPrice = $el.text()
        var actPrice = strPrice.split(" ")
        actPrice = actPrice[1].trim()
        totalPrice += Number(actPrice);
    }).then(function () {
        cy.log("Expected Total Price: " + totalPrice)
    })
    cartPage.totalPrice().then((priceElement) => {
        var strPrice = priceElement.text().split(" ")
        strPrice = strPrice[1].trim()
        cy.log("Actual Total Price: " + strPrice)
        expect(Number(totalPrice)).to.equal(Number(strPrice))
    })
    cartPage.checkOutBtn().click()
})

Then('Select country submit and verify success message', function () {
    cartPage.countrytextField().type(this.data.country)
    cy.wait(6000)
    cartPage.countyDropdown().each(($el, index) => {
        if ($el.text().includes(this.data.country)) {
            cy.wrap($el).click()
        }
    })
    cartPage.agreeCheckBox().click({ force: true }).should('be.checked')
    cartPage.purchaseBtn().click()
    cartPage.successMsgAlert().should('include.text', this.data.OrderSuccessMsg)
})

When('I Enter all the data to form', function(){
    homePage.nameTextField().type(this.data.name)
    homePage.dataBindingTextField().should('have.value', this.data.name)
    homePage.emailTextField().type(this.data.email)
    homePage.passwordTextField().type(this.data.password)
    homePage.genderDropdown().select(this.data.gender)
    homePage.studentRadioButton().click().should('be.checked')
})
Then('Validating the two way binding updated with name',function(){
    homePage.formSubmitBtn().click()
})
Then('Submit form and validate success message', function(){
    homePage.formSuccessAlert().should('include.text', this.data.formSubmitSuccessMsg)
})