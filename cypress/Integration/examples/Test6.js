/// <reference types="cypress" />

/// <reference types="cypress-iframe" />

import 'cypress-iframe'

describe('Frames Test', function () {

    it('Demo example', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.wait(6000)
        cy.iframe().find("div h1.pricing-title.text-white.ls-1").should('have.length',2)
    })

})
