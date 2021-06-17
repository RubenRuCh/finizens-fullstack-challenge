Feature: Create buy orders
  In order to have a well balanced portfolio
  system should be able to
  remove allocations in our system

  Scenario: buy more shares on allocation
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
    When I send a POST request to "/api/orders" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 1,
      "shares": 3,
      "type": "buy"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: buy a new allocation
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
    When I send a POST request to "/api/orders" with body:
    """
    {
      "id": 1,
      "portfolio": 1,
      "allocation": 3,
      "shares": 2,
      "type": "buy"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: Buy unknown portfolio
    Given I send a POST request to "/api/orders" with body:
    """
    {
      "id": 1,
      "portfolio": 101,
      "allocation": 1,
      "shares": 2,
      "type": "buy"
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: Invalid Method
    Given I send a PUT request to "/api/orders"
    Then the response status code should be 405
    And the response should be empty

  Scenario: buy invalid payload payload
    Given I send a POST request to "/api/orders" with body:
    """
    {
      "id": 1
    }
    """
    Then the response status code should be 400
    And the response should be empty
