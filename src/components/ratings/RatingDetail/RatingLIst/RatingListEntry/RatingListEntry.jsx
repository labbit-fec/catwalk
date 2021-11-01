import React from 'react';
import { VscStarEmpty, VscStarFull, VscStarHalf } from 'react-icons/vsc';
import styles from './RatingListEntry.css';

export default function RatingListEntry() {
  return (
    <div className={styles.content}>
      <div className={styles.ratingHeader}>
        <div>
          <VscStarFull />
          <VscStarFull />
          <VscStarFull />
          <VscStarHalf />
          <VscStarEmpty />
        </div>
        <div>User1234, January 1, 2019</div>
      </div>
      <div className={styles.ratingTitle}>Donut chocolate bar pudding.</div>
      <div className={styles.ratingBody}>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu dolor
        nibh. Curabitur non vestibulum massa. Curabitur erat purus, consequat
        sit amet sem laoreet, lacinia gravida dolor. Pellentesque faucibus odio
        ut ex facilisis rutrum. Quisque sed arcu a massa suscipit euismod.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas.
      </div>
      <div className={styles.recommend}>✓ I recommend this product</div>
      <div className={styles.response}>
        <strong>Response:</strong>
        <p>
          Marzipan danish jelly beans gummi bears apple pie cheesecake topping
          biscuit sesame snaps.
        </p>
      </div>
      <div className={styles.helpful}>
        <div>Helpful?</div>
        <div>
          <button type="button" className={styles.btnHelpful}>
            Yes
          </button>
          &nbsp;(10)
        </div>
        <div>
          <button type="button" className={styles.btnHelpful}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
