#Shopping cart

## User Story:
As a shopper, I want to manage products from my shopping cart and see what I already have in it.

### Project Requirements

| Requirement | Description
| ------ | ------ 
| [REQ-001] | Can add products to the basket |
| [REQ-002] | Can remove products to the basket |
| [REQ-003] | Can see which products are in the basket |
| [REQ-004] | Can see the costs for the items in the basket |
| [REQ-005] | A subtotal displays and gets updated whenever I make a changes to the cart |

## Technical Acceptance Criteria

### The solution must be publicly available, using Heroku or any other PaaS or IaaS.
This web app has been built using Node.js, [Express](http://expressjs.com/) and knockout.js (http://knockoutjs.com/)

### The solution manages one shopping cart per user session.
The application can handle one shopping cart, using session id.

## Pages

> /

The page aims to show all products availabel in the store. The user can add products to the basket and can see the cost of each one.

> /shoppingCart

Tha page aims to show the current shopping cart. The user can remove itens for the basket, can see the costs for the itens and a subtotal that is updated whenever one change happens in the cart.

# Tests

Unit tests are provided for this solution.

![alt text]()

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone <repo>
$ cd <fodler>
$ npm install
$ npm start
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

or

The easiest way to deploy this is to push the button:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)