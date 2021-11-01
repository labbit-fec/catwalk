import React from 'react';
import Images from './Images/Images';

const Answer = function () {
  return (
    <div className="answer">
      <span className="answer_text">
        <h6>A: </h6>
        <span> Some answer to the question. </span>
      </span>
      <Images />
      <div className="answer_bar">
        <span className="info"> User1234, May 1, 2019 </span>|
        <span className="answer_helpful"> Helpful? </span>|
        <span className="report"> Report </span>
      </div>
    </div>
  );
};

export default Answer;
