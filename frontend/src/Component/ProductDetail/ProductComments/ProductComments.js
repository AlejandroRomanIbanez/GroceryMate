import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './ProductComments.css';

const comments = [
  {
    id: 1,
    name: "Johny Cash",
    time: "3 hours ago",
    content: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Mindy Campbell",
    time: "5 hours ago",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus cumque doloribus dolorum dolor repellat nemo animi at iure autem fuga cupiditate architecto ut quam provident neque, inventore nisi eos quas?",
    rating: 3.7,
  },
];

const ProductComments = () => {
  return (
    <section className="product-comments">
      <div className="container">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-body">
              <h5>{comment.name}</h5>
              <p className="small">{comment.time}</p>
              <p>{comment.content}</p>
              <div className="comment-footer">
                <div className="comment-actions">
                  <div className="rating">
                    <Rater total={5} rating={comment.rating} interactive={false} />
                    <span className="small">({comment.rating.toFixed(1)})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductComments;
