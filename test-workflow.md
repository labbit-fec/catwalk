Front End

Use React Testing Library to test that the page works from a user perspective. Consider translating the Business Requirement Documentation to tests, as the BRD is only concerned with the end goal, not the implementation. Your test should be the same, as we will continue to make changes over time to the implementation.

Recommended basic workflow:
Level 1: To start, test that your components can be seen by the user.

Level 2: Second, Set up MSW to reply to your Get requests, then test that the mock product appeared appropiately on the page.

Level 3: Use User Events to simulate the user interacting with the page, reply to any requests with MSW, then test that the expected result occurred to the page.

Test your API Requests by using Super Test. Super Test is a way to test API Requests individually. However, technically, if you are replying to your API Requests with MSW to test the appearance of the page, then you have tested your requests as part of an integration test.

Test any front end functions with Jest, similar to Chai/Mocha.

Back End

Use MSW to set up a mock server that replys inplace of Ateleir. https://mswjs.io/docs/getting-started/integrate/node

Use Jest similar to Chai and Mocha to verify your functions work as intended.

Use Postman to verify that the Server sends the appropiate responses to requests.

Test your API Requests by using Super Test. Super Test is a way to test API Requests individually.