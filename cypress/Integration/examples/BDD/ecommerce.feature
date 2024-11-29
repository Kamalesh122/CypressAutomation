Feature: End to End Ecommerce Validation

    Checout and purchasing all the item

    Scenario: Ecommerce product purchase
    Given I open Ecommerce page
    When I add all the items to cart
    And Validate the total prices
    Then Select country submit and verify success message

    Scenario: Fill and Validate the Form
    Given I open Ecommerce page
    When I Enter all the data to form 
    Then Validating the two way binding updated with name 
    And Submit form and validate success message

   