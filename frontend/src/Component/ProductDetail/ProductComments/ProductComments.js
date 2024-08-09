import React from 'react';
import CustomRating from '../CustomRating/CustomRating'; // Import the custom rating component
import './ProductComments.css';

const ProductComments = ({ reviews }) => {
  const reversedReviews = [...reviews].reverse();

  return (
    <section className="product-comments">
      <div className="comments-container">
        {reversedReviews.length > 0 ? (
          reversedReviews.map((review, index) => (
            <div className="comment" key={index}>
              <div className="comment-body">
                <h5>{review.Author}</h5>
                <p>{review.Comment}</p>
                <div className="comment-footer">
                  <div className="comment-actions">
                    <div className="rating">
                      <CustomRating rating={review.Rating} />
                      <span className="small">({review.Rating.toFixed(1)})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </section>
  );
};

export default ProductComments;
