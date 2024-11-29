//  Cypress - the test file is called as spec file
import HomePage_in from "../../support/pageObjects/HomePage_in"
import LoginPage_in from "../../support/pageObjects/LoginPage_in"
import OrgPage from "../../support/pageObjects/OrgPage";
describe('Validate Fetching Linkedin Profiles', function () {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('getInstalledRelatedApps() is only supported in top-level browsing contexts')) {
                return false;
            }
        });
    });
    const homepage = new HomePage_in()
    const loginPage = new LoginPage_in()
    const orgPage = new OrgPage()

    it.only('Validate Fetching Profile Link Using Location and OpenToWork', function () {
        cy.fixture('example').then(function (data) {

            cy.visit("https://www.linkedin.com/feed/")
            loginPage.nameField().type(data.in_gmail)
            loginPage.password().type(data.in_password)
            loginPage.signInBtn().click()
            homepage.searchBar().click({ force: true }).type(data.searchText)
            cy.wait(2000)
            homepage.searchBarResult().contains(data.searchText).click()
            homepage.linkCompanyName().should('be.visible').click()
            cy.wait(2000)
            orgPage.peopleTab().click()
            orgPage.filterTab().type(data.filterText)
            orgPage.peopleProfileCard().should('be.visible')
            orgPage.getAllProfileLinkAndStoreINExcel()
        })
    })


    it('Validate Feching Profile Link Using skills and openToWork', function () {
        cy.fixture('example').then(function (data) {
            cy.visit("https://www.linkedin.com/feed/")
            loginPage.nameField().type(data.in_gmail)
            loginPage.password().type(data.in_password)
            loginPage.signInBtn().click()
            homepage.searchBar().click({ force: true }).type(data.searchText)
            homepage.searchBarResult().contains(data.searchText).click()
            homepage.linkCompanyName().should('be.visible').click()
            orgPage.peopleTab().click()
            orgPage.filterTab().type(data.filterText2)
            orgPage.peopleProfileCard().should('be.visible')
            orgPage.getAllProfileLinkAndStoreInExcel()
        })
    })
})