Feature: Complete an active order
  In trade allocations
  system should be able
  to complete orders created

  Scenario: Complete a buy order
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
    And the response status code should be 200
    And the response should be empty
    And I send a POST request to "/api/orders" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 1,
      "shares": 3,
      "type": "buy"
    }
    """
    And the response status code should be 200
    And the response should be empty
    When I send a PATCH request to "/api/orders/1" with body:
    """
    {
      "status": "completed"
    }
    """
    And the response status code should be 200
    And the response should be empty

  Scenario: A unknown order
    Given I send a PATCH request to "/api/orders/401" with body:
    """
    {
      "status": "completed"
    }
    """
    And the response status code should be 404
    And the response should be empty

  Scenario: Invalid Method
    Given I send a DELETE request to "/api/orders/1"
    Then the response status code should be 405
    And the response should be empty

  Scenario: buy invalid payload
    Given I send a PATCH request to "/api/orders/1"
    Then the response status code should be 400
    And the response should be empty
