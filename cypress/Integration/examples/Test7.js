/// <reference types="cypress" />
import HomePage from '../pageObjects/HomePage'
import ProductListPage from '../pageObjects/ProductListPage'
import CartPage from '../pageObjects/CartPage'

describe('Framework Implementation', function () { 

    before(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    it('Entering Form Data', function () {
        const homePage = new HomePage()
        const productListPage = new ProductListPage()
        const cartPage = new CartPage()
        
        cy.visit(Cypress.env('url')+'/angularpractice/')
        homePage.nameTextField().type(this.data.name)
        homePage.dataBindingTextField().should('have.value', this.data.name)
        homePage.emailTextField().type(this.data.email)
        homePage.passwordTextField().type(this.data.password)
        homePage.genderDropdown().select(this.data.gender)
        homePage.studentRadioButton().click().should('be.checked')
        homePage.formSubmitBtn().click()
        //cy.pause() To Pause test
        homePage.formSuccessAlert().should('include.text', this.data.formSubmitSuccessMsg)
        homePage.shopTab().click()
        this.data.mobileName.forEach(stringMobileName => {
            cy.selectMobile(stringMobileName)
        });
        productListPage.checkoutButton().click()
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
})