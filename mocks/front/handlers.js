import { rest } from 'msw';

debugger;
const handlers = [
  rest.get('/product', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(ctx.status(200));
  }),
];

export default handlers;
