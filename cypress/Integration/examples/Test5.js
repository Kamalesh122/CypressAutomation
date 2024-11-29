describe('Handling Child Windows', () => {
    it('Should handle child window', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#opentab").invoke('removeAttr', 'target').click();
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get(".mt-50 h2").should('contain', 'QAClick Academy');
        })
    });

    it('Assignment for window handling', () => {
        cy.visit("https://www.amazon.in/s?k=shoes&crid=2FCI0APUM7NFO&sprefix=shoe%2Caps%2C204&ref=nb_sb_noss_1")
        cy.get("a[class ='a-link-normal s-no-outline']").invoke('removeAttr', 'target').first().click()
        cy.get('#add-to-cart-button').click()
        cy.get('.a-padding-medium').should('contain', 'Added to Cart')
    });

    it('Handling Table', function () {
        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('tr td:nth-child(2)').each(($e1, index) => {
            const text = $e1.text()
            if (text.includes("Python")) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('26')
                })
            }
        })
    })
  
});