import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomRating from './CustomRating/CustomRating'; // Custom rating component
import ProductComments from './ProductComments/ProductComments';
import SkeletonDetail from '../Skeleton/SkeletonDetail';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/products/${productId}`);
        setProductDetailItem(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.Rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  if (!productDetailItem) {
    return <SkeletonDetail />;
  }

  const averageRating = calculateAverageRating(productDetailItem.reviews);
  console.log("Average Rating:", averageRating);

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
      <ProductComments 
        reviews={productDetailItem.reviews || []} 
      />
    </section>
  );
};

export default ProductDetail;
