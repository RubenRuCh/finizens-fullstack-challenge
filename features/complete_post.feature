Feature: Complete an active order
  In trade allocations
  system should be able
  to complete orders created

  Scenario: Complete a buy order
    Given I send a PUT request to "/portfolio" with body:
    """
    {
      "id": 1,
      "allocations": [
        {
          "id": 1,
          "shares" 3
        },
        {
          "id": 2,
          "shares" 4
        }
      ]
    }
    """
    And the response status code should be 200
    And the response should be empty
    And I send a POST request to "/buy" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 1,
      "shares": 3
    }
    """
    And the response status code should be 200
    And the response should be empty
    When I send a POST request to "/complete" with body:
    """
    {
      "id": 1
    }
    """
    And the response status code should be 200
    And the response should be empty

  Scenario: A unknown order
    Given I send a POST request to "/complete" with body:
    """
    {
      "id": 401
    }
    """
    And the response status code should be 404
    And the response should be empty

  Scenario: Invalid Method
    Given I send a PUT request to "/complete" with body:
    Then the response status code should be 405
    And the response should be empty

  Scenario: buy invalid payload payload
    Given I send a POST request to "/complete" with body:
    """
    {
      "id": 1,
    }
    """
    Then the response status code should be 400
    And the response should be empty