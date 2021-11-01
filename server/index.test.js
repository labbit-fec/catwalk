const { port } = require('./index');

describe('Server config', () => {
  it('Check server port number to be 3000', () => {
    expect(port).toEqual(3000);
  });
});
