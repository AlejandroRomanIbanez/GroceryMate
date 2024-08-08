import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import styles from './ProductDetail.module.css';
import ProductComments from './ProductComments/ProductComments';
import NewReview from './ProductNewReview/NewReview';

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

  if (!productDetailItem) {
    return <p>Loading...</p>;
  }

  const mockRating = Math.random() * 5;

  return (
    <section className={styles.productDetailContainer}>
      <div className={styles.imageGalleryContainer}>
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={[{
            original: productDetailItem.image_url,
          }]}
        />
      </div>
      <div className={styles.descriptionContainer}>
        <h2>{productDetailItem.name}</h2>
        <div className={styles.ratingContainer}>
          <Rater total={5} interactive={false} rating={mockRating} className={styles.rating} />
          <p className={styles.reviews}>({Math.floor(mockRating * 20)})</p>
        </div>
        <p className={styles.category}>Category: <span>{productDetailItem.category}</span></p>
        <p className={styles.price}>${productDetailItem.price}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.addToCart}>
            <BiShoppingBag className={styles.icon} />
            Add to cart
          </button>
          <button className={styles.wishlist}>
            <AiOutlineHeart className={styles.icon} />
            Wishlist
          </button>
        </div>
      </div>
      <NewReview />
      <ProductComments />
    </section>
  );
};

export default ProductDetail;
