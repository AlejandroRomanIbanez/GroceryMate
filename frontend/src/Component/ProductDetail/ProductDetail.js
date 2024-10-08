import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomRating from './CustomRating/CustomRating';
import styles from './ProductDetail.css';
import ProductComments from './ProductComments/ProductComments';
import NewReview from './ProductNewReview/ProductNewReview';

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
  
    if (!productDetailItem) {
      return <p>Loading...</p>;
    }
  
    const averageRating = calculateAverageRating(productDetailItem.reviews);
  
    return (
      <section className={styles.productDetailContainer}>
        <div className={styles.imageGalleryContainer}>
          <img src={productDetailItem.image_url} alt="Product" className={styles.productImage} />
        </div>
        <div className={styles.descriptionContainer}>
          <h2>{productDetailItem.name}</h2>
          <div className={styles.ratingContainer}>
            <CustomRating rating={parseFloat(averageRating)} />
            <p className={styles.reviews}>({productDetailItem.reviews?.length || 0})</p>
          </div>
          <p className={styles.category}>Category: <span>{productDetailItem.category}</span></p>
          <p className={styles.price}>{productDetailItem.price}€</p>
        </div>
        {canLeaveReview ? (
          <NewReview productId={productId} />
        ) : (
          <div className={styles.reviewRestriction}>
            <img src="path_to_template_image" alt="No Purchase" className={styles.restrictionImage} />
            <p>You need to buy this product to leave us a feedback!</p>
          </div>
        )}
        <ProductComments reviews={productDetailItem.reviews || []} />
      </section>
    );
  };
  
  export default ProductDetail;
