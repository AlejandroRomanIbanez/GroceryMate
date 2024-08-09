import React from 'react';
import './CustomRating.css';

const CustomRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="custom-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="star full">&#9733;</span>
      ))}
      {halfStar && <span className="star half">&#9733;</span>}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={i} className="star empty">&#9733;</span>
      ))}
    </div>
  );
};

export default CustomRating;
