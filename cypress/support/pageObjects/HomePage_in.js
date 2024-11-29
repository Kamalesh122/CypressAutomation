class HomePage_in{

    searchBar(){
        return cy.get("#global-nav-search")
    }
    searchBarResult(){
        return cy.get('#triggered-expanded-ember12')
    }
    linkCompanyName(){
        return cy.get('div[class="t-roman t-sans"] div[class="search-nec__hero-kcard-v2-title"]')
    }
}
export default HomePage_in