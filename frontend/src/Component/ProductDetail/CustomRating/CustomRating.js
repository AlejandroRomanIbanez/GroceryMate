// CustomRating.js
import React from 'react';
import styles from './CustomRating.css'; // Import custom styles

const CustomRating = ({ rating }) => {
  const stars = [...Array(5)].map((_, index) => (
    <span
      key={index}
      className={`${styles.star} ${index < rating ? styles.filled : ''}`}
    >
      ★
    </span>
  ));

  return <div className={styles.ratingContainer}>{stars}</div>;
};

export default CustomRating;
