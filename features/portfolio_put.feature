Feature: Create Portfolio
  In order to invest with Finizens
  Customers should be able to
  create new portfolios in our system

  Scenario: New valid portfolio
    Given I send a PUT request to "/api/portfolios/1" with body:
    """
    {
      "allocations": [
        {
          "id": 1,
          "shares": 3
        },
        {
          "id": 2,
          "shares": 4
        }
      ]
    }
    """
    Then the response status code should be 200
    And the response should be empty

  Scenario: Invalid payload
    Given I send a PUT request to "/api/portfolios/1" with body:
    """
    {
      "allocations": [
        {
          "id": 1,
          "shares": 3
        },
        {
          "id": 2
        }
      ]
    }
    """
    Then the response status code should be 400
    And the response should be empty

  Scenario: Invalid Method
    Given I send a PATCH request to "/api/portfolios/1"
    Then the response status code should be 405
    And the response should be empty
