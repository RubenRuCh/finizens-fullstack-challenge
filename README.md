# Finizens' FullStack Challenge

## Backend

As a robo-advisor in Finizens we manage client's investment portfolios. 
In order to do this, Customer contracts new portfolios and will trade allocations
on these portfolios.

The system will create a portfolio with its allocations.
In order to operate with the portfolio, it will create buy and sell
allocations' orders. Whenever an order is created, it will be completed on a undefined time. 

New allocations can be bought, even if they are present or not on the portfolio.

Allocations in the portfolio can be sold, if they not exceed the shares of it.
If an allocation hits 0 shares must be removed from the portfolio.

Whenever a system *PUTs* a portfolio, every related data (allocations and orders)
will be deleted.

### Let's see the following scenario

* You can find more scenarios on the `features` folder of the project. These are written on 
Gherkin language, you can use it as acceptation tests.

The system creates a portfolio: 
```
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
```

Then creates a buy order for a new allocation:
```
{
  "id": 1,
  "portfolio": 1,
  "allocation": 3,
  "shares": 3
}
```

So, now the allocation still is not part of the portfolio *until the order is completed*.
Then the portfolio should be like:
```
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
    },
    {
      "id": 3,
      "shares" 3
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