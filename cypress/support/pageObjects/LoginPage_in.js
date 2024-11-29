class LoginPage_in{

 
    nameField(){
        return cy.get('#username')
    }
    password(){
        return cy.get('#password')
    }
    signInBtn(){
        return cy.get('.login__form_action_container ')
    }
}
export default LoginPage_in