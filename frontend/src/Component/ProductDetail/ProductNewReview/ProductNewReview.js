import React, { useEffect, useState } from 'react';
import './ProductNewReview.css';
import InteractiveRating from '../CustomRating/InteractiveRating';

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  console.log('Product ID:', productId);

  const handleSubmit = async () => {
    const response = await fetch(`/api/products/${productId}/add-review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        review: rating,
        comment: comment,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Review submitted successfully');
    } else {
      alert(`Error: ${result.error}`);
    }
  };


  return (
    <section className="new-review-section">
      <div className="new-review-container">
        <div className="new-review-card">
          <div className="new-review-card-body">
            <div className="new-review-d-flex">
              <img
                className="new-review-rounded-circle new-review-shadow-1-strong new-review-me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="new-review-w-100">
                <h5>Add a comment</h5>
                <div className="new-review-rating-stars">
                  <InteractiveRating
                    rating={rating}
                    onRate={(newRating) => setRating(newRating)}
                  />
                </div>
                <textarea
                  className="new-review-form-control"
                  rows="4"
                  placeholder="What is your view?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="new-review-btn-container new-review-mt-3">
                  <button className="new-review-btn new-review-btn-cancel">Cancel</button>
                  <button
                    className="new-review-btn new-review-btn-send"
                    onClick={handleSubmit}
                  >
                    Send <i className="fas fa-long-arrow-alt-right new-review-ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewReview;
