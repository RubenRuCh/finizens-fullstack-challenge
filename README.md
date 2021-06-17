# Finizens' FullStack Challenge

## Instructions

  - Feel free to use the framework, persistence system and third party library you like.
   As well other tooling.
   
  - You will need a GIT client to clone this repository. Once you finish
  create a patch of your work and send it to us. 
    - https://thoughtbot.com/blog/send-a-patch-to-someone-using-git-format-patch
    
  - You will find the required scenarios on the `features` folder of the project. 
  These are written in Gherkin language, you can use they as acceptance tests.
  
  - Whenever a system **PUT** a portfolio, every related data (allocations and orders)
    will be deleted.


## Backend

As a robo-advisor in Finizens we manage client's investment portfolios. 
In order to do this, a Customer contracts new portfolios and will trade allocations
on these portfolios.

The system will create a portfolio with its allocations.
In order to operate with the portfolio, it will create buy and sell
allocations' orders. Whenever an order is created, it will be completed on a undefined time. 

New allocations can be bought, even if they are present or not on the portfolio.

Allocations in the portfolio can be sold, if they not exceed the shares of it.
If an allocation hits 0 shares must be removed from the portfolio.

### Let's see the following scenario

The system creates a portfolio with two allocations: 
```
{
  "id": 1,
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
```

Then creates a buy order for a new allocation:
```
{
  "id": 1,
  "portfolio": 1,
  "allocation": 3,
  "shares": 3,
  "type": "buy"
}
```

So, now the allocation still is not part of the portfolio **until the order is completed**.
Once completed the portfolio should be like:
```
{
  "id": 1,
  "allocations": [
    {
      "id": 1,
      "shares": 3
    },
    {
      "id": 2,
      "shares": 4
    },
    {
      "id": 3,
      "shares": 3
    },
  ]
}
```

## Frontend

Create a view to operate the portfolio. It must show the portfolio, its allocations
and the current portfolio's non completed orders.

In order to keep the simplicity we can only create total sell orders of an allocation,
which means that all the shares will be sold.

Orders must be completed manually selecting them from a list. 

When the order is completed, the portfolio must be refreshed to update the information.

In case you'd like to start with the frontend or don't have enough time for completing the backend, you still can focus on the frontend with a simulated API we set up for this challenge:
* Install it running `make install` from your project's root directory, it should install all the required node dependencies.
* Run the mocked server with `make start`
* Check it running at http://localhost:3000
