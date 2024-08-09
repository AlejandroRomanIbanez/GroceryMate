import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomRating from './CustomRating/CustomRating'; // Custom rating component
import ProductComments from './ProductComments/ProductComments';
import NewReview from './ProductNewReview/ProductNewReview';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);
  const [userPurchasedProducts, setUserPurchasedProducts] = useState([]);
  const [canLeaveReview, setCanLeaveReview] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/products/${productId}`);
        setProductDetailItem(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    const fetchUserPurchasedProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/me/purchased-products`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserPurchasedProducts(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch purchased products:", error);
      }
    };

    fetchProductDetail();
    fetchUserPurchasedProducts();
  }, [productId]);

  useEffect(() => {
    if (productDetailItem) {
      setCanLeaveReview(userPurchasedProducts.includes(productId));
    }
  }, [userPurchasedProducts, productDetailItem, productId]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.Rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const handleDeleteReview = async (authorName) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/api/products/${productId}/remove-review`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: { author_name: authorName }
      });
      setProductDetailItem(prevItem => ({
        ...prevItem,
        reviews: prevItem.reviews.filter(
          review => review.Author !== authorName
        )
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = async (authorName, newRating, newComment) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/api/products/${productId}/update-review`, {
        author_name: authorName,
        Rating: newRating,
        Comment: newComment
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProductDetailItem(prevItem => ({
        ...prevItem,
        reviews: prevItem.reviews.map(review =>
          review.Author === authorName
            ? { ...review, Rating: newRating, Comment: newComment }
            : review
        )
      }));
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  if (!productDetailItem) {
    return <p>Loading...</p>;
  }

  const averageRating = calculateAverageRating(productDetailItem.reviews);

  return (
    <section className="productDetailContainer">
      <div className="imageGalleryContainer">
        <img src={productDetailItem.image_url} alt="Product" className="productImage" />
      </div>
      <div className="descriptionContainer">
        <h2>{productDetailItem.name}</h2>
        <div className="ratingContainer">
          <CustomRating rating={parseFloat(averageRating)} />
          <p className="reviews">({productDetailItem.reviews?.length || 0})</p>
        </div>
        <p className="category">Category: <span>{productDetailItem.category}</span></p>
        <p className="price">{productDetailItem.price}€</p>
      </div>
      {canLeaveReview ? (
        <NewReview productId={productId} reviews={productDetailItem.reviews || []} />
      ) : (
        <div className="reviewRestriction">
          <img src="path_to_template_image" alt="No Purchase" className="restrictionImage" />
          <p>You need to buy this product to leave us a feedback!</p>
        </div>
      )}
      <ProductComments 
        reviews={productDetailItem.reviews || []} 
        onDelete={handleDeleteReview} 
        onEdit={handleEditReview} 
      />
    </section>
  );
};

export default ProductDetail;
