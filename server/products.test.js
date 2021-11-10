const { getProduct } = require('./products');

describe('Test Server getProduct helper function', () => {
  it('Returns the correct productId', (done) => {
    const mockProduct = {
      "id": 61577,
      "campus": "hr-sfo",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "created_at": "2021-10-28T19:58:54.904Z",
      "updated_at": "2021-10-28T19:58:54.904Z"
    };
    const callback = (error, product) => {
      try {
        expect(product).toEqual(mockProduct);
        done();
      } catch (error) {
        done(error);
      }
    };
    getProduct('morning-joggers', callback);
  });
});
