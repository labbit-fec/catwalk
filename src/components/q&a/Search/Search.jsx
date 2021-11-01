import React from 'react';
import styles from './Search.css';

const Search = function () {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search Questions & Answers"
      />
    </div>
  );
};

export default Search;
