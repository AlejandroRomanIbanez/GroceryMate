import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
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
                      <Rater total={5} rating={review.Rating} interactive={false} />
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
