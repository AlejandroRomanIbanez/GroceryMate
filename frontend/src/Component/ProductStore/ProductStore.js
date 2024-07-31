import React, { useEffect, useState } from 'react';
import ProductGrid from '../ProductStore/ProductGrid/ProductGrid';
import ProductHeader from '../ProductStore/ProductHeader/ProductHeader';
import Sidebar from './Sidebar/Sidebar';
import './ProductStore.css';

const ProductStore = ({ products, isFav }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="product-store-container">
      <Sidebar />
      <div className="main-content">
        <ProductHeader />
        <ProductGrid products={filteredProducts} isFav={isFav} />
      </div>
    </div>
  );
};

export default ProductStore;
