import { rest } from 'msw';

const handlers = [
  rest.get('/products', (req, res, ctx) =>
    res(
      ctx.json({
        Product: {
          id: 1337,
          nane: 'Shiba Snow Coat',
          slogan: 'Woof woof woof',
          description: 'For the intelligent hound in cold weather',
          category: 'Coats',
          default_price: '9000.00',
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

  rest.get('/api/overview/products/', (req, res, ctx) =>
    res(
      ctx.json({
        id: 1337,
        name: 'Shiba Snow Coat',
        slogan: 'Woof woof woof',
        description: 'For the intelligent hound in cold weather',
        category: 'Coats',
        default_price: '9000.00',
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
      })
    )
  ),

  rest.get('/api/qa/questions', (req, res, ctx) =>
    res(
      ctx.json([
        {
          question_id: 533233,
          question_body: 'Where does this product ship from?',
          question_date: '2017-11-04T00:00:00.000Z',
          asker_name: 'toofast',
          question_helpfulness: 17,
          reported: false,
          answers: {
            4996635: {
              id: 4996635,
              body: 'Mine was delivered from Oklahoma',
              date: '2017-11-04T00:00:00.000Z',
              answerer_name: 'toofast',
              helpfulness: 14,
              photos: [
                'https://images.unsplash.com/photo-1477823986828-5aff156284aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
              ],
            },
            4996646: {
              id: 4996646,
              body: 'It ships from the facility in Tulsa',
              date: '2017-11-04T00:00:00.000Z',
              answerer_name: 'toofast',
              helpfulness: 19,
              photos: [],
            },
          },
        },
        {
          question_id: 533231,
          question_body: 'Is this product sustainable?',
          question_date: '2018-09-04T00:00:00.000Z',
          asker_name: 'cleopatra',
          question_helpfulness: 12,
          reported: false,
          answers: {
            4996598: {
              id: 4996598,
              body: 'Its made from sustainable parts and manufactured in a green facility',
              date: '2018-10-04T00:00:00.000Z',
              answerer_name: 'marcanthony',
              helpfulness: 17,
              photos: [],
            },
          },
        },
        {
          question_id: 533234,
          question_body: 'Where is this product made?',
          question_date: '2018-08-12T00:00:00.000Z',
          asker_name: 'thegrimreaker',
          question_helpfulness: 9,
          reported: false,
          answers: {
            4996647: {
              id: 4996647,
              body: 'Taiwan',
              date: '2018-09-12T00:00:00.000Z',
              answerer_name: 'thegrimreaker',
              helpfulness: 0,
              photos: [],
            },
          },
        },
        {
          question_id: 533226,
          question_body: 'Does this product run big or small?',
          question_date: '2018-11-12T00:00:00.000Z',
          asker_name: 'coolkid',
          question_helpfulness: 8,
          reported: false,
          answers: {
            4996591: {
              id: 4996591,
              body: "Runs small, I'd say",
              date: '2018-01-12T00:00:00.000Z',
              answerer_name: 'warmkid',
              helpfulness: 9,
              photos: [],
            },
          },
        },
      ])
    )
  ),

  rest.get('/api/qa/questions/:questionId/answers', (req, res, ctx) =>
    res(
      ctx.json({
        question: '533232',
        page: 1,
        count: 5,
        results: [
          {
            answer_id: 4996629,
            body: 'The rubber on the bottom wears thin quickly',
            date: '2018-02-18T00:00:00.000Z',
            answerer_name: 'iluvdogz',
            helpfulness: 46,
            photos: [],
          },
          {
            answer_id: 4996599,
            body: 'Rubber',
            date: '2018-03-18T00:00:00.000Z',
            answerer_name: 'iluvdogz',
            helpfulness: 8,
            photos: [
              {
                id: 4454434,
                url: 'https://images.unsplash.com/photo-1477823986828-5aff156284aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
              },
            ],
          },
          {
            answer_id: 4996576,
            body: 'Some kind of recycled rubber, works great!',
            date: '2018-03-18T00:00:00.000Z',
            answerer_name: 'iluvdogz',
            helpfulness: 3,
            photos: [],
          },
          {
            answer_id: 4996602,
            body: 'Its a rubber sole',
            date: '2018-03-18T00:00:00.000Z',
            answerer_name: 'iluvbirds',
            helpfulness: 1,
            photos: [
              {
                id: 4454435,
                url: 'https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              },
            ],
          },
        ],
      })
    )
  ),
];

export default handlers;
