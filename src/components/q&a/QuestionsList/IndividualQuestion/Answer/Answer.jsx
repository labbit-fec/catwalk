import React from 'react';
import Images from './Images/Images';
import styles from './Answer.css';

const Answer = function () {
  return (
    <div className={styles.container}>
      <span className={styles.answer_text}>
        <h4 className={styles.A}>A: </h4>
        <span className={styles.answer_body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          dolor nibh. Curabitur non vestibulum massa. Curabitur erat purus,
          consequat sit amet sem laoreet, lacinia gravida dolor. Pellentesque
          faucibus odio ut ex facilisis rutrum. Quisque sed arcu a massa
          suscipit euismod. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas.
        </span>
      </span>
      <Images />
      <div className={styles.answer_bar}>
        <span className={styles.info}> User1234, May 1, 2019 </span>|
        <div className={styles.answer_buttons}>
          <span> Helpful? </span>
          <span className={styles.helpful_button}> Yes</span>
          <span> (50) </span>|<span className={styles.report}>Report </span>
        </div>
      </div>
    </div>
  );
};

export default Answer;
