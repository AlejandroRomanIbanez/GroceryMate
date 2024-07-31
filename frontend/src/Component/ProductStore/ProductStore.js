import React, { useEffect, useState } from 'react';
import ProductGrid from '../ProductStore/ProductGrid/ProductGrid';
import ProductHeader from '../ProductStore/ProductHeader/ProductHeader';
import Sidebar from './Sidebar/Sidebar';
import './ProductStore.css';

const ProductStore = ({ products, isFav }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortOption, setSortOption] = useState("Suggested");

  useEffect(() => {
    setFilteredProducts(products);

    const categoriesMap = {};
    const priceRangeMap = {
      '0€ - 5€': 0,
      '5€ - 10€': 0,
      '10€ - 20€': 0,
      '20€ - 50€': 0,
      '50€ - 100€': 0,
      '100€ - 200€': 0,
      '200€+': 0,
    };

    products.forEach(product => {
      // Category count
      if (categoriesMap[product.category]) {
        categoriesMap[product.category]++;
      } else {
        categoriesMap[product.category] = 1;
      }

      // Price range count
      if (product.price <= 5) {
        priceRangeMap['0€ - 5€']++;
      } else if (product.price <= 10) {
        priceRangeMap['5€ - 10€']++;
      } else if (product.price <= 20) {
        priceRangeMap['10€ - 20€']++;
      } else if (product.price <= 50) {
        priceRangeMap['20€ - 50€']++;
      } else if (product.price <= 100) {
        priceRangeMap['50€ - 100€']++;
      } else if (product.price <= 200) {
        priceRangeMap['100€ - 200€']++;
      } else {
        priceRangeMap['200€+']++;
      }
    });

    setCategories(Object.entries(categoriesMap));
    setPriceRanges(Object.entries(priceRangeMap));
  }, [products]);

  const filterByCategory = (category) => {
    const filtered = category ? products.filter(product => product.category === category) : products;
    setFilteredProducts(filtered);
  };

  const filterByPriceRange = (range) => {
    const filtered = products.filter(product => {
      if (range === '0€ - 5€') return product.price <= 5;
      if (range === '5€ - 10€') return product.price > 5 && product.price <= 10;
      if (range === '10€ - 20€') return product.price > 10 && product.price <= 20;
      if (range === '20€ - 50€') return product.price > 20 && product.price <= 50;
      if (range === '50€ - 100€') return product.price > 50 && product.price <= 100;
      if (range === '100€ - 200€') return product.price > 100 && product.price <= 200;
      if (range === '200€+') return product.price > 200;
      return true;
    });
    setFilteredProducts(filtered);
  };

  const sortProducts = (option) => {
    const sortedProducts = [...filteredProducts];
    if (option === "Name") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "Price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sortedProducts);
    setSortOption(option);
  };

  return (
    <div className="product-store-container">
      <Sidebar
        categories={categories}
        priceRanges={priceRanges}
        filterByCategory={filterByCategory}
        filterByPriceRange={filterByPriceRange}
      />
      <div className="main-content">
        <ProductHeader sortOption={sortOption} sortProducts={sortProducts} />
        <ProductGrid products={filteredProducts} isFav={isFav} />
      </div>
    </div>
  );
};

export default ProductStore;
