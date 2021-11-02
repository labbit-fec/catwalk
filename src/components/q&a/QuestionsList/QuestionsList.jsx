import React from 'react';
import IndividualQuestion from './IndividualQuestion/IndividualQuestion';
import BottomBar from './BottomBar/BottomBar';
import styles from './QuestionsList.css';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dummyData: [
        {
          question_id: 533213,
          question_body: 'How long does it last?',
          question_date: '2019-07-06T00:00:00.000Z',
          asker_name: 'funnygirl',
          question_helpfulness: 6,
          reported: false,
          answers: {
            4996638: {
              id: 4996638,
              body: 'It runs small',
              date: '2019-11-17T00:00:00.000Z',
              answerer_name: 'dschulman',
              helpfulness: 1,
              photos: [
                'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
                'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              ],
            },
            4996662: {
              id: 4996662,
              body: 'Showing no wear after a few months!',
              date: '2019-09-06T00:00:00.000Z',
              answerer_name: 'sillyguy',
              helpfulness: 8,
              photos: [],
            },
          },
        },
        {
          question_id: 533210,
          question_body: 'What fabric is the top made of?',
          question_date: '2018-01-04T00:00:00.000Z',
          asker_name: 'yankeelover',
          question_helpfulness: 1,
          reported: false,
          answers: {
            4996578: {
              id: 4996578,
              body: "Something pretty soft but I can't be sure",
              date: '2018-01-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 5,
              photos: [
                'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
                'https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                'https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
              ],
            },
            4996580: {
              id: 4996580,
              body: 'Its the best! Seriously magic fabric',
              date: '2018-01-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 7,
              photos: [],
            },
            4996581: {
              id: 4996581,
              body: "DONT BUY IT! It's bad for the environment",
              date: '2018-01-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 8,
              photos: [],
            },
            4996630: {
              id: 4996630,
              body: 'Suede',
              date: '2018-11-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 7,
              photos: [],
            },
            4996668: {
              id: 4996668,
              body: 'Supposedly suede, but I think its synthetic',
              date: '2018-12-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 3,
              photos: [],
            },
          },
        },
      ],
    };
  }

  render() {
    const { dummyData } = this.state;
    return (
      <div className={styles.container}>
        {dummyData.map((question) => (
          // <button type="submit">Submit</button>
          <IndividualQuestion
            question={question}
            id={question.question_id}
            dummyData={dummyData}
          />
        ))}
        <BottomBar />
      </div>
    );
  }
}

export default QuestionsList;
