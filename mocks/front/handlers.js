import { rest } from 'msw';

const handlers = [
  rest.get('/products', (req, res, ctx) =>
    res(
      ctx.json({
        Product: {
          id: 1337,
          title: 'Shiba Snow Coat',
          slogan: 'Woof woof woof',
          description: 'For the intelligent hound in cold weather',
          category: 'Coats',
          defaultPrice: '9000.00',
          features: [
            {
              feature: 'Fabric',
              value: '110% Cotton',
            },
            {
              feature: 'Zipper',
              value: 'Fur safe',
            },
          ],
        },
      })
    )
  ),
];

export default handlers;
