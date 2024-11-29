class HomePage {

    nameTextField() {
        return cy.get('input[name = "name"]:nth-child(2)')
    } 
    dataBindingTextField() {
        return cy.get('input[name = "name"]:nth-child(1)')
    } 
    emailTextField() {
        return cy.get('input[name = "email"]')
    }
    passwordTextField(){
        return cy.get('#exampleInputPassword1')
    }
    genderDropdown(){
        return cy.get('select')
    }
    studentRadioButton(){
        return  cy.get('#inlineRadio1')
    }
    shopTab(){
        return cy.get(':nth-child(2) > .nav-link')
    }
    formSuccessAlert(){
        return cy.get('div[class ="alert alert-success alert-dismissible"]')
    }
    formSubmitBtn(){
        return cy.get('input[class ="btn btn-success"]')
    }

}
export default HomePage