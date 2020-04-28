Feature: Create sell orders
  In order to have a well balanced portfolio
  system should be able to
  remove allocations in our system

  Scenario: Sell a valid allocation
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
    When I send a POST request to "/sell" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 1,
      "shares": 2
    }
    """
    Then the response status code should be 200
    And the response should be empty

  Scenario: Sell unknown allocation
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
    When I send a POST request to "/sell" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 101,
      "shares": 2
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: Sell exceeded allocation
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
    When I send a POST request to "/sell" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 1,
      "shares": 5
    }
    """
    Then the response status code should be 500
    And the response should be empty

  Scenario: Sell unknown portfolio
    Given I send a POST request to "/sell" with body:
    """
    {
      "id": 1,
      "portfolio": 101,
      "allocation": 1,
      "shares": 2
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: Invalid Method
    Given I send a PUT request to "/sell" with body:
    Then the response status code should be 405
    And the response should be empty

  Scenario: Sell invalid payload payload
    Given I send a POST request to "/sell" with body:
    """
    {
      "id": 1
    }
    """
    Then the response status code should be 400
    And the response should be empty