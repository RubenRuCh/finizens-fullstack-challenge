Feature: Get portfolio
  In order to show a portfolio
  Customers should be able to
  get the current status of his portfolio

  Scenario: Get a valid portfolio
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
    When I send a GET request to "/portfolio/1"
    Then the response status code should be 200
    And the response body should be:
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
  Scenario: Invalid Method
    Given I send a PATCH request to "/portfolio/1" with body:
    Then the response status code should be 405
    And the response should be empty
