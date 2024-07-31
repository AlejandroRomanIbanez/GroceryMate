import React from 'react';
import ProductGrid from '../ProductStore/ProductGrid/ProductGrid';
import ProductHeader from '../ProductStore/ProductHeader/ProductHeader';
import Sidebar from './Sidebar/Sidebar';
import './ProductStore.css';

const ProductStore = ({ isFav }) => {
  return (
    <div className="product-store-container">
      <Sidebar />
      <div className="main-content">
        <ProductHeader />
        <ProductGrid isFav={isFav} />
      </div>
    </div>
  );
};

export default ProductStore;
