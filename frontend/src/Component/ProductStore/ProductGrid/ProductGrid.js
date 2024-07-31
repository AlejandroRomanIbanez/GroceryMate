import React, { useState } from 'react';
import './ProductGrid.css';
import Pagination from '../ProductPagination/ProductPagination';

{/*const products = [
  {
    id: 1,
    title: "Apple",
    quantity: 'x4',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp',
    category: 'Fruits',
    originalPrice: '$5',
    discountPrice: '$4',
    name: 'Apple',
    availability: 10,
    rating: 5,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Banana",
    quantity: 'x6',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp',
    category: 'Fruits',
    originalPrice: '$6',
    discountPrice: '$5',
    name: 'Banana',
    availability: 15,
    rating: 4,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Carrot",
    quantity: 'x5',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp',
    category: 'Vegetables',
    originalPrice: '$4',
    discountPrice: '$3',
    name: 'Carrot',
    availability: 20,
    rating: 4.5,
    isFavorite: true,
  },
  {
    id: 4,
    title: "Broccoli",
    quantity: 'x3',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp',
    category: 'Vegetables',
    originalPrice: '$7',
    discountPrice: '$6',
    name: 'Broccoli',
    availability: 12,
    rating: 5,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Chicken Breast",
    quantity: 'x2',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp',
    category: 'Meat',
    originalPrice: '$10',
    discountPrice: '$9',
    name: 'Chicken Breast',
    availability: 8,
    rating: 5,
    isFavorite: true,
  },
  {
    id: 6,
    title: "Salmon",
    quantity: 'x1',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp',
    category: 'Seafood',
    originalPrice: '$12',
    discountPrice: '$11',
    name: 'Salmon',
    availability: 5,
    rating: 4,
    isFavorite: false,
  },
  {
    id: 7,
    title: "Milk",
    quantity: 'x4',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp',
    category: 'Dairy',
    originalPrice: '$8',
    discountPrice: '$7',
    name: 'Milk',
    availability: 10,
    rating: 4.5,
    isFavorite: true,
  },
  {
    id: 8,
    title: "Eggs",
    quantity: 'x12',
    imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp',
    category: 'Dairy',
    originalPrice: '$4',
    discountPrice: '$3',
    name: 'Eggs',
    availability: 20,
    rating: 5,
    isFavorite: false,
  },
];*/}

const ProductGrid = ({ products, isFav }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const filteredProducts = isFav ? products.filter(product => product.isFavorite) : products;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <div className="product-grid">
        {currentProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="card">
              <div className="card-header">
                <p className="lead">{product.title}</p>
              </div>
              <img src={product.imageUrl} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <div className="content">
                  <p className="category">
                    <a href="#!" className="text-muted">
                      {product.category}
                    </a>
                  </p>
                </div>
                <div className="content">
                  <h5 className="discount-price">{product.discountPrice}</h5>
                </div>
                <div className="button-area">
                  <div className="row">
                    <div className="col-3">
                      <input type="number" name="quantity" className="quantity" defaultValue="1" />
                    </div>
                    <div className="col-7">
                      <button className="btn btn-primary btn-cart">
                        Add to Cart
                      </button>
                    </div>
                    <div className="col-1">
                      <button className="btn btn-outline-dark">
                        ❤
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length > productsPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default ProductGrid;
