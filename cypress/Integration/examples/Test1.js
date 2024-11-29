//  Cypress - the test file is called as spec file
describe('My First Test', function () {
    it('My First Test Case', function () {
        cy.visit("https://www.onlinegdb.com/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get("//td[contains(text(),'Share Code:')]/following-sibling::td")



        
        // cy.get('div.products div.product').should('have.length', 4)
        // cy.get('.products').find('.product').should('have.length', 4)
        // cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()

        //Dynamic click by iterating through products
        // cy.get('.products').find('.product').each(($el, index, $list) => {
        //     const vegName = $el.find('h4.product-name').text()
        //     if (vegName.includes('Cashews')) {
        //         cy.wrap($el).contains('ADD TO CART').click()
        //     }
        // })
    })
})