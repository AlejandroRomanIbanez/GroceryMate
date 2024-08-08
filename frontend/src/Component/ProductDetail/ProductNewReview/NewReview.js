import React, { useState } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './NewReview.css';

const NewReview = () => {
  const [rating, setRating] = useState(0);

  return (
    <section className="new-review-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex flex-start w-100">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="w-100">
                    <h5>Add a comment</h5>
                    <div className="rating-stars">
                      <Rater
                        total={5}
                        rating={rating}
                        onRate={({ rating }) => setRating(rating)}
                        interactive={true}
                      />
                    </div>
                    <textarea className="form-control" rows="4" placeholder="What is your view?"></textarea>
                    <div className="btn-container mt-3">
                      <button className="btn btn-cancel">Cancel</button>
                      <button className="btn btn-send">
                        Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
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
