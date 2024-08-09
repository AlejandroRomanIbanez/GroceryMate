import React, { useState } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './NewReview.css';

const NewReview = () => {
  const [rating, setRating] = useState(0);

  return (
    <section className="new-review-section">
      <div className="new-review-container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="new-review-card">
              <div className="new-review-card-body p-4">
                <div className="new-review-d-flex new-review-w-100">
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
                      <Rater
                        total={5}
                        rating={rating}
                        onRate={({ rating }) => setRating(rating)}
                        interactive={true}
                      />
                    </div>
                    <textarea className="new-review-form-control" rows="4" placeholder="What is your view?"></textarea>
                    <div className="new-review-btn-container new-review-mt-3">
                      <button className="new-review-btn new-review-btn-cancel">Cancel</button>
                      <button className="new-review-btn new-review-btn-send">
                        Send <i className="fas fa-long-arrow-alt-right new-review-ms-1"></i>
                      </button>
                    </div>
                  </div>
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
