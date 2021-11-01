import React from 'react';
import Answer from './Answer/Answer';

const IndividualQuestion = function (props) {
  return (
    <div className="individual_question">
      <div className="question">
        <h6 className="question_text">Q: Some question about product?</h6>
        <span className="question_helpful"> Helpful? </span>|
        <span className="add_answer"> Add Answer</span>
      </div>
      <Answer />
      <hr />
    </div>
  );
};

export default IndividualQuestion;
